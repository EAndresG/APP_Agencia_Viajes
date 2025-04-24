const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Obtener el token del encabezado

  if (!token) {
    return res.status(401).json({ message: "Acceso no autorizado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verificar el token
    req.user = decoded; // Agregar los datos del usuario al objeto req
    next();
  } catch (error) {
    console.error("Error al verificar el token:", error);
    res.status(401).json({ message: "Token inválido o expirado" });
  }
};

module.exports = verifyToken;