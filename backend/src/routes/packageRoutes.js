const express = require('express');
const { createPackage, getPackages, getPackageById, updatePackage, deletePackage, countPackages } = require('../controllers/packageController');
const verifyToken = require('../middlewares/authMiddleware');

const router = express.Router();

// Rutas públicas (visibles para todos)
router.get('/', getPackages); // Ruta para obtener todos los paquetes
router.get('/count', countPackages); // Ruta para contar los paquetes
router.get('/:id', getPackageById); // Ruta para obtener un paquete por ID

// Rutas protegidas (solo para guías o administradores)
router.post('/', verifyToken, createPackage); // Ruta para crear un paquete
router.put('/:id', verifyToken, updatePackage); // Ruta para actualizar un paquete
router.delete('/:id', verifyToken, deletePackage); // Ruta para eliminar un paquete

module.exports = router;