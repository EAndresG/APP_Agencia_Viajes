const express = require('express');
const { getUsers, getUserById, updateUser, deleteUser, getCurrentUser } = require('../controllers/userController');
const verifyToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/me', verifyToken, getCurrentUser); // Obtener el usuario autenticado
router.get('/', verifyToken, getUsers); // Obtener todos los usuarios
router.get('/:id', verifyToken, getUserById); // Obtener un usuario por ID
router.put('/:id', verifyToken, updateUser); // Actualizar un usuario
router.delete('/:id', verifyToken, deleteUser); // Eliminar un usuario

module.exports = router;