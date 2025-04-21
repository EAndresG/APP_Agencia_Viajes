const express = require('express');
const authRoutes = require('./auth.routes');
const paqueteRoutes = require('./paquete.routes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/paquetes', paqueteRoutes);

module.exports = router;