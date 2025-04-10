const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Administrador = db.define('Administrador', {
  id_admin: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nivel_permiso: {
    type: DataTypes.ENUM('total', 'moderador'),
    allowNull: false,
  },
}, {
  tableName: 'administradores',
  timestamps: false,
});

module.exports = Administrador;
