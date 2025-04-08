const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME, // Nombre de la base de datos
  process.env.DB_USER, // Usuario de la base de datos
  process.env.DB_PASSWORD, // Contraseña de la base de datos (corrección aquí)
  {
    host: process.env.DB_HOST, // Host de la base de datos
    dialect: process.env.DB_DIALECT || 'mysql', // Dialecto (MySQL por defecto)
    logging: process.env.DB_LOGGING === 'true' ? console.log : false, // Solución aquí
  }
);

sequelize.authenticate()
    .then(() => console.log('Conexión a la base de datos exitosa.'))
    .catch(err => console.error('Error al conectar a la base de datos:', err));

module.exports = sequelize;
