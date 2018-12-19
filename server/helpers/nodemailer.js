const nodemailer = require('nodemailer')

function sendEmail(to, subject, body, done) {
    const smtpTransport = nodemailer.createTransport({
        service: "gmail",
        secure: false,
        auth: {
            user: "nsamuderahack@gmail.com",
            pass: process.env.email_pass
        }
    });
    const mailOptions = {
        from: 'Hacktiv Overflow Team"nsamuderahack@gmail.com"',
        to: to,
        subject: subject,
        generateTextFromHTML: true,
        html: body
    };

    smtpTransport.sendMail(mailOptions, (error, response) => {
        if (error) {
            console.log(error)
            return done(new Error('Error in sending email'))
        } else {
            console.log('email sent')
            done()
        }
    });
}

module.exports = sendEmail