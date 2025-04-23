const express = require('express');
const { getPackages, getPackageById, createPackage, updatePackage, deletePackage } = require('../controllers/packageController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', getPackages); // Obtener todos los paquetes
router.get('/:id', getPackageById); // Obtener un paquete por ID
router.post('/', verifyToken, createPackage); // Crear un nuevo paquete
router.put('/:id', verifyToken, updatePackage); // Actualizar un paquete
router.delete('/:id', verifyToken, deletePackage); // Eliminar un paquete

module.exports = router;