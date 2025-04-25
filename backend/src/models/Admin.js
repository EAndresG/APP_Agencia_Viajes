// Importar DataTypes para definir los tipos de datos y sequelize para la conexión a la base de datos
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Configuración de la base de datos

// Definir el modelo de Administrador
const Admin = sequelize.define('Admin', {
  id: { 
    type: DataTypes.INTEGER, // Tipo de dato entero
    primaryKey: true, // Clave primaria
    autoIncrement: true, // Incremento automático
  },
  userId: { 
    type: DataTypes.INTEGER, // Relación con el modelo de usuarios
    allowNull: false, // Campo obligatorio
  },
  role: { 
    type: DataTypes.STRING, // Tipo de dato cadena
    defaultValue: 'moderator', // Valor predeterminado
  },
}, { 
  timestamps: true, // Agregar campos de creación y actualización automáticos
});

// Exportar el modelo para usarlo en otras partes de la aplicación
module.exports = Admin;