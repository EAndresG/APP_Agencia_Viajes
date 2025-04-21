const express = require('express');
const { getPaquetes, createPaquete, updatePaquete, deletePaquete } = require('../controllers/paquete.controller');
const router = express.Router();

router.get('/', getPaquetes);
router.post('/', createPaquete);
router.put('/:id', updatePaquete);
router.delete('/:id', deletePaquete);

module.exports = router;