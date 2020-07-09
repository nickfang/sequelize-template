module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.firstName} ${this.lastName}`;
      },
      set(value) {
        throw new Error('Cannot set `fullName`.  Must set `firstName` and `lastName` separately.');
      },
    },
    email: { type: DataTypes.STRING, unique: true, isEmail: true },
    password: DataTypes.STRING,
    resetToken: DataTypes.STRING,
    resetTokenExpiry: DataTypes.FLOAT,
    permissions: DataTypes.ARRAY(DataTypes.ENUM('ADMIN', 'USER', 'PERMISSIONUPDATE')),
  });
  User.afterCreate(async user => {
    sequelize.models.UserSetting.create({
      userId: user.id,
    });
  });

  return User;
};