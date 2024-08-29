'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          email: 'jhon@gmail.com',
          firstName: 'John',
          lastName: 'Doe',
          password: '123',
          city: 'petersburg',
          phone: 'John Doe',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: 'oleg@gmail.com',
          firstName: 'Олег',
          lastName: 'Петров',
          password: '123',
          city: 'petersburg',
          phone: 'John Doe',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: 'evgen322@gmail.com',
          firstName: 'Евгений',
          lastName: 'Рыжиков',
          password: '123',
          city: 'petersburg',
          phone: 'John Doe',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: 'vlad_che_kavo@gmail.com',
          firstName: 'Владлен',
          lastName: 'Смирнов',
          password: '123',
          city: 'petersburg',
          phone: 'John Doe',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: 'tratatatata@gmail.com',
          firstName: 'Евгений',
          lastName: 'Гений',
          password: '123',
          city: 'petersburg',
          phone: 'John Doe',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
