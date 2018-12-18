var mongoose = require('mongoose')

var Schema = mongoose.Schema

var userSchema = new Schema({
    email : {
        type : String,
        required : true
    },
    password: {
        type : String,
        required : true
    },
    name : String,
    popularity : {
        type: Number,
        default: 0
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User