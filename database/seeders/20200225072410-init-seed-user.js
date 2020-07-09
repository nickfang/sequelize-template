'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Users', [{
        name: 'Nick Fang',
        email: 'a@a.com',
        password: '',
        permissions: 'ADMIN',
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});

  }
};
