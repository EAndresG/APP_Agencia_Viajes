// sync.js
const db = require('./config/db');
const models = require('./models'); // importa todos los modelos

db.sync({ alter: true }) // o { force: true } para borrar y recrear
  .then(() => {
    console.log('✅ Tablas sincronizadas con éxito');
    process.exit(); // Salir del proceso
  })
  .catch((err) => {
    console.error('❌ Error al sincronizar las tablas:', err);
  });
