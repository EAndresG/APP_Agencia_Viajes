const jwt = require('jsonwebtoken');
module.exports = (roles = []) => {
    return (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ mensaje: 'Token requerido' });
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (roles.length && !roles.includes(decoded.rol)) {
                return res.status(403).json({ mensaje: 'No autorizado' });
            }
            req.user = decoded;
            next();
        } catch (err) {
            res.status(401).json({ mensaje: 'Token inválido' });
        }
    }
};