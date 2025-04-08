const express = require('express');
const router = express.Router();
const { Paquete, Calificacion } = require('../models');
const auth = require('../middlewares/authMiddleware');

router.get('/', async (req, res) => {
    const { destino, precio } = req.query;
    const filtros = {};
    if (destino) filtros.destino = destino;
    if (precio) filtros.precio = { lte: precio };
    const paquetes = await Paquete.findAll({ where: filtros });
    res.json(paquetes);
});

router.get('/:id', async (req, res) => {
    const paquete = await Paquete.findByPk(req.params.id);
    paquete ? res.json(paquete) : res.status(404).json({ mensaje: 'No encontrado' });
});

router.post('/', auth(['agencia']), async (req, res) => {
    try {
        const nuevo = await Paquete.create({ ...req.body, AgenciaId: req.user.id });
        res.json(nuevo);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.put('/:id', auth(['agencia']), async (req, res) => {
    const paquete = await Paquete.findByPk(req.params.id);
    if (paquete && paquete.AgenciaId === req.user.id) {
        await paquete.update(req.body);
        res.json(paquete);
    } else {
        res.status(403).json({ mensaje: 'No autorizado o no encontrado' });
    }
});

router.delete('/:id', auth(['agencia', 'admin']), async (req, res) => {
    const paquete = await Paquete.findByPk(req.params.id);
    if (!paquete) return res.status(404).json({ mensaje: 'No encontrado' });
    if (req.user.rol === 'admin' || paquete.AgenciaId === req.user.id) {
        await paquete.destroy();
        res.json({ mensaje: 'Eliminado' });
    } else {
        res.status(403).json({ mensaje: 'No autorizado' });
    }
});
