const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Agencia = sequelize.define('Agencia', {
    nombre_empresa: DataTypes.STRING,
    nombre_usuario: { type: DataTypes.STRING, unique: true },
    correo: { type: DataTypes.STRING, unique: true },
    licencia_turismo: DataTypes.STRING,
    contraseña: DataTypes.STRING,
    fecha_creacion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});
module.exports = Agencia;