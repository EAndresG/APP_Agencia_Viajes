const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Guide = sequelize.define('Guide', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  experience: { type: DataTypes.INTEGER },
  specialties: { type: DataTypes.JSON },
  description: { type: DataTypes.TEXT },
  identification: { type: DataTypes.STRING },
}, { timestamps: true });

module.exports = Guide;