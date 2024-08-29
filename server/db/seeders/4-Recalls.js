'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Recalls',
      [
        {
          text: 'Продам гараж! Срочно! 8(800)555-35-35',
          userId: 1,
          museumId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          text: 'Очень понравилось, но можно было лучше',
          userId: 2,
          museumId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          text: 'Не очень понравилось, но могло быть и хуже',
          userId: 3,
          museumId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          text: 'А я с удовольствием сходил, просто отлично что есть возможность посещать музеи по единой карте, вау!',
          userId: 4,
          museumId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          text: 'уроним сервер, не дорого, большой опыт, обращайтесь на museum_team@mail.ru',
          userId: 5,
          museumId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Recalls', null, {});
  },
};
