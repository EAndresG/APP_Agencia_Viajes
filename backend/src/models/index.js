// Importar los modelos
const User = require('./User'); // Modelo de usuarios
const Guide = require('./Guide'); // Modelo de guías
const Admin = require('./Admin'); // Modelo de administradores
const Package = require('./Package'); // Modelo de paquetes
const Reservation = require('./Reservation'); // Modelo de reservas
const Review = require('./Review'); // Modelo de reseñas
const ContactMessage = require('./contactMessage'); // Modelo de mensajes de contacto
const PackageView = require('./PackageView'); // Modelo de vistas de paquetes

// Relación User - Guide
User.hasOne(Guide, { foreignKey: 'userId', onDelete: 'CASCADE' }); // Un usuario puede ser un guía
Guide.belongsTo(User, { foreignKey: 'userId' }); // Un guía pertenece a un usuario

// Relación User - Admin
User.hasOne(Admin, { foreignKey: 'userId', onDelete: 'CASCADE' }); // Un usuario puede ser un administrador
Admin.belongsTo(User, { foreignKey: 'userId' }); // Un administrador pertenece a un usuario

// Relación Guide - Package
Guide.hasMany(Package, { foreignKey: 'guideId', onDelete: 'SET NULL' }); // Un guía puede tener muchos paquetes
Package.belongsTo(Guide, { foreignKey: 'guideId' }); // Un paquete pertenece a un guía

// Relación User - Reservation
User.hasMany(Reservation, { foreignKey: 'userId', onDelete: 'CASCADE' }); // Un usuario puede tener muchas reservas
Reservation.belongsTo(User, { foreignKey: 'userId' }); // Una reserva pertenece a un usuario

// Relación Package - Reservation
Package.hasMany(Reservation, { foreignKey: 'packageId', onDelete: 'CASCADE' }); // Un paquete puede tener muchas reservas
Reservation.belongsTo(Package, { foreignKey: 'packageId' }); // Una reserva pertenece a un paquete

// Relación User - Review
User.hasMany(Review, { foreignKey: 'userId', onDelete: 'CASCADE' }); // Un usuario puede escribir muchas reseñas
Review.belongsTo(User, { foreignKey: 'userId' }); // Una reseña pertenece a un usuario

// Relación Package - Review
Package.hasMany(Review, { foreignKey: 'packageId', onDelete: 'CASCADE' }); // Un paquete puede tener muchas reseñas
Review.belongsTo(Package, { foreignKey: 'packageId' }); // Una reseña pertenece a un paquete

// Relación Package - PackageView
Package.hasOne(PackageView, { foreignKey: 'packageId', onDelete: 'CASCADE' }); // Un paquete puede tener una vista asociada
PackageView.belongsTo(Package, { foreignKey: 'packageId' }); // Una vista pertenece a un paquete

// Exportar los modelos para usarlos en otras partes de la aplicación
module.exports = {
  User,
  Guide,
  Admin,
  Package,
  Reservation,
  Review,
  ContactMessage,
  PackageView,
};