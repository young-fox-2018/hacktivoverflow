const Tag = require("../models/Tag")
const bcrypt = require("../helpers/bcrypt")
const jwt = require("jsonwebtoken")

module.exports = {
    create: function(req,res,next){
        Tag.create({
            name: req.body.name,
        }, function(err, response){
            if(err) {res.status(400).json({message: err.message})} 
            else {
                res.status(200).json({tag: response, message: 'You successfully added tag'})
            }
        })
    }
}