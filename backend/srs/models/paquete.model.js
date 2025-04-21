const mongoose = require('mongoose');

const PaqueteSchema = new mongoose.Schema({
  nombre: String,
  ubicacion: String,
  precio: Number,
  capacidad: String,
  duracion: String,
  descripcion: String,
  itinerario: String,
  incluye: [String],
  amenidades: [String],
  etiquetas: [String],
  estado: { type: String, enum: ['activo', 'borrador', 'inactivo'], default: 'borrador' },
  guia: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  imagenes: [String],
});

module.exports = mongoose.model('Paquete', PaqueteSchema);