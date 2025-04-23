const express = require('express');
const { getUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', verifyToken, getUsers); // Obtener todos los usuarios
router.get('/:id', verifyToken, getUserById); // Obtener un usuario por ID
router.put('/:id', verifyToken, updateUser); // Actualizar un usuario
router.delete('/:id', verifyToken, deleteUser); // Eliminar un usuario

module.exports = router;