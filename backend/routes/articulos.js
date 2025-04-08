const express = require('express');
const router = express.Router();
const { Articulo } = require('../models');
const auth = require('../middlewares/authMiddleware');

router.get('/', async (req, res) => {
    const articulos = await Articulo.findAll();
    res.json(articulos);
});

router.post('/', auth(['admin']), async (req, res) => {
    const nuevo = await Articulo.create({ ...req.body, UsuarioId: req.user.id });
    res.json(nuevo);
});

module.exports = router;