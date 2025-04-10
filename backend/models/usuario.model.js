const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Usuario = db.define('Usuario', {
  id_usuario: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
  correo: { type: DataTypes.STRING, unique: true, allowNull: false },
  contraseña: { type: DataTypes.STRING, allowNull: false },
  rol: { type: DataTypes.ENUM('usuario', 'agencia'), allowNull: false },
  fecha_creacion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: 'usuarios',
  timestamps: false
});

module.exports = Usuario;
