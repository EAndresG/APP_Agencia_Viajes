const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Usuario = sequelize.define('Usuario', {
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    nombre_usuario: { type: DataTypes.STRING, unique: true },
    cedula: { type: DataTypes.STRING, unique: true },
    correo: { type: DataTypes.STRING, unique: true },
    contraseña: DataTypes.STRING,
    rol: { type: DataTypes.ENUM('usuario', 'agencia', 'admin'), defaultValue: 'usuario' },
    fecha_creacion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});
module.exports = Usuario;