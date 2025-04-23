const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Guide = sequelize.define('Guide', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  specialty: { type: DataTypes.STRING },
  location: { type: DataTypes.STRING },
  languages: { type: DataTypes.STRING },
  bio: { type: DataTypes.TEXT },
  photo: { type: DataTypes.STRING },
}, { timestamps: true });

module.exports = Guide;