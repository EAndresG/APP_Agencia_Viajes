const express = require("express");
const { getAdminProfile } = require("../controllers/adminController");

const router = express.Router();

// Ruta para obtener el perfil del administrador (sin autenticación)
router.get("/profile", getAdminProfile);

module.exports = router;