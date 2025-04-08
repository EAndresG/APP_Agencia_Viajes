const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Paquete = sequelize.define('Paquete', {
    titulo: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
    precio: DataTypes.FLOAT,
    destino: DataTypes.STRING,
    incluye_transporte: DataTypes.BOOLEAN,
    hotel_frente_mar: DataTypes.BOOLEAN,
    comidas_incluidas: DataTypes.BOOLEAN,
    popularidad: { type: DataTypes.FLOAT, defaultValue: 0 },
    fecha_publicacion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});
module.exports = Paquete;