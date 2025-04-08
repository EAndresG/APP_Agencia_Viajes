const express = require('express');
const router = express.Router();
const { Usuario, Admin } = require('../models');
const auth = require('../middlewares/authMiddleware');

router.get('/usuarios', auth(['admin']), async (req, res) => {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
});

router.put('/usuarios/:id', auth(['admin']), async (req, res) => {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ mensaje: 'No encontrado' });
    await usuario.update(req.body);
    res.json(usuario);
});

router.delete('/usuarios/:id', auth(['admin']), async (req, res) => {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ mensaje: 'No encontrado' });
    await usuario.destroy();
    res.json({ mensaje: 'Usuario eliminado' });
});

// Actualizar nivel de permiso de un administrador
router.put('/admins/:id', auth(['admin']), async (req, res) => {
    try {
        const admin = await Admin.findOne({ where: { UsuarioId: req.params.id } });
        if (!admin) return res.status(404).json({ mensaje: 'Administrador no encontrado' });

        // Actualizar el nivel de permiso
        await admin.update({ nivel_permiso: req.body.nivel_permiso });
        res.json(admin);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/admins', auth(['admin']), async (req, res) => {
    try {
        const admins = await Admin.findAll();
        res.json(admins);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;