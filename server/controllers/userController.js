const User = require('../models/User')
const password = require('../helpers/password')
const jwt = require('../helpers/jwt')
var kue = require('kue') , queue = kue.createQueue()
const nodemailer = require('nodemailer')
const axios = require('axios')
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
  user: 'gamecowo12345@gmail.com',
  pass: 'gamecowo54321'
  }
})

queue.process('email', function(job, done) {
  let mailOptions = {
    from: 'gamecowo12345@gmail.com',
    to: job.data.email,
    subject: `Welcome  ${job.data.name}`,
    text: 'Thx for joining us !'
  }
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      done(new Error('Error sending email'))
    } else {
      done()
    }
  })
})

module.exports = {
  gLogin (req, res) {
    axios({
      method: 'get',
      url: `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${req.body.idToken}`
    })
    .then(({ data }) => {
      if (data.email_verified) {
        User.findOne({
          email: data.email
        })
        .then((user) => {
          if (user) {
            let token = jwt.generateToken(user)
            res.status(200).json({ token })
          } else {
            User.create({
              firstName: data.name.substr(0, data.name.indexOf(' ')),
              lastName: data.name.substr(data.name.indexOf(' ')),
              email: data.email,
              status: 'google'
            })
            .then((user) => {
              let token = jwt.generateToken(user)
              res.status(200).json({ token })
            })
          }
        })
      } else {
        res.status(404).json({
          err: 'Please check your email'
        })
      }
    })
    .catch(({response: { data: { err } } }) => {
      console.log(err)
    })
  },

  register (req, res) {
    let userInfo = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: password.hashPassword(req.body.password)
    }

    User.create(userInfo)
    .then((user) => {
      let job = queue.create('email', {
        email: user.email,
        name: `${user.firstName} ${user.lastName}`
    }).save( function(err) {
       if( !err ) console.log( job.id );
    });
      res.status(201).json({ user })
    })
    .catch((err) => {
      if (err.errors) {
        res.status(500).json({ 
          err: err.errors.email.message
        })
      } else {
        res.status(500).json({
          err: 'Please try again later'
        })
      }
    })
  },

  check(req, res) {
    jwt.validateToken(req.headers.token, (err, decoded) => {
      if (err) {
        res.status(500).json( {
          err: 'Please try again'
        })
      } else {
        User.findById(decoded._id, (err, user) => {
          if (err) {
            res.status(500).json( {
              err: 'Please try again'
            })
          } else {
            if (user) {
              res.status(200).json({ user })
            } else {
              res.status(404).json( {
                err:'User not found'
              })
            }
          }
        })
      }
    })
  },

  login (req, res) {
    User.findOne({
      email: req.body.email
    })
    .then((user) => {
      if (user.status != 'google') {
        if (user) {
          let matched = password.checkPassword(req.body.password, user.password)

          if (matched) {
            delete user.password
            let token = jwt.generateToken(user)
            res.status(200).json({ token })
          } else {
            res.status(404).json({
              err: 'Password wrong'
            })
          }
        } else {
          res.status(404).json({
            err: 'User not found'
          })
        }
      } else {
        res.status(404).json({
          err: 'You are registered with google account'
        })
      }
    })
    .catch((err) => {
        res.status(500).json({
          err: 'Please try again later'
        })
    })
  }
}