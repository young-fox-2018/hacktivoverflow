var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcryptjs = require('bcryptjs');
const validator = require('validator');

var userSchema = new Schema({
  name:  { 
    type : String,
    minlength : 6,
    maxlength : 25,
    required : [true, 'name cannot be empty']
  },
  email: { 
    type : String,
    required : [true, 'email cannot be empty'],
    minlength : 8,
    validate: [{
      validator: validator.isEmail,
      message: 'Invalid email format'
    },{
      isAsync: true,
      validator: function(value, cb){
        User.findOne({email: value}, function(err, doc){
          cb(!doc)
        })
      },
      message: 'Email already exists'
    }]
  },
  password: { 
    type : String
  },
  popularity: Number,
  isGoogle: Boolean
});
userSchema.pre('save', function(next) {
  this.password = bcryptjs.hashSync(this.password, 10)
  next();
});
const User = mongoose.model("User", userSchema);

module.exports = User