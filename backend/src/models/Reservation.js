// Importar DataTypes para definir los tipos de datos y sequelize para la conexión a la base de datos
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Configuración de la base de datos

// Definir el modelo de Reservas
const Reservation = sequelize.define('Reservation', {
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
  date: { 
    type: DataTypes.DATEONLY, // Fecha de la reserva (solo fecha, sin hora)
    allowNull: false, // Campo obligatorio
  },
  people: { 
    type: DataTypes.INTEGER, // Número de personas en la reserva
    allowNull: false, // Campo obligatorio
  },
  status: { 
    type: DataTypes.ENUM('confirmed', 'pending', 'cancelled'), // Estado de la reserva
    defaultValue: 'pending', // Valor predeterminado: pendiente
  },
  amount: { 
    type: DataTypes.FLOAT, // Monto total de la reserva
    allowNull: false, // Campo obligatorio
  },
}, { 
  timestamps: true, // Agregar automáticamente campos de creación y actualización
});

// Exportar el modelo para usarlo en otras partes de la aplicación
module.exports = Reservation;