const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Reservation = sequelize.define('Reservation', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  packageId: { type: DataTypes.INTEGER, allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  people: { type: DataTypes.INTEGER, allowNull: false },
  status: { type: DataTypes.ENUM('confirmed', 'pending', 'cancelled'), defaultValue: 'pending' },
  amount: { type: DataTypes.FLOAT, allowNull: false },
}, { timestamps: true });

module.exports = Reservation;