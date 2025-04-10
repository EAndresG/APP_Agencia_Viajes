require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./config/db');

// Importar rutas
const authRoutes = require('./routes/auth.routes');
const usuarioRoutes = require('./routes/usuario.routes');
const paqueteRoutes = require('./routes/paquete.routes');
const calificacionRoutes = require('./routes/calificacion.routes');
const articuloRoutes = require('./routes/articulo.routes');
const adminRoutes = require('./routes/admin.routes');

// Middleware para parsear JSON
app.use(express.json());

// Configurar rutas
app.use('/auth', authRoutes); // Rutas de autenticación
app.use('/usuarios', usuarioRoutes); // Rutas de usuarios
app.use('/paquetes', paqueteRoutes); // Rutas de paquetes
app.use('/calificaciones', calificacionRoutes); // Rutas de calificaciones
app.use('/articulos', articuloRoutes); // Rutas de artículos
app.use('/admin', adminRoutes); // Rutas de administración

// Verificar conexión a la base de datos
db.authenticate()
  .then(() => console.log('Conexión a la base de datos exitosa.'))
  .catch(err => console.error('Error al conectar a la base de datos:', err));

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

// Descomenta esto una sola vez para sincronizar las tablas en la base de datos
// const { db } = require('./models');
// db.sync({ alter: true }).then(() => console.log("Tablas sincronizadas."));

