
const User = require('../models/user')
require('dotenv').config()
const CronJob = require('cron').CronJob;
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//json web token
const { encoded } = require('../helpers/jasonWebToken')

//bcrypt
const { comparePassword } = require('../helpers/brcyrpt')

module.exports =  {
    popular : (req, res) => {
        User
            .find({})
            .select(['_id', 'name', 'popularity','avatar'])
            .sort({popularity : -1})
            .limit(5)
            .then( users => {
                res.status(200).json( users )
            })
            .catch(error => {
                res.status(500).json({
                    message : error.message
                })
            })
    },
    readUser : (req, res) => {
        let id = req._id
        User
            .findById(id)
            .select(['_id','name','avatar','popularity'])
            .then( user => {
                res.status(200).json( user )
            })
            .catch( error => {
                res.status(500).json({
                    message : error.message
                })
            })
    },
    register : (req, res) => {
        let name = req.body.name ? req.body.name : false
        let email = req.body.email ? req.body.email : false
        let password = req.body.password ? req.body.password : false
        let avatar = req.publicUrl
      
        
        if ( !name || !email || !password ) {
            res.status(400).json({ message : 'Invalid Input'})
        }else {
            
            User
                .findOne({ email })
                .then( user => {
                    if( user ) {
                        res.status(400).json({ message : 'Email Has Been Registered!'})
                    }else {
                        let user = new User({ name, email, password, avatar })
                        return user.save()
                    }
                })
                .then( response => {
                    let job = new CronJob('30 * * * * *', function(){
                        console.log('Cron Job Send Message !')
                        let msg = {
                
                            to : response.email,
                            from : 'bougenvilefashion@gmail.com',
                            subject : `Welcome, to HacktivOverflow`,
                            text : `Selamat Datang di hacktiv overflow!`,
                            html : `<strong>Kamu Sudah Join</strong>`
                        }
                        console.log('ini adalah message :', msg)
                        sgMail.send(msg)
                        job.stop()
                    }, function(){
                        console.log('Cronjob Selesai!')
                    })
                    job.start()
                    res.status(201).json( response)
                })
                .catch( error => {
                    res.status(500).json({ message : error.message})
                })

        }      
    },
    signin : (req, res) => {
        let email = req.body.email
        let password = req.body.password

        User
            .findOne({ email })
            .select(['_id', 'name', 'email','avatar','following','password'])
            .then( user => {
                if( user ) {
                    let validationPassword = comparePassword(password, user.password)
                    if ( validationPassword ) {
                        user = user.toJSON()
                        delete user.password
                        let token = encoded({ _id : user._id, email : user.email})
                        res.status(200).json( {token, user} )
                    }else {
                    res.status(400).json({ message : 'password salah!'})
                    }
                }else{
                    res.status(400).json({ message : 'email tidak terdaftar!'})
                }
            })
            .catch( error => {
                console.log(error.message)
                res.status(500).json({ message : error.message })
            })
    },
    updateUser : (req, res) =>{
        let userId = req._id

        let password = req.body.password

        let data = req.body

        User
            .findById( userId )
            .then( user =>{
                user.set( data )
                return user.save()
            })
            .then( response => {
                res.status(200).json({ message : 'success'})
            })
            .catch( error => {
                res.status(500).json({ message : error.message})
            })
            
    },
    gsignin : (req, res) => {
        console.log('data kiriman :',req.body)
        res.status(200).json(req.body)
    }

    
}