const express = require('express');
const router = express.Router();

// Importar controladores
const authController = require('../controllers/auth.Controller');
const usuarioController = require('../controllers/usuario.controller');
const paqueteController = require('../controllers/paquete.Controller');
const calificacionController = require('../controllers/calificacion.controller');
const articuloController = require('../controllers/articulo.controller');
const adminController = require('../controllers/admin.controller');

// Middlewares
const verificarToken = require('../middlewares/auth.middleware');
const { checkRole } = require('../middlewares/role.middleware');

// Rutas de autenticación
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

// Rutas de usuarios
router.get('/usuarios/:id', verificarToken, usuarioController.obtenerUsuario);

// Rutas de paquetes
router.get('/paquetes', paqueteController.listarPaquetes);
router.get('/paquetes/:id', paqueteController.verPaquete);
router.post('/paquetes', verificarToken, paqueteController.crearPaquete);
router.delete('/paquetes/:id', verificarToken, paqueteController.eliminarPaquete);

// Rutas de calificaciones
router.post('/paquetes/:id/calificar', verificarToken, calificacionController.calificar);
router.get('/paquetes/:id/calificaciones', calificacionController.listarCalificaciones);

// Rutas de artículos
router.get('/articulos', articuloController.obtenerArticulos);
router.post('/articulos', verificarToken, checkRole('admin'), articuloController.publicarArticulo);

// Rutas de administración
router.get('/admin/usuarios', verificarToken, checkRole('admin'), adminController.listarUsuarios);
router.put('/admin/usuarios/:id', verificarToken, checkRole('admin'), adminController.modificarUsuario);
router.delete('/admin/usuarios/:id', verificarToken, checkRole('admin'), adminController.eliminarUsuario);

module.exports = router;