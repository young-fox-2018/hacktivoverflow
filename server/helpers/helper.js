const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

module.exports = {
  hashPassword(password) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    return hash;
  },
  checkPassword(password, hash) {
    return bcrypt.compareSync(password, hash);
  },
  generateToken(input) {
    return jwt.sign(input, process.env.JWT_SECRET);
  },
  verifyToken(token, callback) {
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
      if (err) {
        callback(err);
      } else {
        callback(null, decoded);
      }
    });
  },
}