require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');
const connectDB = require('./config/db');

// Conectar a la base de datos
connectDB();

// Crear la aplicación Express
const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Rutas
app.use('/api', routes);

module.exports = app;