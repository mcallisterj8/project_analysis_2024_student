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

/**
 * Note that Sequelize will automatically create a field
 * called 'id' which will be an auto-incremented primary key
 * for the entity. This is the default behavior. You can, however,
 * specify it explicitly by adding this to the model if you wish:
  
   id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
   },

 */
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
