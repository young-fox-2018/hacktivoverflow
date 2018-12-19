const   Question = require('../models/question');

class QuestionController {
    static create ( req, res ){
        let question = new Question({
            UserId: req.myId,
            title: req.body.title,
            description: req.body.description,
            slug: req.body.slug,
            dateCreate: new Date()
        })
        question.save( (err, data) => {
            if (err) {
                console.log(err)
                res.status(500).json( err.message )
            } else {
                Question.find({ UserId : req.myId})
                .then( questions => {
                    res.status(200).json( questions )
                })
                .catch( error => {
                    console.log(`error di read all question`)
                    console.log(error)
                    res.status(500).json( error.message )
                })
            }
        })
    }

    static readAll (req, res){
        console.log(`===========read all question`)
        Question.find()
            .populate('UserId', 'name')
            .then( questions => {
                console.log(questions)
                res.status(200).json( questions )
            })
            .catch( error => {
                console.log(`error di read all question`)
                console.log(error)
                res.status(500).json( error.message )
            })
    }

    static readOwnQuestions (req, res){
        Question.find({ UserId : req.myId})
        .populate('UserId')
        .then( questions => {
            res.status(200).json( questions )
        })
        .catch( error => {
            console.log(`error di read all question`)
            console.log(error)
            res.status(500).json( error.message )
        })
    }

    static readDetailQuestions (req, res){
        Question.findOne({ slug : req.params.slug})
        .then( questions => {
            res.status(200).json( questions )
        })
        .catch( error => {
            console.log(`error di read all question`)
            console.log(error)
            res.status(500).json( error.message )
        })
    }

    static update (req, res){
        Question.findByIdAndUpdate({ _id : req.params.id}, {
            title: req.body.title,
            description: req.body.description,
            slug: req.body.slug,         
        },{new: true})
        .then( questions => {
            Question.find({ UserId : req.myId})
            .then( questions => {
                res.status(200).json( questions )
            })
            .catch( error => {
                console.log(`error di read all question`)
                console.log(error)
                res.status(500).json( error.message )
            })
        })
        .catch( error => {
            console.log(`error di read all update`)
            console.log(error)
            res.status(500).json( error.message )
        })
    }

    static delete (req, res){
        Question.findByIdAndDelete(req.params.id)
        .then( questions => {
            Question.find({ UserId : req.myId})
            .then( questions => {
                res.status(200).json( questions )
            })
            .catch( error => {
                console.log(`error di read all question`)
                console.log(error)
                res.status(500).json( error.message )
            })
        })
        .catch( error => {
            console.log(`error delete question`)
            console.log(error)
            res.status(500).json( error.message )
        })
    }

    static upvote (req, res){
        //cari questionnya
        Question.findById(req.body.questionId)
            .then( result => {
                //cek apakah question tesebut dibuat oleh user yang akan vote, jika iya, maka jangan berikan akses
                if (result.UserId == req.myId){
                    res.status(500).json({"error":"can't vote for your own article or comment! "})
                } else {
                    //bila bukan, maka cek apakah sudah ada upvote dari user tersebut, kalo belum ada maka push ke upvote user tersebut
                    let upvoteArr = result.upvote
                    if (upvoteArr.indexOf(req.myId) === -1 ){
                        result.update({$push: {upvote: req.myId}, $pull: {downvote: req.myId}})
                            .then( result => {
                                Question.find()
                                .then( questions => {
                                    console.log(questions)
                                    res.status(200).json( questions )
                                })
                                .catch( error => {
                                    console.log(`error di read all question`)
                                    console.log(error)
                                    res.status(500).json(error.message)
                                })
                            })
                            .catch( error => {
                                res.status(500).json( error.message )
                            })
                    }
                    //kalo sudah ada, maka hilangkan status upvote dari user tersebut
                    else{
                        result.update({$pull: {upvote: req.myId}})
                            .then( result => {
                                Question.find()
                                .then( questions => {
                                    console.log(questions)
                                    res.status(200).json( questions )
                                })
                                .catch( error => {
                                    console.log(`error di read all question`)
                                    console.log(error)
                                    res.status(500).json(error.message)
                                })
                            })
                            .catch( error => {
                                res.status(500).json( error.message )
                            })    
                    }
                }
            })
            .catch( error => {
                console.log(error)
                res.status(500).json( error.message )
            })
    }

    static downvote (req, res){
        //cari questionnya
        Question.findById(req.body.questionId)
            .then( result => {
            console.log(result)
                //cek apakah question tesebut dibuat oleh user yang akan vote, jika iya, maka jangan berikan akses
                if (result.UserId == req.myId){
                    res.status(500).json( error.message )
                } else {
                    //bila bukan, maka cek apakah sudah ada upvote dari user tersebut, kalo belum ada maka push ke upvote user tersebut
                    let downvote = result.downvote
                    if (downvote.indexOf(req.myId) === -1 ){
                        result.update({$push: {downvote: req.myId}, $pull: {upvote: req.myId}})
                            .then( result => {
                                Question.find()
                                .then( questions => {
                                    console.log(questions)
                                    res.status(200).json( questions )
                                })
                                .catch( error => {
                                    console.log(`error di read all question`)
                                    console.log(error)
                                    res.status(500).json(error.message)
                                })
                            })
                            .catch( error => {
                                res.status(500).json( error.message )
                            })
                    }
                    //kalo sudah ada, maka hilangkan status upvote dari user tersebut
                    else{
                        result.update({$pull: {downvote: req.myId}})
                            .then( result => {
                                Question.find()
                                .then( questions => {
                                    console.log(questions)
                                    res.status(200).json( questions )
                                })
                                .catch( error => {
                                    console.log(`error di read all question`)
                                    console.log(error)
                                    res.status(500).json(error.message)
                                })
                            })
                            .catch( error => {
                                res.status(500).json( error.message )
                            })    
                    }
                }
            })
            .catch( error => {
                console.log(error)
                res.status(500).json( error.message )
            })
    }
}

module.exports = QuestionController