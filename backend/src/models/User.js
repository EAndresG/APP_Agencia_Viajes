// Importar DataTypes para definir los tipos de datos y sequelize para la conexión a la base de datos
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Configuración de la base de datos

// Definir el modelo de Usuarios
const User = sequelize.define('User', {
  id: { 
    type: DataTypes.INTEGER, // Tipo de dato entero
    primaryKey: true, // Clave primaria
    autoIncrement: true, // Incremento automático
  },
  firstName: { 
    type: DataTypes.STRING, // Nombre del usuario
    allowNull: false, // Campo obligatorio
  },
  lastName: { 
    type: DataTypes.STRING, // Apellido del usuario
    allowNull: false, // Campo obligatorio
  },
  email: { 
    type: DataTypes.STRING, // Correo electrónico del usuario
    unique: true, // Debe ser único
    allowNull: false, // Campo obligatorio
  },
  password: { 
    type: DataTypes.STRING, // Contraseña del usuario (encriptada)
    allowNull: false, // Campo obligatorio
  },
  phone: { 
    type: DataTypes.STRING, // Número de teléfono del usuario
  },
  userType: { 
    type: DataTypes.ENUM('user', 'guide', 'admin'), // Tipo de usuario (cliente, guía o administrador)
    defaultValue: 'user', // Valor predeterminado: cliente
  },
  acceptTerms: { 
    type: DataTypes.BOOLEAN, // Indica si el usuario aceptó los términos y condiciones
    defaultValue: false, // Valor predeterminado: no aceptado
  },
}, { 
  timestamps: true, // Agregar automáticamente campos de creación y actualización
});

// Exportar el modelo para usarlo en otras partes de la aplicación
module.exports = User;