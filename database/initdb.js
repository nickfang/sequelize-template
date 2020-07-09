const db = require('./models/index');
const bcrypt = require('bcryptjs');
const { log } = require('../utils/strings');
const sequelize = db.sequelize;

const models = {
  User: sequelize.import("./models/user"),
  UserSetting: sequelize.import("./models/userSetting"),
};

Object.keys(models).forEach(key => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established.");
  })
  .catch(err => {
    console.log("Unable to connect:", err);
  });

// erase database and populate with sample data
const eraseDatabaseOnSync = true;

const createData = async () => {
  let userId;
  try {
    const user = await models.User.create({
      // fullName: 'Nicholas Fang',
      firstName: 'Nicholas',
      lastName: 'Fang',
      email: 'nfang@nfang.com',
      password: await bcrypt.hash('0000', 10),
      permissions: ['ADMIN'],
    });
    // log('User Created', JSON.stringify(user));
    userId = user.dataValues.id;
  } catch (error) {
    log('Error Creating User', error);
  }
};

const deleteData = async () => {
  try {
    const numDeleted = await models.User.destroy({
      where: { id: 1 },
    });
    // log(`Deleting User${numDeleted > 1 ? 's': ''}`, `${numDeleted} user${numDeleted > 1 ? 's' : ''} deleted`)
  } catch (error) {
    log(`Error Destroying User${numDeleted > 1 ? 's' : ''}`, error);
  }
};

sequelize.sync({ force: eraseDatabaseOnSync })
  .then(async () => {
    await createData();
    if (eraseDatabaseOnSync) {
    }
  })
  .catch(error => {
    log('error on sync', error);
  });
