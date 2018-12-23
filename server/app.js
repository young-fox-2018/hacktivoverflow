const express = require('express');
const app = express();
require('dotenv').config();
const port     = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'dev';
const cors = require('cors');
const kue = require('kue');

const mongoose = require('mongoose');
mongoose.connect('mongodb://admin:admin1@ds139534.mlab.com:39534/hacktivoverflowing');
// mongoose.connect('mongodb://localhost/hacktivOverflor' + process.env.NODE_ENV);

const indexRouter = require('./routes/user');
const questionRouter = require('./routes/question');

app.use(cors());
app.use(express.json({limit: '3MB'}));
app.use(express.urlencoded({ limit: '3MB', extended: false}));

app.use('/', indexRouter);
app.use('/questions', questionRouter);

app.listen(port, () => {
  console.log('Server running on port ' + port);
});

kue.app.listen(4000);

module.exports = app;