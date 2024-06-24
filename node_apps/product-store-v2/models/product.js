/**
 * Reference:
 * https://sequelize.org/docs/v6/core-concepts/model-basics/
 *
 */

const { DataTypes } = require("sequelize");
/**
 * Include our Sequelize instance, which we have
 * initialized in the database.js file.
 */
const sequelize = require("../database");

const Product = sequelize.define("Product", {
   name: {
    type: DataTypes.STRING,
    allowNull: false,
   },
   price: {
    type: DataTypes.FLOAT,
    allowNull: false,
   }
    
});

module.exports = Product;
