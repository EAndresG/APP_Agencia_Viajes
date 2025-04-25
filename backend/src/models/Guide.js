// Importar DataTypes para definir los tipos de datos y sequelize para la conexión a la base de datos
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Configuración de la base de datos

// Definir el modelo de Guías
const Guide = sequelize.define('Guide', {
  id: { 
    type: DataTypes.INTEGER, // Tipo de dato entero
    primaryKey: true, // Clave primaria
    autoIncrement: true, // Incremento automático
  },
  userId: { 
    type: DataTypes.INTEGER, // Relación con el modelo de usuarios
    allowNull: false, // Campo obligatorio
  },
  description: { 
    type: DataTypes.TEXT, // Texto largo para la descripción del guía
  },
  identification: { 
    type: DataTypes.STRING, // Cadena de texto para la identificación del guía
  },
}, { 
  timestamps: true, // Agregar automáticamente campos de creación y actualización
});

// Exportar el modelo para usarlo en otras partes de la aplicación
module.exports = Guide;