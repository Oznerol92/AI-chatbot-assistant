var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

// .env
require('dotenv').config()

var apiRouter = require('./routes/api');

var app = express();

app.use(cors({
  origin: 'http://localhost:5173', // or use "*" during development
}));
app.disable('x-powered-by')
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'production-test') {
  app.use(express.static(path.join(__dirname, 'public/build')))
  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/build', 'index.html'))
  })
}

app.use('/api/', apiRouter);

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
