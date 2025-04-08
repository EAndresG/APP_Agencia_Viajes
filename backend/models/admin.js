const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Admin = sequelize.define('Admin', {
    nivel_permiso: { type: DataTypes.ENUM('total', 'moderador'), defaultValue: 'moderador' }
});

module.exports = Admin;
