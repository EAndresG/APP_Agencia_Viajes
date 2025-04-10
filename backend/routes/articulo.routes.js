const express = require('express');
const router = express.Router();

// GET /articulos
router.get('/', (req, res) => {
  res.json({ mensaje: 'Lista de artículos publicados' });
});

// POST /articulos (solo admin)
router.post('/', (req, res) => {
  // Aquí puedes validar que sea admin más adelante
  res.json({ mensaje: 'Artículo publicado correctamente' });
});

module.exports = router;

const { obtenerArticulos, publicarArticulo } = require('../controllers/articulo.controller');
router.get('/', obtenerArticulos);
router.post('/', publicarArticulo);

