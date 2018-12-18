const User = require('../models/User')
const password = require('../helpers/password')
const jwt = require('../helpers/jwt')

module.exports = {
  register (req, res) {
    let userInfo = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: password.hashPassword(req.body.password)
    }

    User.create(userInfo)
    .then((user) => {
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
    })
    .catch((err) => {
        res.status(500).json({
          err: 'Please try again later'
        })
    })
  }
}