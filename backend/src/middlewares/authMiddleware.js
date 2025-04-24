const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization'); // Leer el token del encabezado "Authorization"
  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token.' });
  }

  try {
    const verified = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET); // Verificar el token (formato "Bearer <token>")
    req.user = verified; // Guardar los datos del usuario en req.user
    next(); // Continuar con la siguiente función middleware o controlador
  } catch (error) {
    res.status(401).json({ message: 'Token no válido.' }); // Cambié el código de error a 401 para mayor consistencia
  }
};

module.exports = verifyToken;