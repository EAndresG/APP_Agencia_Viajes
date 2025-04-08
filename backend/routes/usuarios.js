const express = require('express');
const router = express.Router();
const { Usuario } = require('../models');
const auth = require('../middlewares/authMiddleware');

router.get('/:id', auth(['usuario', 'admin']), async (req, res) => {
    const usuario = await Usuario.findByPk(req.params.id);
    usuario ? res.json(usuario) : res.status(404).json({ mensaje: 'No encontrado' });
});

module.exports = router;