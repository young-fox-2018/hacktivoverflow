const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const { hashPassword } = require('../helpers/helper');

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [6, 'Minimum length of name is 6 chars']
  },
  phone: {
    type: String,
    // required: [true, 'Phone number is required'],
    // minlength: [11, 'Minimum length of phone number is 11'],
    // maxlength: [13, 'Maximum length of phone number is 13']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    validate: [{
      validator(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      },
      message: props => `${props.value} is not a valid email!`
    },{
      validator(email) {
        return User.findOne({
          email: email
        })
        .then((result) => {
          if (result) {
            console.log('kesini kesini')
            throw new Error('Email is used')
          }
        }).catch((err) => {
          throw new Error(err)
        });
      },
      message: props => `${props.value} has been registered!`
    }]
  },
  password: {
    type: String,
    // required: [true, 'Password is required']
    minlength: [6, 'Minimum password is 6 char']
  },
  popularity: {
    type: Number,
    default: 0,
  },
  registedMethod: {
    type: String,
    default: 'manually',
  },
})

userSchema.pre('save', function(next) {
  console.log('kesini')
  if (this.registedMethod == 'Google') {
    this.password = null
    next()
  } else {
    this.password = hashPassword(this.password);
    next();
  }
})

const User = mongoose.model('User', userSchema);

module.exports = User