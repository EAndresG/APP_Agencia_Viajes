'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Packages', 'images', {
      type: Sequelize.TEXT, // Usar TEXT para almacenar las rutas como una cadena
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Packages', 'images');
  },
};