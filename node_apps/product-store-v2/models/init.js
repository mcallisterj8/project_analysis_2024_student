const sequelize = require("../database");

// Import all models
const Product = require("./product");

const models = {
    Product,
};

// Export the Sequelize instance and all models
module.exports = {
    sequelize,
    models,    
};
