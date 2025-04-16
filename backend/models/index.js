const db = require('../config/db');
const Usuario = require('./usuario.model');
const Paquete = require('./paquete.model');
const Calificacion = require('./calificacion.model');
const Articulo = require('./articulo.model');
const Administrador = require('./administrador.model');

// Relaciones
Usuario.hasMany(Paquete, { foreignKey: 'id_agencia' });
Paquete.belongsTo(Usuario, { foreignKey: 'id_agencia' });

Usuario.hasMany(Calificacion, { foreignKey: 'id_usuario' });
Paquete.hasMany(Calificacion, { foreignKey: 'id_paquete' });

Calificacion.belongsTo(Usuario, { foreignKey: 'id_usuario' });
Calificacion.belongsTo(Paquete, { foreignKey: 'id_paquete' });

Usuario.hasMany(Articulo, { foreignKey: 'id_autor' });
Articulo.belongsTo(Usuario, { foreignKey: 'id_autor' });

Usuario.hasOne(Administrador, { foreignKey: 'id_usuario' });
Administrador.belongsTo(Usuario, { foreignKey: 'id_usuario' });

module.exports = {
  db,
  Usuario,
  Paquete,
  Calificacion,
  Articulo,
  Administrador
};
