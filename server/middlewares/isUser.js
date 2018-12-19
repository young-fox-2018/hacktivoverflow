const { verifToken } = require('../helpers/token.js');


module.exports = {

    isUser(req, res, next) {
        verifToken(req.headers.token, function(err, decoded) {
            if (err) {
                res.status(401).json({ message: "Invalid Token" });
            } else {
                req.user = decoded;
                next();
            }
        });
    },

};