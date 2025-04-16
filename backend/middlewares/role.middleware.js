// role.middleware.js

/**
 * Middleware para verificar si el usuario tiene el rol requerido.
 * @param {string} requiredRole - El rol necesario para acceder a la ruta.
 */
const checkRole = (requiredRole) => {
    return (req, res, next) => {
        const userRole = req.user?.role; // Asegúrate de que req.user esté configurado previamente (por ejemplo, en un middleware de autenticación)

        if (!userRole) {
            return res.status(403).json({ message: 'Acceso denegado. Usuario no autenticado.' });
        }

        if (userRole !== requiredRole) {
            return res.status(403).json({ message: 'Acceso denegado. Rol insuficiente.' });
        }

        next(); // El usuario tiene el rol requerido, continuar con la solicitud
    };
};

module.exports = { checkRole };