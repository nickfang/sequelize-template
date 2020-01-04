const Sequelize = require("sequelize");

const sequelize = new Sequelize("template", "postgres", "0000", {
  host: "localhost",
  dialect: "postgres"
});

const models = {
  User: sequelize.import("./models/user"),
  Message: sequelize.import("./models/message"),
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

const eraseDatabaseOnSync = true;

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if( eraseDatabaseOnSync) {
    createUsersWithMessages();
  }
});

const createUsersWithMessages = async () => {
  await models.User.create(
    {
      username: 'nfang',
      messages: [
        {
          text: 'Sequelize template project.'
        },
      ],
    },
    {
      include: [models.Message],
    }
  );

  await models.User.create(
    {
      username: 'gnafkcin',
      messages: [
        {
          text: 'Lets go Sports Climbs',
        },
        {
          text: 'Rock on!',
        },
      ],
    },
    {
      include: [models.Message],
    },
  )
};
