const multer = require("multer");
const path = require("path");

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images"); // Carpeta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`); // Nombre único para cada archivo
  },
});

// Filtro para validar el tipo de archivo
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Tipo de archivo no permitido. Solo se permiten imágenes (jpeg, png, jpg)."), false);
  }
};

// Middleware de multer
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Límite de 5 MB por archivo
});

module.exports = upload;