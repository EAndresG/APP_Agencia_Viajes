const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PackageView = sequelize.define('PackageView', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  packageId: { type: DataTypes.INTEGER, allowNull: false },
  views: { type: DataTypes.INTEGER, defaultValue: 0 },
}, { timestamps: true });

module.exports = PackageView;