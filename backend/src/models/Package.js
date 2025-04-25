// Importar DataTypes para definir los tipos de datos y sequelize para la conexión a la base de datos
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Configuración de la base de datos

// Definir el modelo de Paquetes
const Package = sequelize.define('Package', {
  id: { 
    type: DataTypes.INTEGER, // Tipo de dato entero
    primaryKey: true, // Clave primaria
    autoIncrement: true, // Incremento automático
  },
  guideId: { 
    type: DataTypes.INTEGER, // Relación con el modelo de guías
    allowNull: true, // Campo opcional
  },
  name: { 
    type: DataTypes.STRING, // Nombre del paquete
    allowNull: false, // Campo obligatorio
  },
  location: { 
    type: DataTypes.STRING, // Ubicación del paquete
    allowNull: false, // Campo obligatorio
  },
  price: { 
    type: DataTypes.FLOAT, // Precio del paquete
    allowNull: false, // Campo obligatorio
  },
  capacity: { 
    type: DataTypes.INTEGER, // Capacidad máxima de personas
    allowNull: false, // Campo obligatorio
  },
  duration: { 
    type: DataTypes.STRING, // Duración del paquete (por ejemplo, "3 días")
  },
  description: { 
    type: DataTypes.TEXT, // Descripción breve del paquete
  },
  longDescription: { 
    type: DataTypes.TEXT, // Descripción detallada del paquete
  },
  itinerary: { 
    type: DataTypes.TEXT, // Itinerario del paquete
  },
}, { 
  timestamps: true, // Agregar automáticamente campos de creación y actualización
});

// Exportar el modelo para usarlo en otras partes de la aplicación
module.exports = Package;