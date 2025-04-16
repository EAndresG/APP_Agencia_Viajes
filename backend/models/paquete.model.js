const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Paquete = db.define('Paquete', {
  id_paquete: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  titulo: DataTypes.STRING,
  descripcion: DataTypes.TEXT,
  precio: DataTypes.DECIMAL(10, 2),
  destino: DataTypes.STRING,
  id_agencia: DataTypes.INTEGER,
  fecha_publicacion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: 'paquetes',
  timestamps: false
});

module.exports = Paquete;
