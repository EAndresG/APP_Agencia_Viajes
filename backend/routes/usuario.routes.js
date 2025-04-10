const express = require('express');
const router = express.Router();

// GET /usuarios/:id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  res.json({ mensaje: `Mostrando datos del usuario con ID ${id}` });
});

module.exports = router;

const { obtenerUsuario } = require('../controllers/usuario.controller');
router.get('/:id', obtenerUsuario);

