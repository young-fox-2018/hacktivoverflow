const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken')
var nodemailer = require('nodemailer');

module.exports = {
    hashPass : function(params){
        return bcrypt.hashSync(params, salt)
    },
    compare : function(params1, params2){
        return bcrypt.compareSync(params1, params2)
    },
    signJwt  : function(params){
        return jwt.sign(params, process.env.secret)
    },
    verifyToken : function(token){
        return jwt.verify(token, process.env.secret)
    },
    nodemailer : function(params, done){
        var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.userNodemailer,
            pass: process.env.passNodemailer
        }
        });

        var mailOptions = {
        from: process.env.userNodemailer,
        to: params.data.recipient,
        subject: `Welcome ${params.data.name}, HacktivOverflow Message`,
        text: 'Thank you for join HacktivOverflow'
        };

        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            done()
        }
        });
    }
}