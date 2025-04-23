const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING },
  userType: { type: DataTypes.ENUM('user', 'guide', 'admin'), defaultValue: 'user' },
  acceptTerms: { type: DataTypes.BOOLEAN, defaultValue: false },
}, { timestamps: true });

module.exports = User;