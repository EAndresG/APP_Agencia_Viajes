const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Admin = sequelize.define('Admin', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: 'moderator' },
}, { timestamps: true });

module.exports = Admin;