const { Sequelize } = require("sequelize");
var bdd = new Sequelize("tp_tcg", "root",
    " ", {
    host: "localhost",
    dialect: "mysql",
});
await bdd.authenticate();
module.exports = bdd;