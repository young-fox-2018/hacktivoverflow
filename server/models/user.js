const mongoose = require("mongoose")
const Schema = mongoose.Schema
const hash = require("../helpers/hash")

const userSchema = new Schema({
    first_name: {
        type: String,
        required: [true, "First name can't be blank"]
    },
    last_name: {
        type: String,
        required: [true, "last name can't be blank"]
    },
    email: {
        type: String,
        required: [true, "email cant be null"],
        validate: [{
            isAsync: true,
            validator: function (value, cb) {
                User.findOne({
                    email: value
                }, function (err, res) {
                    cb(!res)
                })
            },
            message: 'User already exist'
        }]
    },
    password: {
        type: String,
        require: [true, "not null"],
        minlength: [5, "minimum length 5"]
    }
})

userSchema.pre("save", function () {
    this.password = hash(this.password)
    next()
})

const User = mongoose.model("User", userSchema);
module.exports = User