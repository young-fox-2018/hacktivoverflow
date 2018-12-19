const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose')
const cors = require('cors')

mongoose.connect('mongodb://localhost:27017/pollGSPoint', { useNewUrlParser: true })
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(`database connected!`)
});

const usersRouter = require('./routes/usersRoute');
const questionsRouter = require('./routes/questionsRoute');
const answersRouter = require('./routes/answersRoute');
const tagsRouter = require('./routes/tagsRoute');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/questions', questionsRouter);
app.use('/answers', answersRouter);
app.use('/tags', tagsRouter);
module.exports = app;
