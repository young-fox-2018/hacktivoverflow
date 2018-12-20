
const mongoose = require('mongoose')
const objectId = mongoose.Types.ObjectId

const Pertanyaan = require('../models/pertanyaan.js')
const Jawaban = require('../models/jawaban')
const User = require('../models/user')

module.exports = {
    read: function(req, res){
       Pertanyaan
            .find()
            .populate('user')
            .populate({
                path : 'jawaban',
                populate : {
                    path : 'user'
                }
            })
            .then( data => {

                let pertanyaan = data.map(datum => {
                    datum = datum.toJSON()
                    delete datum.user.password

                    let jawaban_updated = datum.jawaban.map(jawaban =>{
                        delete jawaban.user.password
                        return jawaban
                    })
                    datum.jawaban = jawaban_updated

                    return datum
                })
                res.status(200).json( pertanyaan )
            })
            .catch( error => {
                res.status(500).json( { message : error.message})
            })
    },
    findPertanyaan : function( req, res) {
        let pertanyaan_id = req.params.id_pertanyaan

        Pertanyaan
            .findById( pertanyaan_id )
            .populate('user')
            .populate({
                path : 'jawaban',
                populate : {
                    path : 'user'
                }
            })
            .then( pertanyaan =>{
                pertanyaan = pertanyaan.toJSON()
                delete pertanyaan.user.password
                let jawaban_updated = pertanyaan.jawaban.map(jawaban =>{
                    delete jawaban.user.password
                    return jawaban
                })

                pertanyaan.jawaban = jawaban_updated

                res.status(200).json( pertanyaan )
            })
            .catch( error =>{
                res.status(500).json({ message : error.message})
            })
    },
    clearAll : (req, res) => {
        Pertanyaan.deleteMany()
            .then( response => {
                res.status(200).json({ message: 'success'})
            })
            .catch( error => {
                res.status(500).json({ message : error.message})
            })
    },
    create : (req, res) => {
        let title = req.body.title ? req.body.title : false
        let description = req.body.description ?  req.body.description : false
        let tags = req.body.tags
        let user = objectId(req._id)

        if ( !title || !description ){
            res.status(400).json({ message : 'Harap isikan data pertanyaan secara lengkap!'})
        }else{
            let pertanyaan = new Pertanyaan({ title, description, user, tags })

            pertanyaan
                .save()
                .then( response => {
                    res.status(200).json({ message : 'success'})
                })
                .catch(error => {
                    res.status(500).json({ message : error.message})
                })
        }
    },
    updatePertanyaan : (req, res) => {
        let pertanyaan_id = req.params.id_pertanyaan

        let data = {
            title : req.body.title,
            description : req.body.description
        }

        Pertanyaan
            .findByIdAndUpdate(pertanyaan_id, {$set :data},{ new : true, runValidators:true})
            .then( updated => {
                res.status(201).json( updated )
            })
            .catch( error => {
                let path = Object.keys( error.errors)
                let message = []
                path.forEach(p => {
                    message.push( error.errors[p].message)
                })
                res.status(400).json( {
                    path, message
                })
            })
    },
    remove : (req, res) => {
        let id_pertanyaan = req.params.id_pertanyaan

        Pertanyaan
            .findById( id_pertanyaan)
            .then( pertanyaan => {
                return pertanyaan.remove()
            })
            .then( response => {
                res.status(200).json( { message : 'success'} )
            })
            .catch(error => {
                res.status(500).json({ message : error.message})
            })
    },
    upvote : (req, res) => {
        let id = req.params.id_pertanyaan
        let userUpvote = req._id
        let instancePertanyaan = {}
        Pertanyaan
            .findById(id)
            .then(pertanyaan => {
                instancePertanyaan = pertanyaan
                let found = pertanyaan.upvote.indexOf(userUpvote)
                if( found !== -1 ){
                    Pertanyaan
                        .findByIdAndUpdate(id, {
                            $pull : {
                                upvote : userUpvote
                            }
                        })
                        .then( response => {
                            User
                                .findByIdAndUpdate(instancePertanyaan.user, {
                                    $inc : {
                                        popularity : -1
                                    }
                                })
                                .then( response => {
                                    res.status(201).json( response)
                                })
                                .catch( error => {
                                    res.status(500).json({
                                        message : error.message
                                    })
                                })
                        })
                        .catch( error => {
                            res.status(500).json({
                                message : error.message
                            })
                        })
                        
                }else{
                    Pertanyaan
                        .findByIdAndUpdate(id, {
                            $push : {
                                upvote : userUpvote
                            },
                            $pull : {
                                downvote  : userUpvote
                            }
                        })
                        .then( response => {
                            User
                                .findByIdAndUpdate(instancePertanyaan.user, {
                                    $inc : {
                                        popularity : 1
                                    }
                                })
                                .then( response => {
                                    res.status(201).json( response)
                                })
                                .catch( error => {
                                    res.status(500).json({
                                        message : error.message
                                    })
                                })
                        })
                        .catch( error => {
                            res.status(500).json({
                                message : error.message
                            })
                        })
                }
            })
            .catch( error => {
                res.status(500).json({
                    message : error.message
                })
            })
    },
    downvote : (req, res) => {
        let id = req.params.id_pertanyaan
        let userUpvote = req._id
        let instancePertanyaan = {}
        Pertanyaan
            .findById(id)
            .then( jawaban => {
                let found = jawaban.downvote.indexOf(userUpvote)
                if ( found !== -1){
                    Pertanyaan
                        .findByIdAndUpdate(id, {
                            $pull : {
                                downvote  : userUpvote
                            }
                        })
                        .then( response => {
                            User
                                .findByIdAndUpdate(instancePertanyaan.user, {
                                    $inc : {
                                        popularity : 1
                                    }
                                })
                                .then( response => {
                                    res.status(201).json( response)
                                })
                                .catch( error => {
                                    res.status(500).json({
                                        message : error.message
                                    })
                                })
                        })
                        .catch( error => {
                            res.status(500).json({
                                message : error.message
                            })
                        })
                }else{
                    Pertanyaan
                        .findByIdAndUpdate(id, {
                            $pull : {
                                upvote : userUpvote
                            },
                            $push : {
                                downvote  : userUpvote
                            }
                        })
                        .then( response => {
                            User
                                .findByIdAndUpdate(instancePertanyaan.user, {
                                    $inc : {
                                        popularity : -1
                                    }
                                })
                                .then( response => {
                                    res.status(201).json( response)
                                })
                                .catch( error => {
                                    res.status(500).json({
                                        message : error.message
                                    })
                                })
                        })
                        .catch( error => {
                            res.status(500).json({
                                message : error.message
                            })
                        })
                }
            })
            .catch( error => {
                res.status(500).json({
                    message : error.message
                })
            })
    },
    readTag : (req, res) => {        
        Pertanyaan
            .find({}).distinct('tags.text')
            .then( tags => {
                res.status(200).json( tags)
            })
            .catch( error => {
                res.status(500).json({
                    message : error.message
                })
            })
    },
    searchTag : (req, res) => {
        let tagTarget = req.query.tag
        Pertanyaan
            .find({'tags.text' : tagTarget})
            .populate({
                path : 'user',
                select :['name', 'username','avatar']
            })
            .then( pertanyaans => {
                res.status(200).json(pertanyaans)
            })
            .catch( error => {
                res.status(500).json({
                    message : error.message
                })
            })
    },
    popular : (req, res) => {
        Pertanyaan.aggregate([
            {
                $unwind : '$upvote'
            },
            {
                $group : {
                    _id : '$user',
                    upvote : { $push : '$$ROOT.upvote'},
                    count : { $sum : 1}
                }
            },
        ])
        .then( group => {
            res.status(200).json( group )
        })
        .catch( error => {
            res.status(500).json({
                message : error.message
            })
        })
    }
}