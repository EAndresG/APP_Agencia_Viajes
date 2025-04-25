// Importar el módulo jsonwebtoken para manejar tokens JWT
const jwt = require("jsonwebtoken");

// Middleware para verificar el token JWT
const verifyToken = (req, res, next) => {
  // Obtener el token del encabezado de autorización
  const token = req.headers.authorization?.split(" ")[1]; // Formato esperado: "Bearer <token>"

  if (!token) {
    // Si no se proporciona un token, responder con un error 401 (no autorizado)
    return res.status(401).json({ message: "Acceso no autorizado" });
  }

  try {
    // Verificar el token usando la clave secreta definida en las variables de entorno
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Agregar los datos decodificados del usuario al objeto `req` para usarlos en las rutas protegidas
    req.user = decoded;
    next(); // Continuar con la siguiente función en la cadena de middlewares
  } catch (error) {
    // Manejo de errores al verificar el token (por ejemplo, token inválido o expirado)
    console.error("Error al verificar el token:", error);
    res.status(401).json({ message: "Token inválido o expirado" });
  }
};

// Exportar el middleware para usarlo en las rutas protegidas
module.exports = verifyToken;