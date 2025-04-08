require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./config/db');

// Importa las rutas correctamente
const authRoutes = require('./routes/auth');
const usuariosRoutes = require('./routes/usuarios'); // Cambiado a usuariosRoutes
const agenciasRoutes = require('./routes/agencias'); // Cambiado a agenciasRoutes
const paquetesRoutes = require('./routes/paquetes'); // Cambiado a paquetesRoutes
const articulosRoutes = require('./routes/articulos'); // Cambiado a articulosRoutes
const adminRoutes = require('./routes/admin'); // Cambiado a adminRoutes

// Verifica que las rutas sean funciones válidas
console.log('authRoutes:', typeof authRoutes); // Debe ser "function"
console.log('usuariosRoutes:', typeof usuariosRoutes); // Debe ser "function"
console.log('agenciasRoutes:', typeof agenciasRoutes); // Debe ser "function"
console.log('paquetesRoutes:', typeof paquetesRoutes); // Debe ser "function"
console.log('articulosRoutes:', typeof articulosRoutes); // Debe ser "function"
console.log('adminRoutes:', typeof adminRoutes); // Debe ser "function"

// Middlewares
app.use(express.json());

// Usa las rutas correctamente
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/agencias', agenciasRoutes);
app.use('/api/paquetes', paquetesRoutes);
app.use('/api/articulos', articulosRoutes);
app.use('/api/admin', adminRoutes);

// Configuración del servidor
const PORT = process.env.PORT || 3000;
db.sync({ alter: true }).then(() => {
    console.log('DB conectada.');
    app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
}).catch(err => console.error('Error conectando DB:', err));
