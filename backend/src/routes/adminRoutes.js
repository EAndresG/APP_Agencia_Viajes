// Importar express para crear rutas
const express = require("express");
// Importar el controlador del administrador
const { getAdminProfile } = require("../controllers/adminController");

// Crear un enrutador de express
const router = express.Router();

// Ruta para obtener el perfil del administrador (sin autenticación)
router.get("/profile", getAdminProfile);

// Exportar el enrutador para usarlo en la configuración principal de rutas
module.exports = router;