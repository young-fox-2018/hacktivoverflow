const   User = require('../models/user'),
        Helper = require('../helper/index'),
        jwt = require('jsonwebtoken'),
        mailer = require('../helper/mailer'),
        CronJob = require('cron').CronJob;


class UserController {

    static create ( req, res ) {
        let randomPassword = Math.random().toString(36).slice(-8);
        let user = new User ({
            name: req.body.name,
            email: req.body.email,
            password: randomPassword,
            role: req.body.role
        })
        user.save( (err, data) => {
            if (err) {
                console.log(err)
                res.status(500).json( error.message )
            } if ( data ) {
                console.log(`setelah encrypt`)
                let now = new Date()
                let minute = now.getMinutes()
                let hour = now.getHours()
                let schedule = 5
                if ( minute + schedule > 50) {
                    if ( hour+=1 === 24 ){
                        hour = 0
                    } else {
                        minute = 0
                        hour+=1
                    }
                }
                console.log(`------------------`)
                console.log(randomPassword)
                let subject = `password pollOverflowPoint anda`
                let resultText = `password anda adalah ${randomPassword} , silahkan lakukan perubahan untuk keamanan akun anda`
                mailer ( data.email, subject, resultText, (err ) => {
                    if ( err) res.send (err )
                    else res.status(200).json( data )
                })
                
                //harus setting waktu dulu, terus tambahkan 5 menit
                /*new CronJob(`${minute} ${hour} * * * *`, function() {

                    let subject = `password poll get souliton anda`
                    let resultText = `password anda adalah ${randomPassword} , silahkan lakukan perubahan untuk keamanan akun anda`
                    mailer ( data.email, subject, resultText, (err ) => {
                        if ( err) res.send (err )
                        else res.status(200).json( data )
                    });
                    
                  }, null, true, 'Asia/Jakarta');;
                  require('dotenv').config()*/
            }
        })
    }

    static signIn ( req, res ) {
        console.log(req.body)
        User.findOne({ name : req.body.name})
            .then( user => {
                if ( user !== null ){
                    let hash = Helper.encryp( req.body.password, user.salt)
                    if ( user.password === hash ){
                        let data = { id : user._id}
                        let id = user._id
                        let jToken = jwt.sign( data, process.env.jSecret)
                        res.status(200).json( {jToken, id} )
                    } else {
                        console.log(err)
                        res.status(500).json( {error : err, message : "your email address or password is incorrect"} )  
                    }
                    
                } else {
                    res.status(500).json( {error : 'err', message : "your email address or password is incorrect"} ) 
                }
            })
            .catch( err => {
                console.log(err)
                res.status(500).json( {error : err, message : "your email address or password is incorrect"} )
            })
    }

    static updatePassword ( req, res ) {
        console.log(`masuk update password`)
        console.log(req.myId)
        let pass = req.body.pass
        User.findOne({ _id : req.myId})
        .then( user => {
            let hash = Helper.encryp( pass.last, user.salt)
            console.log(`ini hasil hash`)
            console.log(hash)
            console.log(`ini dari db`)
            console.log(user.password)
            if ( user.password === hash ){
                console.log(`lolos tes password`)
                user.password = pass.new
                user.save()
                    .then ( result => {
                        res.status(200).json( result )
                    })
                    .catch ( err => {
                        res.status(500).json( {error : err, message : "Something went wrong, please call developer!"} )
                    })
            }
            else {
                res.status(500).json( {error : err, message : "Something went wrong, please call developer!"} )
            }
        })
        .catch( err => {
            res.status(500).json( {error : err, message : "Something went wrong, please call developer!"} )
        })
    }

    static gSignIn ( req, res ) {
        const {OAuth2Client} = require('google-auth-library');
        const client = new OAuth2Client(process.env.gSecret);
        client.verifyIdToken({
            idToken: req.headers.gtoken
        },( err, result ) => {
            if ( err ) {
                res.status(500).json( err )
            } else {
                User.findOne({ email : result.payload['email']})
                .then( user => {
                    if ( user !== null ){
                        let data = { id : user._id}
                        let jToken = jwt.sign( data, process.env.jSecret )
                        //gimana kirim jToken sambil redirect
                        //res.status(200).json( {jToken} )
                        if ( user.role === 'admin' ) {
                            res.status(200).json( {jToken} )
                        }
                    } 
                    else {
                        let user = new User ({
                            email: result.payload['email'],
                            password: req.headers.gtoken
                        })
                        user.save( (err, data) => {
                            if (err) {
                                console.log( err )
                                res.status(500).json({ "error found" : err})
                            } if ( data ) {
                                let data = { id : user._id}
                                let jToken = jwt.sign( data, process.env.jSecret)
                                res.status(200).json( {jToken} )
                            }
                        })
                    }
                })
                .catch( err => {
                    console.log(err)
                    res.status(500).json( {"Upps something wrong.." : err} )
                })
            }
        });
    }

    static readOne ( req, res ) {
        console.log(req.body)
        User.findById(req.myId)
            .then( user => {
                console.log(user)
                res.status(200).json( user )
            })
            .catch( err => {
                console.log(err)
                res.status(500).json( {error : err, message : "your email address or password is incorrect"} )
            })
    }

}

module.exports = UserController