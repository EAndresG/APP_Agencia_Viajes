const express = require('express');
const { getGuides, getGuideById, createGuide, updateGuide, deleteGuide } = require('../controllers/guideController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', verifyToken, getGuides); // Obtener todos los guías
router.get('/:id', verifyToken, getGuideById); // Obtener un guía por ID
router.post('/', verifyToken, createGuide); // Crear un nuevo guía
router.put('/:id', verifyToken, updateGuide); // Actualizar un guía
router.delete('/:id', verifyToken, deleteGuide); // Eliminar un guía

module.exports = router;