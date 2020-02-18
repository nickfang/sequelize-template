'use strict';
module.exports = (sequelize, DataTypes) => {
  const Temp = sequelize.define('Temp', {
    namne: DataTypes.STRING,
    description: DataTypes.STRING,
    age: DataTypes.INTEGER
  }, {});
  Temp.associate = function(models) {
    // associations can be defined here
  };
  return Temp;
};