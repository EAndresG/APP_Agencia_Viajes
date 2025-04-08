require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./config/db');

const authRoutes = require('./routes/auth');
const usuarioRoutes = require('./routes/usuarios');
const agenciaRoutes = require('./routes/agencias');
const paqueteRoutes = require('./routes/paquetes');
const articuloRoutes = require('./routes/articulos');
const adminRoutes = require('./routes/admin');

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/agencias', agenciaRoutes);
app.use('/paquetes', paqueteRoutes);
app.use('/articulos', articuloRoutes);
app.use('/admin', adminRoutes);

const PORT = process.env.PORT || 3000;
db.sync({ alter: true }).then(() => {
    console.log('DB conectada.');
    app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
}).catch(err => console.error('Error conectando DB:', err));
