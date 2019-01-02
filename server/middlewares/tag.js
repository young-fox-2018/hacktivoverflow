const Tag = require('../models/Tag')

class Middleware {
    static save(req,res,next){
        let bulkOps = []
        for(let i = 0; i < req.body.tags.length; i++){
            let tag = {
                name: req.body.tags[i].text.toLowerCase()
            }
            let promiseTag = Tag.findOneOrCreate(tag)
            bulkOps.push(promiseTag)
        }
        // console.log(bulkOps)
        Promise.all(bulkOps)
            .then(result=> {
                // console.log(result, 'result')
                req.body.tags = result.map(tag=> tag._id)
                next()
            })
            .catch(err=> {
                console.log(err, 'error in save tags')
            })
    }

    static findAll(req,res, next){
        Tag.find({})
            .then(tags=> {
                res.status(200).json(tags)
            })
            .catch(err=> {
                res.status(400).json(err)
            })
    }
}

module.exports = Middleware