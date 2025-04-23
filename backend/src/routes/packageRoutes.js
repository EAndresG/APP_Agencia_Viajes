const express = require('express');
const { createPackage, getPackages, getPackageById, updatePackage, deletePackage } = require('../controllers/packageController');
const verifyToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', verifyToken, createPackage); // Ruta para crear un paquete
router.get('/', verifyToken, getPackages); // Ruta para obtener todos los paquetes
router.get('/:id', verifyToken, getPackageById); // Ruta para obtener un paquete por ID
router.put('/:id', verifyToken, updatePackage); // Ruta para actualizar un paquete
router.delete('/:id', verifyToken, deletePackage); // Ruta para eliminar un paquete

module.exports = router;