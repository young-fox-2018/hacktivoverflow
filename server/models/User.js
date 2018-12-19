const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("../helpers/bcrypt")

const userSchema = new Schema({
    name: String,
    email: String,
    password: String
})

userSchema.pre("save", function(next){
    if(this.provider !== "google"){
        this.password = bcrypt.hashPassword(this.password)
    }

    next()
})

userSchema.path('email').validate(function (email) {
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(email); // Assuming email has a text attribute
}, 'Email is not on the right format.')

userSchema.path('email').validate(function (email) {

    return new Promise(function(resolve, reject) {
        User.find({
            email: email
        }, function(err, User){
            if(err){
                console.log('a')
                throw (err);
                
            }
            else if(User.length > 0){
                console.log('b')
                // throw new Error('Need to get a Turbo Man for Christmas');
                // return false
                resolve(false)
            }else{
                resolve(true)
                // return true
            }
        })
    })

    
}, 'The e-mail is already registered')

let User = mongoose.model("User", userSchema)

module.exports = User