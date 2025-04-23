const express = require('express');
const { getReservations, getReservationById, createReservation, updateReservation, deleteReservation } = require('../controllers/reservationController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', verifyToken, getReservations); // Obtener todas las reservas
router.get('/:id', verifyToken, getReservationById); // Obtener una reserva por ID
router.post('/', verifyToken, createReservation); // Crear una nueva reserva
router.put('/:id', verifyToken, updateReservation); // Actualizar una reserva
router.delete('/:id', verifyToken, deleteReservation); // Eliminar una reserva

module.exports = router;