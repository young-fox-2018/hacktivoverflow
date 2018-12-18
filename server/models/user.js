const mongoose = require('mongoose')

const Schema = mongoose.Schema
const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        validate: {
            validator: function(value) {
                return /\w+@+\w+\.\w/.test(value)
            },
            message: "Please insert a valid mail"
        },
        required: true
    },
    password: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    questions: [{
        type: Schema.Types.ObjectId,
        ref: 'Question'
    }],
    answers: [{
        type: Schema.Types.ObjectId,
        ref: 'Answer'
    }],
    popularity: {
        type: Number,
        default: 0
    },
    popularity_mark: {
        type: Number
    }
})

const User = mongoose.model('User', userSchema, 'Users')

module.exports = User