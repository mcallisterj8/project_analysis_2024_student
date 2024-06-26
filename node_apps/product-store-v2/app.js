const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const seedRouter = require("./routes/seed");

/**
 *  ****************** APPROACH 1 ******************
 *
 * Sequelize database setup.
 *
 * This line imports the Sequelize instance from the database.js file.
 * This makes the sequelize object available in app.js, allowing us
 * to use it for database operations throughout our application.
 *
 * We also need to import the Book model in order for the
 * call to sequelize.sync() later in this file to read the
 * book.js file and create the subsequent books table.
 *
 * */
// const sequelize = require("./database");
// const Book = require("./models/book");

/**
 * ****************** APPROACH 2 (PREFERRED) ******************
 *
 * Import the database instance, sequelize, as well as centralized models through
 * the inclusion of the init file. Because in the init file we have named the
 * exported object properties "sequelize" and "models", we can just get the sequelize
 * model by calling it out by that "sequelize" name here.
 *
 * And because the init.js file has imported the database, we do not
 * need the above import of the database.js and book.js directly. Our database
 * will still be created if it does not exist through the below import.
 * */
const { sequelize } = require("./models/init");

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Calling sync() on our Sequelize instance like this will
 * automatically synchronize all of the models - meaning that
 * the models which you have created will all be checked, and the
 * database will be acted up in order to create the tables that
 * the models describe.
 *
 * sequelize.sync()
 *        This creates the table if it doesn't exist,
 *        and does nothing if it already exists.
 *
 * sequelize.sync({ force: true })
 *        This creates the table, dropping it first if it
 *        already existed.
 *
 * sequelize.sync({ alter: true })
 *        This checks what is the current state of the tables in the database
 *        (which columns it has, what are their data types, etc), and then
 *        performs the necessary changes in the table to make it match the model.
 *
 * We are using the {force: true} option here because this is convenient for
 * us ** while we are in DEVELOPMENT **. This should more than likely NOT be done
 * when the app is in production as this will destroy all data in the database once
 * the application is turned on or restarted.
 *
 * Performing this sync() at the location we are, before the routes, is
 * the location we need this in. This is because this app.js file is executed
 * in a top-down fashion, and therefore we will have our database
 * synced *before* the app will start to handle the routes (which will need
 * to use the models/database.).
 *    Though you can notice that we are handling this in an asynchronous
 *    way, when the app is first turned on, there will not be requests that
 *    will need to be immediately handled, so even if we do a then() on the sync function,
 *    technically would could parse an incoming request before that is done,
 *    this is unlikely, and certainly not a concern while in development. If you would
 *    like to resturcture the code to do this in other ways.
 *
 *    (Note that we cannot call "await" since await is only valid in
 *    async functions and the top level bodies of modules.)
 *
 *
 */
sequelize
  .sync({force: false})
  .then(() => {
    console.log("All models were synchronized successfully.");
  })
  .catch((err) => {
    console.error("Unable to synchronize the database:", err);
  });

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/seed', seedRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
