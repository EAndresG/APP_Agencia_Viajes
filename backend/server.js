require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const usuarioRoutes = require('./routes/usuario.routes');
const paqueteRoutes = require('./routes/paquete.routes');
const calificacionRoutes = require('./routes/calificacion.routes');
const articuloRoutes = require('./routes/articulo.routes');
const adminRoutes = require('./routes/admin.routes');



app.use(express.json());

// Rutas
app.use('/auth', authRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/paquetes', paqueteRoutes);
app.use('/paquetes', calificacionRoutes); // calificaciones usan /paquetes/:id/calificar
app.use('/articulos', articuloRoutes);
app.use('/admin', adminRoutes);

// Verificar conexión a DB
db.authenticate()
  .then(() => console.log('Conexión a la base de datos exitosa.'))
  .catch(err => console.error('Error al conectar a la base de datos:', err));

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);

  console.log('El servidor ha iniciado correctamente.');
});

// Descomenta esto una sola vez para crear las tablas en DB
// const { db } = require('./models');
// db.sync({ alter: true }).then(() => console.log("Tablas sincronizadas."));

