const mongoose = require('mongoose')
const ObjectId = require('mongoose').Types.ObjectId

const Pertanyaan = require('../models/pertanyaan')
const Jawaban = require('../models/jawaban')
const User = require('../models/user')
module.exports = {
    create : (req, res) => {
        Jawaban.create({
            isi : req.body.isi,
            user : req._id,
            pertanyaan : ObjectId(req.body.pertanyaan)
        })
        .then( response => {
            res.status(201).json( response)
        })
        .catch( error => {
            res.status(500).json({
                message : error.message
            })
        })
    },
    updateJawaban : (req, res) => {
       let id = req.params.id
       let data = {
           isi : req.body.isi
       }
       Jawaban
        .findByIdAndUpdate(id, {
            $set : data
        })
        .then( response => {
            res.status(201).json( response )
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
    findJawaban : function( req, res) {
        let jawaban_id = req.params.id_jawaban

        Jawaban
            .findById( jawaban_id )
            .populate('user')
            .then( jawaban => {
                jawaban = jawaban.toJSON()
                delete jawaban.user.password
                res.status(200).json( jawaban )
            })
            .catch( error => {
                res.status(500).json({ message : error.message })
            })
    },
    deleteJawaban : (req, res) => {
       let id = req.params.id
        Jawaban
        .findById(id)
        .then( jawaban => {
            if( jawaban ){
                return jawaban.remove()
            }else{
                return new Error({
                    message : 'Jawaban tidak ada'
                })
            }
        })
        .then( response => {
            res.status(202).json( response )
        })
        .catch( error => {
            res.status(500).json( {
                message : error.message
            })
        })
    },
    downvote : (req, res) => {
        let id = req.params.id
        let userUpvote = req._id
        let instanceJawaban = {}
        Jawaban
            .findById(id)
            .then( jawaban=> {
                instanceJawaban = jawaban
                let found = jawaban.downvote.indexOf(userUpvote)
                if ( found !== -1){
                    Jawaban
                        .findByIdAndUpdate(id, {
                            $pull : {
                                downvote : userUpvote
                            }
                        })
                        .then( response => {
                            User
                                .findByIdAndUpdate(instanceJawaban.user, {
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
                    Jawaban
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
                                .findByIdAndUpdate(instanceJawaban.user, {
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
    upvote : (req, res) => {
        let id = req.params.id
        let userUpvote = req._id
        Jawaban
            .findById(id)
            .then( jawaban => {
                let found = jawaban.upvote.indexOf(userUpvote)
                if ( found !== -1){
                    Jawaban
                    .findByIdAndUpdate(id, {
                        $pull : {
                            upvote : userUpvote
                        }
                    })
                    .then( response => {
                        User
                            .findByIdAndUpdate(instanceJawaban.user, {
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
                    Jawaban
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
                                .findByIdAndUpdate(instanceJawaban.user, {
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
    }
}