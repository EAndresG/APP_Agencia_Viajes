const express = require('express');
const router = express.Router();
const { Usuario } = require('../models');
const auth = require('../middlewares/authMiddleware');

router.get('/usuarios', auth(['admin']), async (req, res) => {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
});

router.put('/usuarios/:id', auth(['admin']), async (req, res) => {
    const usuario = await Usuario.findByPk(req.params.id);
    usuario ? await usuario.update(req.body) && res.json(usuario) : res.status(404).json({ mensaje: 'No encontrado' });
});

router.delete('/usuarios/:id', auth(['admin']), async (req, res) => {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ mensaje: 'No encontrado' });
    await usuario.destroy();
    res.json({ mensaje: 'Usuario eliminado' });
});

module.exports = router;