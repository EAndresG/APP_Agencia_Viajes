const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Package = sequelize.define('Package', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  guideId: { type: DataTypes.INTEGER, allowNull: true },
  name: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  capacity: { type: DataTypes.INTEGER, allowNull: false },
  duration: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT },
  longDescription: { type: DataTypes.TEXT },
  itinerary: { type: DataTypes.TEXT },
}, { timestamps: true });

module.exports = Package;