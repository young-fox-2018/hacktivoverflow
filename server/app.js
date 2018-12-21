var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://ribka001:ribka001@ds249123.mlab.com:49123/hacktiv-overflow', { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connect to database")
});

var usersRouter = require('./routes/users');
var questionsRouter = require('./routes/questions');
var answersRouter = require('./routes/answers');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

app.use('/users', usersRouter);
app.use('/questions', questionsRouter);
app.use('/answers', answersRouter);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
})

module.exports = app;