const mongoose = require('mongoose');
const Schema = mongoose.Schema
const bcryptjs = require('bcryptjs')

const userSchema = new mongoose.Schema({ 
    name: {
        type: String,
        required: [true, 'name must be filled']
    },
    email: {
        type: String,
        required: [true, 'email must be filled'],
        validate: [{
            validator: function(value) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value)
            }, 
            message: `Please enter a valid email`
        }, { 
            isAsync: true,
            validator: function(value, cb) {
                User.findOne({ email: value}, function (err, res) {
                    cb(!res) 
                })
            },
            message: `email is already registered`
        }] 
    },
    password: {
        type: String,
        required: [true, 'password must be filled'],
        minlength: [6, 'password length must be at least 6 characters'],
        maxlength: [15, 'password length must be less or equal 15 characters']
    },
    googleLogin: { 
        type: Boolean, 
        default: false 
    },
    birthday: {
        type: String
    },
    point: {
        type: Number,
        default: 0
    }
});

userSchema.pre('save',function(next){
    this.password = bcryptjs.hashSync(this.password, 10)
    next()
})



const User = mongoose.model('User', userSchema);
module.exports = User;