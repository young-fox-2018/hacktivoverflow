const Tag = require('../models/tag')


class TagController {
    static create(req, res) {
        Tag.create({
            name: req.body.name
        })
        .then( tag => {
            res.status(200).json({
                tag: tag
            })
        })
        .catch( err => {
            res.status(500).json({
                err: err.message,
                message: 'error from creating new tag'
            })
        })
    }

    static readAll(req, res) {
        Tag.find({})
        .then( tags => {
            res.status(200).json({
                tags: tags
            })
        })
        .catch( err => {
            res.status(500).json({
                err: err.message,
                message: 'error from readAll Tag'
            })
        })
    }


}

module.exports = TagController