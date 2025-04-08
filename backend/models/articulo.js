const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Articulo = sequelize.define('Articulo', {
    titulo: DataTypes.STRING,
    contenido: DataTypes.TEXT,
    imagen_destacada: DataTypes.STRING,
    fecha_publicacion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});
module.exports = Articulo;