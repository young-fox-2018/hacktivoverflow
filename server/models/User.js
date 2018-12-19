var mongoose = require('mongoose')
var Schema = mongoose.Schema
const bcrypt = require('bcryptjs')
const validateEmail = require('../helpers/validateEmail')

var userSchema = new Schema({
    name: {
        type: String,
        required: [true, `Name must be filled!`]
    },
    email: {
        type: String,
        required: [true, 'Email must be filled!'],
        validate: [
            { validator: validateEmail, msg: `Please input a valid email format!` },
            {
                validator: function (email) {
                    return new Promise(function (resolve, reject) {
                        User.findOne({ email: email })
                            .then(function (found) {
                                if (found) {
                                    reject(false)
                                } else {
                                    resolve(true)
                                }
                            })
                    })
                }, msg: `Email already exists!`
            }
        ]
    },
    password: {
        type: String,
        required: [true, `Password must be filled!`]
    },
    birthday : {
        type: String
    },
    reputation: {
        type: Number,
        default: 0
    },
    avatar: {
        type: String
    }
})

userSchema.pre('save', function (next) {
    const salt = bcrypt.genSaltSync(10)
    this.password = bcrypt.hashSync(this.password, salt)
    next()
})

var User = mongoose.model('User', userSchema)

module.exports = User