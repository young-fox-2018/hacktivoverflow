require('dotenv').config()
const cors = require('cors')
const express  = require('express');
const app      = express();
const CronJob = require('cron').CronJob
const NODE_ENV = process.env.NODE_ENV || 'development';
const {sendCron} = require('./controllers/usersController')
console.log(process.env.NODE_ENV,"ini node env-nya")

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL);

var indexRouter = require('./routes/index');
var questionRouter = require('./routes/questions');

app.use(cors())
app.use(express.json({limit: '3MB'}));
app.use(express.urlencoded({ limit: '3MB', extended: false }));

app.use('/', indexRouter);
app.use('/questions', questionRouter);

new CronJob('0 8 19 12 *', function(){
    console.log("cronnya jalan")
    sendCron()
})

app.listen(3000, function(){
  console.log("You're in port 3000")
})

module.exports = app;