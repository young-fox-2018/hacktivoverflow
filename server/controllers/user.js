const { OAuth2Client } = require('google-auth-library');
const User = require('../models/user')
const { apiError, getToken } = require('../helpers')
const { createEmailQueue } = require('../helpers/background')


module.exports = {
  register(req, res) {
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
      .then(user => {
        let { id, name, email } = user
        createEmailQueue({ name, email })
        res.status(201).json({ id, name, email })
      })
      .catch(err => {
        res.status(400).json({ error: err.message })
      })
  },

  login(req, res) {
    User.findOne({ email: req.body.email }).exec()
      .then(user => {
        if (user) {
          return user.isPasswordMatch(req.body.password)
            .then(isMatch => {
              if (!isMatch) throw new apiError(401, "Password doesn't match")
              return getToken({ id: user.id })
            })
        } else {
          throw new apiError(401, "User doesn't exist")
        }
      })
      .then(token => {
        res.status(200).json({ 'access-token': token })
      })
      .catch(err => {
        res.status(err.httpCode || 500).json({ error: err.message })
      })
  },

  info(req, res) {
    res.status(200).json(req.currentUser)
  },

  gSignIn(req, res) {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    let verification = client.verifyIdToken({ idToken: req.body.id_token })
    let checkUser = verification.then(ticket => {
      return User
        .findOne({
          email: ticket.payload.email
        }).exec()
    })

    Promise.all([verification, checkUser])
      .then(([ticket, user]) => {
        if (user) {
          return getToken({ id: user.id })
        } else {
          return User.create({
            name: ticket.payload.given_name + ticket.payload.family_name,
            email: ticket.payload.email,
            password: '123456'
          })
            .then(user => {
              return getToken({ id: user.id })
            })
        }
      })
      .then(token => {
        res.status(200).json({ 'access-token': token })
      })
      .catch(err => {
        res.status(err.httpCode || 500).json({ error: err.message })
      })
  },

}