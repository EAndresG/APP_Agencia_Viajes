// Importar DataTypes para definir los tipos de datos y sequelize para la conexión a la base de datos
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Configuración de la base de datos

// Definir el modelo de Mensajes de Contacto
const ContactMessage = sequelize.define(
  "ContactMessage",
  {
    id: {
      type: DataTypes.INTEGER, // Tipo de dato entero
      primaryKey: true, // Clave primaria
      autoIncrement: true, // Incremento automático
    },
    name: {
      type: DataTypes.STRING(100), // Cadena de texto con un máximo de 100 caracteres
      allowNull: false, // Campo obligatorio
    },
    email: {
      type: DataTypes.STRING(150), // Cadena de texto con un máximo de 150 caracteres
      allowNull: false, // Campo obligatorio
    },
    message: {
      type: DataTypes.TEXT, // Texto largo para almacenar el mensaje
      allowNull: false, // Campo obligatorio
    },
    createdAt: {
      type: DataTypes.DATE, // Fecha de creación
      defaultValue: DataTypes.NOW, // Valor predeterminado: fecha y hora actual
    },
  },
  {
    tableName: "contact_messages", // Nombre de la tabla en la base de datos
    timestamps: false, // No agregar automáticamente campos de timestamps (createdAt, updatedAt)
  }
);

// Exportar el modelo para usarlo en otras partes de la aplicación
module.exports = ContactMessage;