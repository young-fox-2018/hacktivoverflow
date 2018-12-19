const User = require('../models/user');
const jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class Auth {
  static isLogin (req, res, next) {
    const decoded = jwt.verify(req.headers.token, process.env.JWT_TOKEN);
    console.log(decoded)
    User
      .findOne({
        email : decoded.email
      })
      .then(data => {
        req.user = decoded
        next()
      })
      .catch(err => {
        res.status(500).json({
          msg : decoded.email
        })
      })
  }

  static googleValidation(req, res, next) {
    var googleToken = req.body.googleToken;
    //res.status(200).json(googleToken)
    var ticket = new Promise((resolve, reject) => {
        client.verifyIdToken({
            idToken: googleToken,
            audience: process.env.GOOGLE_CLIENT_ID
        }, function (err, data) {
            if(err) {
                reject(err)
            } else {
                const payload = data.getPayload();
                const userid = payload['sub'];
                resolve(payload);
            }
        })
    })
    .then(payload => {
        let user = {
          email: payload.email,
          username: payload.name
        }
        req.decoded = user
        next()
    })
    .catch(err => {
        res.status(500).json(err)
    })
}
}

module.exports = Auth