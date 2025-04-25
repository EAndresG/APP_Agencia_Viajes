// Importar express para crear rutas
const express = require('express');
// Importar los controladores de autenticación
const { register, login, adminLogin } = require('../controllers/authController');

// Crear un enrutador de express
const router = express.Router();

// Ruta para registrar usuarios
router.post('/register', register); // Maneja el registro de nuevos usuarios

// Ruta para el inicio de sesión de usuarios
router.post('/login', login); // Maneja el inicio de sesión de usuarios regulares

// Ruta para el inicio de sesión de administradores
router.post('/admin-login', adminLogin); // Maneja el inicio de sesión de administradores

// Exportar el enrutador para usarlo en la configuración principal de rutas
module.exports = router;