const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const Paquete = sequelize.define('Paquete', {
  nombre: { type: DataTypes.STRING, allowNull: false },
  ubicacion: { type: DataTypes.STRING, allowNull: false },
  precio: { type: DataTypes.FLOAT, allowNull: false },
  capacidad: { type: DataTypes.STRING, allowNull: false },
  duracion: { type: DataTypes.STRING, allowNull: false },
  descripcion: { type: DataTypes.TEXT, allowNull: false },
  estado: { type: DataTypes.ENUM('activo', 'borrador', 'inactivo'), defaultValue: 'borrador' },
});

module.exports = Paquete;