const { DataTypes } = require("sequelize");
/**
 * Include our Sequelize instance, which we have
 * initialized in the database.js file.
 */
const sequelize = require("../database");

const Post = sequelize.define("Post", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Post;
