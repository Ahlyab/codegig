const Sequelize = require("sequelize");
module.exports = new Sequelize("codegigs", "root", "admin", {
  host: "localhost",
  dialect: "mysql",
});
