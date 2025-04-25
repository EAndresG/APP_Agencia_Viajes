// Importar Sequelize, un ORM para interactuar con la base de datos
const { Sequelize } = require('sequelize');

// Cargar las variables de entorno desde el archivo .env
require('dotenv').config();

// Crear una instancia de Sequelize para conectarse a la base de datos
const sequelize = new Sequelize(
  process.env.DB_NAME, // Nombre de la base de datos
  process.env.DB_USER, // Usuario de la base de datos
  process.env.DB_PASSWORD, // Contraseña del usuario
  {
    host: process.env.DB_HOST, // Dirección del host de la base de datos
    port: process.env.DB_PORT, // Puerto de la base de datos
    dialect: 'mysql', // Tipo de base de datos (en este caso, MySQL)
    logging: false, // Desactivar el registro de consultas SQL en la consola
  }
);

// Exportar la instancia de Sequelize para usarla en otros archivos
module.exports = sequelize;