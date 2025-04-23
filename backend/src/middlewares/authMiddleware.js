const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token.' });
  }

  try {
    const verified = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET); // Asegúrate de que el token esté en el formato "Bearer <token>"
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Token no válido.' });
  }
};

module.exports = verifyToken;