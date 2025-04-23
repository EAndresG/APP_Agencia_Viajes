const express = require('express');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const guideRoutes = require('./guideRoutes');
const packageRoutes = require('./packageRoutes');
const reservationRoutes = require('./reservationRoutes');
const reviewRoutes = require('./reviewRoutes');
const contactRoutes = require('./contactRoutes');

const router = express.Router();

router.use('/auth', authRoutes); // Rutas de autenticación
router.use('/users', userRoutes); // Rutas de usuarios
router.use('/guides', guideRoutes); // Rutas de guías
router.use('/packages', packageRoutes); // Rutas de paquetes turísticos
router.use('/reservations', reservationRoutes); // Rutas de reservas
router.use('/reviews', reviewRoutes); // Rutas de reseñas
router.use('/contact', contactRoutes); // Rutas de mensajes de contacto

module.exports = router;