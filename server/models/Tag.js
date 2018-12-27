const mongoose = require('mongoose')

const tagSchema = mongoose.Schema({
    name: {
        type: String,
        validate: {
            isAsync: true,
            validator: function(v,cb){
                Tag.findOne({
                    name: v
                }, (err, projection)=> {
                    
                })
            }
        }
    },
    followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
})

const Tag = mongoose.model('Tag', tagSchema)

module.exports = Tag