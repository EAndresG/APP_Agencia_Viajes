const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // <-- Asegúrate que este sea el correcto

const Usuario = sequelize.define('Usuario', {
  nombre: DataTypes.STRING,
  apellido: DataTypes.STRING,
  nombre_usuario: { type: DataTypes.STRING, unique: true },
  cedula: { type: DataTypes.STRING, unique: true },
  correo: { type: DataTypes.STRING, unique: true },
  contraseña: DataTypes.STRING,
  rol: DataTypes.ENUM('usuario', 'agencia', 'admin'),
  fecha_creacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'usuarios',
  timestamps: false
});

module.exports = Usuario;
