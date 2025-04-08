const { Usuario } = require('../models');

exports.getUsuarioPorId = async (req, res) => {
    const usuario = await Usuario.findByPk(req.params.id);
    usuario ? res.json(usuario) : res.status(404).json({ mensaje: 'No encontrado' });
};
