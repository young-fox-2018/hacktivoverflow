var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
var cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var questionsRouter = require('./routes/question')
var app = express();
var mongoose = require('mongoose');
const CronJob = require('cron').CronJob
const User = require('./models/User')
const nodemailer = require('nodemailer')
mongoose.connect(`mongodb://localhost/${process.env.DB}`);

require('dotenv').config()

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/questions', questionsRouter)

console.log('Before job instantiation')
const job = new CronJob('* 0 12 25 12 *', function() {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    user: 'gamecowo12345@gmail.com',
    pass: 'gamecowo54321'
    }
  })

  User.find({})
  .then((users)=> {
    users.forEach((user) => {
      let mailOptions = {
        from: 'gamecowo12345@gmail.com',
        to: user.email,
        subject: `Merry Christmas ${user.firstMame} ${user.lastName}`,
        text: 'Merry christmas and happy new year!'
      }

      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log('Error sending email')
        } else {
          console.log('Success  send email')
        }
      })
    })
  })
  .catch((users) => {
    console.log('Failed to send email')
  })
})

console.log('After job instantiation')
job.start()

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
  res.status(500).json(err.errors.message)
});

module.exports = app;
