var nodemailer = require('nodemailer');
const User = require('../models/User');
const kue = require('kue'),
            queue = kue.createQueue();
const axios = require('axios');
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
    console.log(req.body, '==============')

    if(name && email && password) {
      User.create({name, email, password})
      .then(user => {
        var job = queue.create('register', {
          name: user.name,
          email: user.email
        }).save( function(err){
          if( !err ) console.log( job.id );
        });
        res.status(200).json({
          msg: 'User registered. Please check your email.',
          user,
        });
      })
      .catch(err => {
        res.status(500).json({
          msg: 'Internal server error',
          error: err.errors,
        });
      });
    } else {
      res.status(400).json({
        msg: 'Invalid user input',
        // errors: errors,
      });
    }
  },
  loginUser: function(req, res, next) {
    const {email, password} = req.body;
    User.findOne({email})
    .then(user => {
      if(user.provider) {
        res.status(400).json({
          msg: 'Please login using your social account',
        });
      } else if(user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          msg: 'User successfully login.',
          token,
          name: user.name,
          userId: user._id,
        });
      } else if(user) {
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
  loginGoogle: function(req, res, next) {
    const {name, email, provider, google_token} = req.body;


    axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${google_token}`)
    .then(({ data }) => {
      if(data.email_verified) {
        User.findOne({email: email})
        .then(user => {
          if(!user) {
            User.create({name, email, provider})
            .then(user => {
              const token = generateToken(user);
              var job = queue.create('register', {
                name: user.name,
                email: user.email
              }).save( function(err){
                if( !err ) console.log( job.id );
              });
              res.status(200).json({
                msg: 'User registered. Please check your email.',
                token,
                name: user.name,
                userId: user._id,
              });
            })
            .catch(err => {
              res.status(500).json({
                msg: 'Internal server error',
                error: err.errors,
              });
            });
          } else {
            const token = generateToken(user);
            res.status(200).json({
              msg: 'User successfully login.',
              token,
              name: user.name,
              userId: user._id,
            });
          }
        })
        .catch(err => {
          res.status(500).json({
            msg: 'Internal server error',
            error: err.message,
          });
        });
      } else {
        res.status(403).json({
          msg: 'Invalid google token',
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        msg: 'Internal server error',
        error: err.message,
      });
    });
  }
};