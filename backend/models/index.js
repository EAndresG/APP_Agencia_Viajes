const sequelize = require('../config/db');
const Usuario = require('./usuario');
const Agencia = require('./agencia');
const Paquete = require('./paquete');
const Calificacion = require('./calificacion');
const Articulo = require('./articulo');
const Admin = require('./admin');

Usuario.hasMany(Calificacion);
Calificacion.belongsTo(Usuario);

Usuario.hasMany(Articulo);
Articulo.belongsTo(Usuario);

Agencia.hasMany(Paquete);
Paquete.belongsTo(Agencia);

Paquete.hasMany(Calificacion);
Calificacion.belongsTo(Paquete);

Admin.belongsTo(Usuario);

module.exports = { sequelize, Usuario, Agencia, Paquete, Calificacion, Articulo, Admin };
