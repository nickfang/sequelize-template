const CATEGORY_DEFAULTS = [
  'CAR',
  'CHILDREN',
  'DONATION',
  'EATING_OUT',
  'ENTERTAINMENT',
  'FEE',
  'GIFTS',
  'GOING_OUT',
  'GROCERIES',
  'HOME',
  'INVESTMENTS',
  'MEDICAL',
  'MISC',
  'SAVINGS',
  'SHOPPING',
  'TECHNOLOGY',
  'TRANSPORTATION',
  'TRAVEL',
  'WORKOUT',
];

const PAYMENT_TYPE_DEFAULTS = [
  'CASH',
  'CREDIT_CARD',
  'VENMO',
  'PAYPAL',
  'CHECK',
  'OTHER',
];

const PURPOSES_DEFAULTS = [
  'SAVING',
  'NEED',
  'WANT',
];

module.exports = (sequelize, DataTypes) => {
  const UserSetting = sequelize.define('UserSetting', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    categories: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: CATEGORY_DEFAULTS,
    },
    payments: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: PAYMENT_TYPE_DEFAULTS,
    },
    purposes: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: PURPOSES_DEFAULTS,
    },
  }, {});
  UserSetting.associate = (models) => {
    UserSetting.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return UserSetting;
};