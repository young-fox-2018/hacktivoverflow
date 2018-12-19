const createError = require('http-errors');
const express = require('express');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const questionsRouter = require('./routes/questions');
const answersRouter = require('./routes/answers');
const tagsRouter = require('./routes/tags');
const cron = require('node-cron');
const birthdayMail = require('./helpers/birthdayMail')
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');
require('dotenv').config()


// mongoose.connect('mongodb://localhost/hacktivOverflow', { useNewUrlParser: true });
mongoose.connect(`mongodb://${process.env.MLAB_USER}:${process.env.MLAB_PASSWORD}@ds111244.mlab.com:11244/hacktiv8-hacktivoverflow`, { useNewUrlParser: true });


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
console.log(`mongoose connected!`)
});

// cron.schedule('0 9 * * *', () => { ganti ini klo udh fix -> jadi tiap hari setiap jam 9 pagi
cron.schedule('39 14 * * *', () => { 
  birthdayMail()
});


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/questions', questionsRouter);
app.use('/answers', answersRouter);
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
  console.log(err);
  res.status(err.status || 500).json({err});
});

module.exports = app;