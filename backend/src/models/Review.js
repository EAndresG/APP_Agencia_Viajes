// Importar DataTypes para definir los tipos de datos y sequelize para la conexión a la base de datos
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Configuración de la base de datos

// Definir el modelo de Reseñas
const Review = sequelize.define('Review', {
  id: { 
    type: DataTypes.INTEGER, // Tipo de dato entero
    primaryKey: true, // Clave primaria
    autoIncrement: true, // Incremento automático
  },
  userId: { 
    type: DataTypes.INTEGER, // Relación con el modelo de usuarios
    allowNull: false, // Campo obligatorio
  },
  packageId: { 
    type: DataTypes.INTEGER, // Relación con el modelo de paquetes
    allowNull: false, // Campo obligatorio
  },
  rating: { 
    type: DataTypes.INTEGER, // Calificación del paquete (por ejemplo, de 1 a 5)
    allowNull: false, // Campo obligatorio
  },
  comment: { 
    type: DataTypes.TEXT, // Comentario del usuario sobre el paquete
  },
}, { 
  timestamps: true, // Agregar automáticamente campos de creación y actualización
});

// Exportar el modelo para usarlo en otras partes de la aplicación
module.exports = Review;