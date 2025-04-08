const { Agencia } = require('../models');

exports.getAgenciaPorId = async (req, res) => {
    const agencia = await Agencia.findByPk(req.params.id);
    agencia ? res.json(agencia) : res.status(404).json({ mensaje: 'No encontrado' });
};
