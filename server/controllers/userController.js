const User = require('../models/User');
const nodemailer = require('nodemailer');
const axios = require('axios')
const {checkPassword, generateToken, verifyToken} = require('../helpers/helper')
const kue = require('kue')
  , queue = kue.createQueue();

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'gamecowo12345@gmail.com',
    pass: 'gamecowo54321'
  }
});


queue.process('email', function({ data }, done){
  console.log(data.to)
  transporter.sendMail({
    from: 'gamecowok12345@gmail.com',
    to: data.to,
    subject: data.title,
    html: '<b>Congratulation! you have been registered to Hacktiv Overflow</b>'
  }, function(error, info){
    if (error) {
      console.log(error);
      done({
        message: error
      });
    } else {
      console.log('Email sent: ' + info.response);
      done();
    }
  });
  // console.log(data)
});

class userController {
  static register(req, res) {
    // res.json('test register');
    let {name, email, password, phone} = req.body;

    User.create({
      name,
      email,
      password,
      phone
    })
    .then((result_user) => {

      var job = queue.create('email', {
          title: 'Welcome to Hacktiv Overflow',
          to: result_user.email,
      }).save( function(err){
        if( !err ) console.log( job.id );
      });

      res.status(200).json(result_user)
    }).catch((err) => {
      res.status(400).json({
        message: err.message
      })
    });
  }

  static login(req, res) {
    // res.json('test login')
    let {email, password} = req.body
    User.findOne({
      email: email
    })
    .then((result_user) => {
      if (!result_user) {
        res.status(400).json({
          message: 'This email is not registered yet!',
        })
      } else {
        if (result_user.registedMethod == 'Google') {
          res.status(400).json({message: 'This email is created by Google Login'})
        } else {
          if (!checkPassword(password, result_user.password)) {
            res.status(400).json({
              message: 'Wrong password input!',
            })
          } else {
            let input = {
              _id: result_user._id,
              name: result_user.name,
              email: result_user.email,
              phone: result_user.phone,
            }
            res.status(200).json({
              token: generateToken(input)
            })
          }
        } 
      }
    }).catch((err) => {
      res.status(400).json({
        message: err.message
      })
    });
  }

  static verify(req, res) {
    let token = req.headers.auth
    verifyToken(token, function(err, result){
      if (err) {
        res.status(400).json({
          message: err.message
        })
      } else {
        res.status(200).json(result)
      }
    })
  }

  static gLogin (req, res) {
    // res.json(req.query.token)
    let token = req.query.token
    let url = 'https://www.googleapis.com/oauth2/v3/tokeninfo'
    let dataGoogle = {}
    axios({
        method:'get',
        url:url,
        responseType:'json',
        params: {
            id_token: token
        }
    })
      .then((response) => {
          // console.log(response.data)
          dataGoogle = {
              name: response.data.name,
              email: response.data.email
          }
          return User.findOne({
              email: dataGoogle.email
          })
      })
      .then((result_user) => {
          if(!result_user) {
              User.create({
                  name: dataGoogle.name,
                  email: dataGoogle.email,
                  
                  registedMethod: 'Google'
              }, function(err, user){
                  if (err) {
                      res.status(400).json({message: err.message})
                  } else {
                      res.status(200).json({
                          token: generateToken({
                              _id: user._id,
                              name: user.name,
                              email: user.email
                          })
                      })
                  }
              })
              // res.json('bisa')
          } else {
              if (result_user.registedMethod !== 'Google') {
                  res.status(400).json({message: 'This email is created by register'})
              } else {
                  // console.log(dataGoogle)
                  res.status(200).json({
                      token: generateToken({
                          _id: result_user._id,
                          name: result_user.name,
                          email: result_user.email
                      })
                  })
              }
          }
      })
      .catch((err) => {
          // console.log(err)
          res.status(400).json({message: err.response.data.message})
      });
      
  }
};

module.exports = userController