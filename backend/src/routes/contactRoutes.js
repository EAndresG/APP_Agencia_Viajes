const express = require("express");
const { createMessage, getMessages } = require("../controllers/contactController");

const router = express.Router();

// Ruta para guardar un mensaje
router.post("/", createMessage);

// Ruta para obtener todos los mensajes
router.get("/", getMessages);

module.exports = router;