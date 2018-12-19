const mongoose = require('mongoose')
const bcryptHelper = require('../helpers/bcryptHelper')

const userSchema = mongoose.Schema({
    name: String,
    reputation: {
        type: Number,
        default: 0
    },
    email: {
        type: String,
        validate: [{
            isAsync: true,
            validator: function(v, cb){
                setTimeout(function(){
                    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    var msg = v + ' is not a valid email'
                    cb(re.test(v), msg)
                }, 5)
            },
            message: 'Error input email'
        }, {
            isAsync: true,
            validator: function(v,cb){
                User.findOne({
                    email: v
                }, (err, result)=> {
                    if(err) console.log(err)
                    var msg = `${v} is already taken, please pick another or login`
                    cb(!result, msg)
                })
            },
            message: 'message is already taken'
        }],
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        minlength: 8,
        required: [true, 'Password is required']
        
    },
    questions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Question'}],
    answers : [{type: mongoose.Schema.Types.ObjectId, ref: 'Answer'}],
    verified: {
        type: Boolean,
        default: false
    },
    interests: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}]
})

userSchema.pre('save', function(next){
    let hash = bcryptHelper.encode(this.password)
    this.password = hash
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User