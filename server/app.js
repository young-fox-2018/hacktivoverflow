require("dotenv").config()
var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
const NODE_ENV = process.env.NODE_ENV || 'development';
const cors = require('cors')

const mongoose = require('mongoose');
mongoose.connect('mongodb://kevin.tanuhardi:hacktiv8Password@ds225492.mlab.com:25492/scatter-overflow' );

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!")
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var questionsRouter = require('./routes/questions');
var tagsRouter = require('./routes/tags');

var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/questions', questionsRouter);
app.use('/tags', tagsRouter);

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
  console.log(err)
  res.status(err.status || 500);
  res.json({err: 'error'});
});

module.exports = app;
