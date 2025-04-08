const jwt = require('jsonwebtoken');
const { Admin } = require('../models');

module.exports = (roles = []) => {
    return async (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];
        console.log('Token recibido:', token);
        if (!token) return res.status(401).json({ mensaje: 'Token requerido' });
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Usuario decodificado:', decoded);

            // Verificar roles
            if (roles.length && !roles.includes(decoded.rol)) {
                return res.status(403).json({ mensaje: 'No autorizado' });
            }

            // Verificar nivel de permiso si es admin
            if (decoded.rol === 'admin') {
                const admin = await Admin.findOne({ where: { UsuarioId: decoded.id } });
                if (!admin || admin.nivel_permiso !== 'total') {
                    return res.status(403).json({ mensaje: 'Permiso insuficiente' });
                }
            }

            req.user = decoded;
            next();
        } catch (err) {
            res.status(401).json({ mensaje: 'Token inválido' });
        }
    };
};