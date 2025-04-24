const express = require('express');
const { register, login, adminLogin } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register); // Registro de usuarios
router.post('/login', login); // Inicio de sesión
router.post('/admin-login', adminLogin); // Inicio de sesión para administradores

module.exports = router;