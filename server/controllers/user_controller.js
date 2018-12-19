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
                
                let job = new CronJob(`* * * * * *`, function() {
                    console.log(`job start`)
                    let subject = `password poll get souliton anda`
                    let resultText = `password anda adalah ${randomPassword} , silahkan lakukan perubahan untuk keamanan akun anda`
                    mailer ( data.email, subject, resultText, (err ) => {
                        if ( err) res.send (err )
                    });

                    job.stop()
                    
                  }, function (){
                      console.log(`job done`)
                  }, true, 'Asia/Jakarta');
                  console.log(`sebelum job start`)
                  job.start()

                  res.status(200).json( data )
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
        console.log(`masuk gSignIn`)
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
                        console.log(`usernya udah ada`)
                        let data = { id : user._id}
                        let jToken = jwt.sign( data, process.env.jSecret )
                        //gimana kirim jToken sambil redirect
                        //res.status(200).json( {jToken} )
                        if ( user.role === 'admin' ) {
                            res.status(200).json( {jToken} )
                        }
                    } 
                    else {
                        console.log(`usernya belum ada`)
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

    static readBestContributor ( req, res ) {
        User.find()
            .select(['name', 'popularity'])
            .sort({popularity: -1})
            .limit(5)
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