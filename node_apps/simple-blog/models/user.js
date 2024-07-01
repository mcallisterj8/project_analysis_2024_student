const { DataTypes } = require("sequelize");
/**
 * Include our Sequelize instance, which we have
 * initialized in the database.js file.
 */
const sequelize = require("../database");

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = User;
