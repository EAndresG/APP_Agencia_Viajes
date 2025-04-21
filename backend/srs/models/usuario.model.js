const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  email: { type: String, unique: true },
  telefono: String,
  contraseña: String,
  rol: { type: String, enum: ['usuario', 'guia', 'admin'], default: 'usuario' },
  estado: { type: String, enum: ['pendiente', 'aprobado'], default: 'pendiente' },
  especialidades: [String],
  descripcion: String,
  identificacion: String,
});

module.exports = mongoose.model('Usuario', UsuarioSchema);