const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Articulo = db.define('Articulo', {
  id_articulo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contenido: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  imagen_destacada: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  id_autor: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fecha_publicacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'articulos',
  timestamps: false,
});

module.exports = Articulo;
