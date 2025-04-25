// Middleware para manejar errores globales en la aplicación
exports.errorHandler = (err, req, res, next) => {
  // Registrar el error en la consola para depuración
  console.error(err.stack);

  // Responder con un error 500 (Error interno del servidor)
  res.status(500).json({
    message: 'Ocurrió un error en el servidor', // Mensaje genérico para el cliente
    error: err.message, // Detalle del error (útil para depuración)
  });
};