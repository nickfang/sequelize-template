'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('ExpenseItem', [{
        date: DataTypes.DATEONLY,
        description: DataTypes.STRING,
        amount: DataTypes.INTEGER,
        category: DataTypes.STRING,
        payment: DataTypes.STRING,
        purpose: DataTypes.STRING,
      }], {});

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('ExpenseItem', null, {});
  }
};
