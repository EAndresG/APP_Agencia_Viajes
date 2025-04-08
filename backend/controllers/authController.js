const { Usuario, Agencia } = require('../models');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');

exports.registerUsuario = async (req, res) => {
    try {
        const hash = await bcrypt.hash(req.body.contraseña, 10);
        const nuevo = await Usuario.create({
            ...req.body,
            contraseña: hash,
            rol: 'usuario'
        });
        const token = generateToken({ id: nuevo.id_usuario, rol: nuevo.rol });
        res.json({ token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.registerAgencia = async (req, res) => {
    try {
        const hash = await bcrypt.hash(req.body.contraseña, 10);
        const nueva = await Agencia.create({
            ...req.body,
            contraseña: hash
        });
        const token = generateToken({ id: nueva.id_agencia, rol: 'agencia' });
        res.json({ token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    const { nombre_usuario, contraseña } = req.body;

    let user = await Usuario.findOne({ where: { nombre_usuario } });
    let role = 'usuario';
    if (!user) {
        user = await Agencia.findOne({ where: { nombre_usuario } });
        role = 'agencia';
    }

    if (!user) return res.status(404).json({ mensaje: 'No encontrado' });

    const valido = await bcrypt.compare(contraseña, user.contraseña);
    if (!valido) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });

    const token = generateToken({ id: user.id_usuario || user.id_agencia, rol: role });
    res.json({ token });
};
