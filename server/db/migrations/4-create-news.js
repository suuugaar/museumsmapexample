'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('News', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      text: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      museumId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Museums',
          },
          key: 'id',
        },
        onDelete: 'cascade',
      },
      photo: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      title_en: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      text_en: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      title_de: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      text_de: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('News');
  },
};
