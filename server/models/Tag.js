const mongoose = require('mongoose')

const tagSchema = mongoose.Schema({
    name: {
        type: String,
        validate: {
            isAsync: true,
            validator: function(v,cb){
                Tag.findOne({
                    name: v
                }, (err, result)=> {
                    if(err) console.log(err)
                    var msg = `${v} is already exists`
                    cb(!result, msg)
                })
            }
        }
    },
    followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
})

tagSchema.statics.findOneOrCreate = function findOneOrCreate(condition){
    const self = this
    return new Promise((resolve, reject)=> {
        self.findOne(condition, (err, result)=> {
            return result ? resolve(result) : self.create(condition, (err, result)=> {return resolve(result)})
        })
    })
}


const Tag = mongoose.model('Tag', tagSchema)

module.exports = Tag