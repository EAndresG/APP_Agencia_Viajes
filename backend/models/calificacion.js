const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Calificacion = sequelize.define('Calificacion', {
    puntuacion: DataTypes.INTEGER,
    comentario: DataTypes.TEXT,
    fecha_calificacion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});
module.exports = Calificacion;