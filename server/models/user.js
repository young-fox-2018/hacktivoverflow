const   mongoose = require('mongoose'),
        crypto = require('crypto'),
        Helper = require('../helper/index'),
        Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, required: true},
    salt: {type: String}
})

userSchema.pre('save', function(next) {
    let salt = crypto.randomBytes(10).toString()
    let hash = Helper.encryp( this.password, salt)
    this.password = hash
    this.salt = salt
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User