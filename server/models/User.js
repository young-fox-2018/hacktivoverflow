const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')

const userSchema = Schema({
    username: String,
    email: String,
    password: String,
    gSignIn: Boolean
})

userSchema.pre('save', function(next) {
    if(this.gSignIn == true){
        next()
    }
    else{
        const salt = bcrypt.genSaltSync(7)
        this.password = bcrypt.hashSync(this.password, salt)
        next()
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User;