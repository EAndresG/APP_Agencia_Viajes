// Validar email
exports.isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  // Validar contraseña (mínimo 8 caracteres)
  exports.isValidPassword = (password) => {
    return password.length >= 8;
  };
  
  // Generar respuesta estándar para errores
  exports.errorResponse = (res, statusCode, message) => {
    return res.status(statusCode).json({ error: message });
  };