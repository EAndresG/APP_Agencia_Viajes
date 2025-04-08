const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');
const { Usuario, Agencia } = require('../models');

router.post('/register-usuario', async (req, res) => {
    try {
        const { nombre, apellido, nombre_usuario, cedula, correo, contraseña, rol = 'usuario' } = req.body;
        const hashed = await bcrypt.hash(contraseña, 10);
        const nuevo = await Usuario.create({ nombre, apellido, nombre_usuario, cedula, correo, contraseña: hashed, rol });
        res.json(nuevo);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.post('/register-agencia', async (req, res) => {
    try {
        const { nombre_empresa, nombre_usuario, correo, licencia_turismo, contraseña } = req.body;
        const hashed = await bcrypt.hash(contraseña, 10);
        const nueva = await Agencia.create({ nombre_empresa, nombre_usuario, correo, licencia_turismo, contraseña: hashed });
        res.json(nueva);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { nombre_usuario, contraseña } = req.body;
        let user = await Usuario.findOne({ where: { nombre_usuario } });
        let rol = 'usuario';
        if (!user) {
            user = await Agencia.findOne({ where: { nombre_usuario } });
            rol = 'agencia';
        }
        if (!user || !(await bcrypt.compare(contraseña, user.contraseña))) {
            return res.status(400).json({ mensaje: 'Credenciales incorrectas' });
        }
        const token = generateToken(user.id, rol);
        res.json({ token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;