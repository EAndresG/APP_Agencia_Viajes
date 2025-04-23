const express = require('express');
const { getReviews, getReviewById, createReview, updateReview, deleteReview } = require('../controllers/reviewController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', getReviews); // Obtener todas las reseñas
router.get('/:id', getReviewById); // Obtener una reseña por ID
router.post('/', verifyToken, createReview); // Crear una nueva reseña
router.put('/:id', verifyToken, updateReview); // Actualizar una reseña
router.delete('/:id', verifyToken, deleteReview); // Eliminar una reseña

module.exports = router;