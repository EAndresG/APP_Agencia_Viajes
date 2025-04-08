const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Admin = sequelize.define('Admin', {
    nivel_permiso: { type: DataTypes.ENUM('total', 'moderador'), defaultValue: 'moderador' }
});
module.exports = Admin;

// --- utils/generateToken.js ---
const jwt = require('jsonwebtoken');
module.exports = (id, rol) => {
    return jwt.sign({ id, rol }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });
};