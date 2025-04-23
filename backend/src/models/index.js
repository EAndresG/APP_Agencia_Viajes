const User = require('./User');
const Guide = require('./Guide');
const Admin = require('./Admin');
const Package = require('./Package');
const Reservation = require('./Reservation');
const Review = require('./Review');
const ContactMessage = require('./contactMessage');
const PackageView = require('./PackageView');

// Relación User - Guide
User.hasOne(Guide, { foreignKey: 'userId', onDelete: 'CASCADE' });
Guide.belongsTo(User, { foreignKey: 'userId' });

// Relación User - Admin
User.hasOne(Admin, { foreignKey: 'userId', onDelete: 'CASCADE' });
Admin.belongsTo(User, { foreignKey: 'userId' });

// Relación Guide - Package
Guide.hasMany(Package, { foreignKey: 'guideId', onDelete: 'SET NULL' });
Package.belongsTo(Guide, { foreignKey: 'guideId' });

// Relación User - Reservation
User.hasMany(Reservation, { foreignKey: 'userId', onDelete: 'CASCADE' });
Reservation.belongsTo(User, { foreignKey: 'userId' });

// Relación Package - Reservation
Package.hasMany(Reservation, { foreignKey: 'packageId', onDelete: 'CASCADE' });
Reservation.belongsTo(Package, { foreignKey: 'packageId' });

// Relación User - Review
User.hasMany(Review, { foreignKey: 'userId', onDelete: 'CASCADE' });
Review.belongsTo(User, { foreignKey: 'userId' });

// Relación Package - Review
Package.hasMany(Review, { foreignKey: 'packageId', onDelete: 'CASCADE' });
Review.belongsTo(Package, { foreignKey: 'packageId' });

// Relación Package - PackageView
Package.hasOne(PackageView, { foreignKey: 'packageId', onDelete: 'CASCADE' });
PackageView.belongsTo(Package, { foreignKey: 'packageId' });

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