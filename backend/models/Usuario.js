const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const Usuario = sequelize.define('Usuario', {
  nombre: { type: DataTypes.STRING, allowNull: false },
  apellido: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  telefono: { type: DataTypes.STRING },
  contraseña: { type: DataTypes.STRING, allowNull: false },
  rol: { type: DataTypes.ENUM('usuario', 'guia', 'admin'), defaultValue: 'usuario' },
  estado: { type: DataTypes.ENUM('pendiente', 'aprobado'), defaultValue: 'pendiente' },
});

module.exports = Usuario;