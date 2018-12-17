const express = require('express');
const app = express();
require('dotenv').config();
const port     = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'dev';
const cors = require('cors');
const kue = require('kue');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hacktivOverflow' + NODE_ENV);

const indexRouter = require('./routes/user');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use('/', indexRouter);

app.listen(port, () => {
  console.log('Server running on port ' + port);
});

kue.app.listen(4000);

module.exports = app;