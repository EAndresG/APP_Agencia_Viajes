const express = require('express');
const router = express.Router();
const calificacionController = require('../controllers/calificacion.controller');
const verificarToken = require('../middlewares/auth.middleware');

router.post('/:id/calificar', verificarToken, calificacionController.calificar);
router.get('/:id/calificaciones', calificacionController.listarCalificaciones);

module.exports = router;
