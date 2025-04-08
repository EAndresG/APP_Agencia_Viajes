const { Usuario } = require('../models');

exports.obtenerUsuarios = async (req, res) => {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
};

exports.editarUsuario = async (req, res) => {
    const usuario = await Usuario.findByPk(req.params.id);
    usuario ? await usuario.update(req.body) && res.json(usuario) : res.status(404).json({ mensaje: 'No encontrado' });
};

exports.eliminarUsuario = async (req, res) => {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ mensaje: 'No encontrado' });
    await usuario.destroy();
    res.json({ mensaje: 'Usuario eliminado' });
};
