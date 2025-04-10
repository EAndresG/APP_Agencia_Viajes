const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Calificacion = db.define('Calificacion', {
  id_calificacion: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_usuario: DataTypes.INTEGER,
  id_paquete: DataTypes.INTEGER,
  puntuacion: { type: DataTypes.INTEGER, validate: { min: 1, max: 5 } },
  comentario: DataTypes.TEXT,
  fecha_calificacion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: 'calificaciones',
  timestamps: false
});

module.exports = Calificacion;
