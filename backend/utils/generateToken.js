const jwt = require('jsonwebtoken');

module.exports = (id, rol) => {
    return jwt.sign({ id, rol }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });
};
