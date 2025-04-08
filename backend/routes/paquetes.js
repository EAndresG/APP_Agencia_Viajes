const express = require('express');
const router = express.Router();
const { Paquete, Calificacion } = require('../models');
const auth = require('../middlewares/authMiddleware');
const redis = require('redis');
const client = redis.createClient();

router.get('/', async (req, res) => {
    const { destino, precio, page = 1, limit = 10 } = req.query;
    const filtros = {};
    if (destino) filtros.destino = destino;
    if (precio) filtros.precio = { lte: precio };

    const offset = (page - 1) * limit;
    const paquetes = await Paquete.findAndCountAll({
        where: filtros,
        limit: parseInt(limit),
        offset: parseInt(offset)
    });

    res.json({
        total: paquetes.count,
        paginas: Math.ceil(paquetes.count / limit),
        data: paquetes.rows
    });
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

// Calificaciones
router.post('/:id/calificar', auth(['usuario']), async (req, res) => {
    const nueva = await Calificacion.create({
        ...req.body,
        PaqueteId: req.params.id,
        UsuarioId: req.user.id
    });
    res.json(nueva);
});

router.get('/:id/calificaciones', async (req, res) => {
    const calificaciones = await Calificacion.findAll({ where: { PaqueteId: req.params.id } });
    res.json(calificaciones);
});

router.get('/populares', async (req, res) => {
    client.get('paquetes_populares', async (err, data) => {
        if (data) {
            return res.json(JSON.parse(data));
        } else {
            const paquetes = await Paquete.findAll({ order: [['popularidad', 'DESC']], limit: 10 });
            client.setex('paquetes_populares', 3600, JSON.stringify(paquetes)); // Cache por 1 hora
            res.json(paquetes);
        }
    });
});

module.exports = router;


