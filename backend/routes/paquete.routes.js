const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/auth.middleware'); // Asegúrate de que este archivo exista
const { obtenerPaquetes } = require('../controllers/paquete.Controller'); // Asegúrate de que este controlador exista

router.get('/', verificarToken, obtenerPaquetes); // Verifica que `obtenerPaquetes` esté definido

module.exports = router;
