const express = require('express');
const router = express.Router();
const { Agencia } = require('../models');
const auth = require('../middlewares/authMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get('/:id', auth(['agencia', 'admin']), async (req, res) => {
    const agencia = await Agencia.findByPk(req.params.id);
    agencia ? res.json(agencia) : res.status(404).json({ mensaje: 'No encontrado' });
});

router.post('/register-agencia', upload.single('licencia_turismo'), async (req, res) => {
    try {
        const { nombre_empresa, nombre_usuario, correo, contraseña } = req.body;
        const hashed = await bcrypt.hash(contraseña, 10);
        const nueva = await Agencia.create({
            nombre_empresa,
            nombre_usuario,
            correo,
            contraseña: hashed,
            licencia_turismo: req.file.path
        });
        res.json(nueva);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;