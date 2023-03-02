'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      url_image: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    })
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('products');
  }
};
