const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.Controller');

// Rutas de registro
router.post('/register', authController.register); // Registro genérico
router.post('/register-usuario', authController.registerUsuario); // Registro de usuario
router.post('/register-administrador', authController.registerAdministrador); // Registro de administrador

// Rutas de autenticación
router.post('/login', authController.login); // Inicio de sesión

// Rutas adicionales (si están implementadas en el controlador)
// router.post('/forgot-password', authController.forgotPassword);
// router.post('/reset-password', authController.resetPassword);

module.exports = router;
