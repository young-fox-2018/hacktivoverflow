
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')
let salt = bcrypt.genSaltSync(10)

let userSchema = new Schema({
    name: String,
    avatar: String,
    email: {
        type: String,
        match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        required: true,
        validate: {
            validator: function (val) {
                return new Promise(function (resolve, reject) {
                    User.findOne({
                        email: val
                    })
                        .then(data => {
                            if (data) {
                                reject(false)
                            } else {
                                resolve(true)
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                })
            }
        }
    },
    password: {
        required: true,
        type: String,
        minlength: 3
    },
    reputation: Number
})

userSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, salt)
    next()
})

let User = mongoose.model('User', userSchema)

module.exports = User