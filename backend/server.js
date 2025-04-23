require('dotenv').config();
const express = require('express');
const sequelize = require('./src/config/database');
const cors = require('cors');
const routes = require('./src/routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api', routes);

// Conexión a la base de datos y servidor
sequelize
  .authenticate()
  .then(() => {
    console.log('Conexión a la base de datos exitosa');
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log('Base de datos sincronizada');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error al conectar a la base de datos:', err);
  });

