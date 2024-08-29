'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Orders',
      [
        {
          userId: 1,
          userName: 'John Doe',
          address: 'г. Москва ул. Юмашева д. 10, кв. 12',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          userName: 'Олег Петров',
          address:
            'г. Набережные челны (челны, не перепутай) ул. Олега д. 58, кв. 55',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          userName: 'Евгений Рыжиков',
          address: 'г. Москва проспект Космонавтов д. 465, кв 12',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          userName: 'Владлен Смирнов',
          address: 'Санкт-Петербург, проспект Невский д. 177б, кв 65',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 5,
          userName: 'Евгений Гений',
          address: 'Москва, ул. Эльбрусская д. 2024, кв. 05/24',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Orders', null, {});
  },
};
