const express = require('express');
const router = express.Router();

// GET /admin/usuarios
router.get('/usuarios', (req, res) => {
  res.json({ mensaje: 'Lista de usuarios registrados (admin)' });
});

// PUT /admin/usuarios/:id
router.put('/usuarios/:id', (req, res) => {
  res.json({ mensaje: `Usuario ${req.params.id} modificado por admin` });
});

// DELETE /admin/usuarios/:id
router.delete('/usuarios/:id', (req, res) => {
  res.json({ mensaje: `Usuario ${req.params.id} eliminado por admin` });
});

const { listarUsuarios, modificarUsuario, eliminarUsuario } = require('../controllers/admin.controller');
router.get('/usuarios', listarUsuarios);
router.put('/usuarios/:id', modificarUsuario);
router.delete('/usuarios/:id', eliminarUsuario);


module.exports = router;


