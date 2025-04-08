const express = require('express');
const router = express.Router();
const { Agencia } = require('../models');
const auth = require('../middlewares/authMiddleware');

router.get('/:id', auth(['agencia', 'admin']), async (req, res) => {
    const agencia = await Agencia.findByPk(req.params.id);
    agencia ? res.json(agencia) : res.status(404).json({ mensaje: 'No encontrado' });
});

module.exports = router;