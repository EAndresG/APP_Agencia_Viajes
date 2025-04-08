const { Paquete, Calificacion } = require('../models');

exports.getPaquetes = async (req, res) => {
    const { destino, precio } = req.query;
    const filtros = {};
    if (destino) filtros.destino = destino;
    if (precio) filtros.precio = { lte: precio };

    const paquetes = await Paquete.findAll({ where: filtros });
    res.json(paquetes);
};

exports.getPaquetePorId = async (req, res) => {
    const paquete = await Paquete.findByPk(req.params.id);
    paquete ? res.json(paquete) : res.status(404).json({ mensaje: 'No encontrado' });
};

exports.crearPaquete = async (req, res) => {
    try {
        const nuevo = await Paquete.create({ ...req.body, AgenciaId: req.user.id });
        res.json(nuevo);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.editarPaquete = async (req, res) => {
    const paquete = await Paquete.findByPk(req.params.id);
    if (paquete && paquete.AgenciaId === req.user.id) {
        await paquete.update(req.body);
        res.json(paquete);
    } else {
        res.status(403).json({ mensaje: 'No autorizado o no encontrado' });
    }
};

exports.eliminarPaquete = async (req, res) => {
    const paquete = await Paquete.findByPk(req.params.id);
    if (!paquete) return res.status(404).json({ mensaje: 'No encontrado' });
    if (req.user.rol === 'admin' || paquete.AgenciaId === req.user.id) {
        await paquete.destroy();
        res.json({ mensaje: 'Eliminado' });
    } else {
        res.status(403).json({ mensaje: 'No autorizado' });
    }
};

// Calificaciones
exports.calificarPaquete = async (req, res) => {
    const nueva = await Calificacion.create({
        ...req.body,
        PaqueteId: req.params.id,
        UsuarioId: req.user.id
    });
    res.json(nueva);
};

exports.obtenerCalificaciones = async (req, res) => {
    const calificaciones = await Calificacion.findAll({ where: { PaqueteId: req.params.id } });
    res.json(calificaciones);
};
