const jsonwebtoken = require('jsonwebtoken');

module.exports = {

    createToken(data) {
        return jsonwebtoken.sign(data, process.env.SECRET_JWT);
    },

    verifToken(token, callback) {
        jsonwebtoken.verify(token, process.env.SECRET_JWT, function(err, decoded) {
            if (err) {
                callback(err);
            } else {
                callback(null, decoded);
            };
        });
    }

}