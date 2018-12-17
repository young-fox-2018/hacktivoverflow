var nodemailer = require('nodemailer');
const User = require('../models/User');
const kue = require('kue'),
            queue = kue.createQueue();
const generateToken = require('../helpers/generateToken');
const bcrypt = require('bcrypt');


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'gamecowo12345@gmail.com',
    pass: 'gamecowo54321'
  }
});

queue.process('register', function({ data }, done) {
  transporter.sendMail({
    from: 'gamecowo12345@gmail.com',
    to: data.email,
    subject: 'Welcome to HacktivOverflow',
    html: 'Thank you for register to HacktivOverflow.<br>You can post question and answered to '
  }, function(error, info){
    if (error) {
      done({
        message: error,
      });
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      done();
    }
  });

});

module.exports = {
  registerUser: function(req, res, next) {
    const {name, email, password} = req.body;

    User.create({name, email, password})
    .then(user => {
      var job = queue.create('register', {
        name: user.name,
        email: user.email
      }).save( function(err){
        if( !err ) console.log( job.id );
      });
      res.status(200).json({
        msg: 'User created',
        user,
      });
    })
    .catch(err => {
      res.status(500).json({
        msg: 'Internal server error',
        error: err.errors,
      });
    });
  },
  loginUser: function(req, res, next) {
    const {email, password} = req.body;
    User.findOne({email})
    .then(user => {
      if(user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          msg: 'User successfully login.',
          token,
          name: user.name,
          email
        });
      } if(user) {
        res.status(400).json({
          msg: 'Wrong password.'
        })
      } else {
        res.status(400).json({
          msg: 'User not found.',
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        msg: 'Internal server error',
        error: err.message,
      });
    });
  },
};