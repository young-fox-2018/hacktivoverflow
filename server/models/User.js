const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  firstName:  {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  status: {
    type: String
  },
  password: {
    type: String
  }
})

const User = mongoose.model('User', userSchema)

userSchema.path('email').validate(function(value) {
  return new Promise(function(resolve, reject) {  
    User.findOne({
      email: value
    })
    .then((user) => {
      if (!user) {
        resolve(true)
      } else {
        reject(false)
      }
    })
    .catch((err) => {
      reject(false)
    })
  })
},'Email is not unique')


module.exports = User