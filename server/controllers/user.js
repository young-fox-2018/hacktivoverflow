const User = require('../models/user.js');
const { createToken, verifToken } = require('../helpers/token.js');
const { comparePassword } = require('../helpers/encrypt.js');
const Cronjob = require('cron').CronJob;
const sendMail = require('../helpers/nodemailer.js');

class UserController {

    static readOne(req, res) {
        User.findById({
            _id: req.params.userId,
        }, 'name email _id image popularity')
            .then(function(result) {
                res.status(200).json(result);
            })
            .catch(function(error) {
                console.log(error);
                res.status(500).json(error);
            });
    }
    
    static update(req, res) {
        let obj = {}
        if (req.file === undefined) {
            obj = {
                name: req.body.name,
                email: req.body.email,
            }
        } else {
            obj = {
                name: req.body.name,
                email: req.body.email,
                image: req.file.filename,
            }
        }
        User.findOneAndUpdate({ _id: req.params.userId }, obj)
            .then(function(result) {
                res.status(200).json(result);
            })
            .catch(function(error) {
                res.status(401).json({ error: error.message});
            });
    }
    
    static register(req, res) {
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
            .then(function(result) {
                // let job = new Cronjob('* * * * * *', function() {
                //     console.log('masuk pak cronjob');
                //     sendMail(req.body.email, req.body.name);
                //     job.stop();
                // }, function() {
                //     console.log('Job Done Bro..');
                // });
                // job.start();
                res.status(201).json(result);
            })
            .catch(function(error) {
                res.status(401).json({ error: error.message});
            });
    }

    static login(req, res) {
        User.findOne({
            email: req.body.email,
        })
            .then(function(result) {
                if (result) {
                    let checkPassword = comparePassword(req.body.password, result.password);
                    if (checkPassword) {
                        result = result.toJSON();
                        delete result.password;
                        res.status(201).json({ token: createToken(result)});
                    } else {
                        res.status(401).json({ error: 'Password wrong'});
                    };
                } else {
                    res.status(401).json({ error: 'Email not found'});
                };
            })
            .catch(function(error) {
                console.log(error);
                res.status(500).json(error);
            });
    }

    static checkToken(req, res) {
        verifToken(req.headers.token, function(err, decoded) {
            if (err) {
                res.status(401).json({ message: "Token Failed" });
            } else {
                res.status(200).json(decoded);
            }
        });        
    }

    static popularity(req, res) {
        User.find({})
            .sort({ popularity: -1 })
            .limit(5)
            .then(function(result) {
                res.status(200).json(result);
            })
            .catch(function(error) {
                console.log(error);
                res.status(500).json(error);
            });
    }

}

module.exports = UserController;