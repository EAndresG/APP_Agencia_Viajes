// Importar DataTypes para definir los tipos de datos y sequelize para la conexión a la base de datos
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Configuración de la base de datos

// Definir el modelo de Vistas de Paquetes
const PackageView = sequelize.define('PackageView', {
  id: { 
    type: DataTypes.INTEGER, // Tipo de dato entero
    primaryKey: true, // Clave primaria
    autoIncrement: true, // Incremento automático
  },
  packageId: { 
    type: DataTypes.INTEGER, // Relación con el modelo de paquetes
    allowNull: false, // Campo obligatorio
  },
  views: { 
    type: DataTypes.INTEGER, // Número de vistas del paquete
    defaultValue: 0, // Valor inicial predeterminado
  },
}, { 
  timestamps: true, // Agregar automáticamente campos de creación y actualización
});

// Exportar el modelo para usarlo en otras partes de la aplicación
module.exports = PackageView;