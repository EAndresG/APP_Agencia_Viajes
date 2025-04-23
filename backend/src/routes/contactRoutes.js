const express = require('express');
const { getMessages, getMessageById, createMessage, deleteMessage } = require('../controllers/contactController');

const router = express.Router();

router.get('/', getMessages); // Obtener todos los mensajes
router.get('/:id', getMessageById); // Obtener un mensaje por ID
router.post('/', createMessage); // Crear un nuevo mensaje
router.delete('/:id', deleteMessage); // Eliminar un mensaje

module.exports = router;