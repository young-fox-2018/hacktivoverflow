var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require('mongoose');
const cors = require("cors")
require("dotenv").config()

mongoose.connect('mongodb://localhost/db_hacktiv');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/users');
var questionRouter = require('./routes/question')
var answerRouter = require('./routes/answer')



var app = express();
app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/', indexRouter);
app.use('/users', userRouter)
app.use('/questions', questionRouter)
app.use('/answers', answerRouter)




app.use(function (req, res, next) {
  next(createError(404));
});


app.use(function (err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log(err);

  res.status(err.status || 500);
  res.status(500).json({
    message: "status error server"
  })
});

module.exports = app;
