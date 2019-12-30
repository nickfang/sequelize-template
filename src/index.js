const Sequelize = require("sequelize");

const sequelize = new Sequelize("template", "nfang", "0000", {
  host: "localhost",
  dialect: "postgres"
});

const models = {
  User: sequelize.import("./models/user")
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

sequelize.sync();
