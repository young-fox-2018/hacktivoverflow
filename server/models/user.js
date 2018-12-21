const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: [true, `email is already exists`],
        match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'email is invalid']
    },
    password: {
        type: String,
        required: true,
        minlength: [5, 'minimum password characters is 5'],
        maxlength: [16, 'maximum password characters is 12'],
        required: [true, 'password is required']
    },
    birthDate: {
        type: String,
        required: true
    }
},
{
    timestamps: true
})

userSchema.pre('save',function (next) {
    const salt = bcrypt.genSaltSync(10)
    this.password = bcrypt.hashSync(this.password, salt)
    next()
})
const User = mongoose.model('User', userSchema)

module.exports = User