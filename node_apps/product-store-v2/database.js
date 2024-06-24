/**
 * This line imports the Sequelize library, which is an ORM
 * (Object-Relational Mapper) for Node.js that supports various
 * databases including SQLite, MySQL, PostgreSQL, and others.
 */
const Sequelize = require("sequelize");

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage:"./product_db.sqlite"
});

/**
 * This section tests the connection to the database by calling
 * the authenticate method on the Sequelize instance. If the connection
 * is successful, it logs a success message. If there's an error,
 * it catches the error and logs an error message. Note that since
 * Node runs on the server, rather than the browser, these console logs
 * will appear in the *terminal* in which you have started the
 * application - NOT in the browser.
 *
 * The authenticate() method checks if the connection to the database
 * is successful. It attempts to connect to the database using the
 * configuration provided when the Sequelize instance was created.
 * For databases like MySQL or PostgreSQL, credentials (username, password, host, etc.)
 * would typically be required. However, SQLite, being a file-based database,
 * doesn't require such credentials.
 */
sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });

/**
 * This line exports the sequelize instance so it can be used in
 * other parts of the application. Check the app.js file to see
 * how this database.js is called. Note that we are able to call
 * this file in the app.js (and anywhere else) because of this
 * of the exporting statement below.
 */
module.exports = sequelize;
