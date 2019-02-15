var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let verifyToken = require('./middleware/verifyToken');
let connection = require('./config/config')

var routes = require('./routes/route');
var mysql = require("mysql");

var app = express();

//Database connection
app.use(function (req, res, next) {
  //  res.locals.connection = mysql.createConnection(connection.connectionString.master);
  res.locals.connection = mysql.createConnection({
    host: 'ls-2aeb1c1fe0b660112ee44b393820ed9231ef3e56.cme9hi51gi7l.ap-south-1.rds.amazonaws.com',
    user: 'dbmasteruser',
    password: 'a$qVdt6!0vXdVMa$C.IlWkbty:Y%.x9_',
    database: 'stylecracker'
  });
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
