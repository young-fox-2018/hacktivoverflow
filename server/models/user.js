const mongoose = require('mongoose')
const { hash, compareHash } = require('../helpers')
const { db } = require('../config')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    validate: [{
      validator: email => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
      },
      message: email => `${email.value} is not a valid email!`
    }, {
      isAsync: true,
      validator: (email, cb) => {
        User.findOne({ email }).exec()
          .then(user => cb(!user, `${email} is already used!`))
          .catch(err => {
            console.error(err.message)
            cb(false, "Database error")
          })
      }
    }]
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
})


userSchema.methods.isPasswordMatch = function (userInput, cb) {
  return compareHash(userInput, this.password)
}


userSchema.pre('save', function (next) {
  hash(this.password)
    .then(hash => {
      this.password = hash
      next()
    })
    .catch(err => next(err))
})


const User = db.model('User', userSchema)

module.exports = User
