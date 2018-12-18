//Model
const User = require('../models/user.js')
//Bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;
//Helpers
const createJWTToken = require('../helpers/createJWT_Token.js')
require('dotenv').config()
//Goggle sign in
const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = process.env.googleClientId

class Controller {
    static Gsignin(req, res) {
        const client = new OAuth2Client(CLIENT_ID);
        client.verifyIdToken({
            idToken: req.body.google_token,
            audience: CLIENT_ID
        }, function (err, result) {
            if (err) {
                console.log(err)
                res.status(500).json(
                    {
                        message: err.message,
                        note: 'Please see console log for further details'
                    })
            } else {
                const payload = result.getPayload()
                //check if the email is already in database
                User
                    .findOne({
                        email: payload.email
                    })
                    .then(data => {
                        if (data) {
                            //create token if user is already registered
                            return createJWTToken(data)
                                .then(token => {
                                    res.status(201).json({ message: 'Successfully signed in. Please take note of your token', token: token })
                                })
                        } else {
                            //create new User and save to DB
                            let newUser = new User({
                                email: payload.email,
                                name: payload.name,
                                popularity: 0,
                                popularity_mark: 0
                            })
                            return newUser.save()
                                .then(data => {
                                    //make JWT Token
                                    return createJWTToken(data)
                                })
                                .then(token => {
                                    res.status(201).json({ message: 'User successfully created. Please take note of your token', token: token })
                                })
                                .catch(err => {
                                    console.log(err)
                                    res.status(500).json(
                                        {
                                            message: err.message,
                                            note: 'Please see console log for further details'
                                        })
                                })
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json(
                            {
                                message: err.message,
                                note: 'Please see console log for further details'
                            })
                    })
            }
        })
    }
    static signup(req, res) {
        //encrypt password
        bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
            if (err) {
                console.log(err)
                res.status(500).json({ message: err.message, note: 'Please see console log for details' })
            } else {
                //add user to database
                //if password is not null
                if (req.body.password) {
                    let newUser = new User({
                        email: req.body.email,
                        password: hash,
                        name: req.body.name,
                        questions: [],
                        answers: [],
                        popularity: 0,
                        popularity_mark: 0
                    })
                    newUser.save(function (err) {
                        if (err) {
                            console.log(err)
                            res.status(400).json({ message: err.message, note: 'Please see console log for details' })
                        } else {
                            //create JWT token so user automatically sign up
                            return createJWTToken(newUser)
                                .then((token) => {
                                    res.status(201).json({ message: `Successfully signed up`, data: newUser, token: token })
                                })
                        }
                    })
                    //else if password is empty
                } else {
                    res.status(400).json({ message: 'Password required', note: 'Please see console log for details' })
                }
            }
        });
    }
    static signin(req, res) {
        //find if email exist
        User
            .find({ email: req.body.email })
            .then((data) => {
                //if found
                if (data.length > 0) {
                    //check if password is same
                    bcrypt.compare(req.body.password, data[0].password, function (err, result) {
                        if (err) {
                            console.log(err)
                            res.status(500).json({ message: err, note: "See console for details" })
                        } else {
                            if (result) {
                                return createJWTToken(data[0])
                                    .then(token => {
                                        res.status(200).json({ message: 'Successfully logged in', token: token })
                                    })
                            } else {
                                res.status(400).json({ message: "Password invalid" })
                            }
                        }
                    });
                    //if not found
                } else {
                    res.status(400).json({ message: "User not found" })
                }
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json({ message: err, note: "See console for details" })
            })
    }
    static updatePopularity(req, res) {
        User
            .find({})
            .populate('answers')
            .populate('questions')
            .then(users => {
                let formattedList = []
                users.forEach(user => {
                    let info = {
                        _id: user._id,
                        popularity: 0
                    }
                    user.answers.forEach(answer => {
                        answer.votes.forEach(vote => {
                            if(vote.vote === 1) {
                                info.popularity += 1
                            }
                        })
                    })
                    user.questions.forEach(question => {
                        question.votes.forEach(vote => {
                            if(vote.vote === 1) {
                                info.popularity += 1
                            }
                        })
                    })
                    formattedList.push(info)
                })
                //update user
                let promiseArray = []
                formattedList.forEach(indivUser => {
                    let promise = 
                            User
                                .findOneAndUpdate({
                                    _id: indivUser._id
                                },{
                                    popularity: indivUser.popularity
                                })
                                .then(response => {
                                    // console.log('updated')
                                })
                                .catch(err => {
                                    console.log(err)
                                })

                    promiseArray.push(promise)
                })
                Promise
                    .all(promiseArray)
                    .then(response => {
                        res.status(200).json({message: "Users updated"})

                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json({ message: err.message, note: "Please see console for details" })
                    })
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json({ message: err, note: "See console for details" })
            })
    }
    static getUsers(req, res) {
        User
            .find({})
            .sort({popularity: 'desc'})
            // .populate('answers')
            // .populate('questions')
            .then(users => {
                res.status(200).json(users)
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json({ message: err, note: "See console for details" })
            })
    }
}

module.exports = Controller