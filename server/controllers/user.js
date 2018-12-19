const User = require('../models/user');
const helper = require('../helper/helper');

module.exports = {
  register(req, res) {
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
      .then(user => {
          res.status(201).json(user)
      })
      .catch(err => {
          res.status(400).json({err: err.message})
      });
  },
  login(req, res) {
    User.findOne({
        email: req.body.email
    })
      .then(user => {
          console.log(user)
          if(helper.comparePassword(req.body.password, user.password)) {
              let token = helper.generateToken(user._id, user.email)
              res.status(200).json({token, user})
          } else {
              res.status(400).json({err: 'invalid password'})
          }
      })
      .catch(err => {
          res.status(400).json({err: 'User not found!'})
      })
  },
  findOne(req, res) {
    helper.decodeToken(req.headers.token, function(err, data) {
      if (err) res.status(400).json({err: 'Token invalid'})
      else {
        User.findById(data.id)
          .then(user => {
              res.status(200).json(user)
          })
          .catch(err => {
              res.status(400).json({err: 'User not found'})
          })
      }
    })
  }
};