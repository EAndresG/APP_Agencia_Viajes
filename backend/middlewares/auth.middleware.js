const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwt');

function verificarToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ error: 'Token no proporcionado' });

    try {
        const payload = jwt.verify(token.split(' ')[1], secret);
        req.usuario = payload;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Token inválido o expirado' });
    }
}

module.exports = verificarToken;
