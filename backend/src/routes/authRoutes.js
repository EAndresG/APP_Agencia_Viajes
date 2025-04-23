const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register); // Registro de usuarios
router.post('/login', login); // Inicio de sesión

module.exports = router;