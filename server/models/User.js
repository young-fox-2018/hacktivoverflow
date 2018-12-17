const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please tell us what\'s your name so we can know what to call you.']
  },
  email: {
    type: String,
    validate: {
      validator: function(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      },
      message: props => `${props.value} is not a valid email format!`
    },
    required: [true, 'Fill the email, we have something to send to you.']
  },
  password: String,
});

userSchema.pre('save', function(){
  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;