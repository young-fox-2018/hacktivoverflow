const jwt = require('jsonwebtoken');
const User = require('../models/User');

function verifyToken(req, res, next) {
  const decoded =  jwt.verify(req.headers.token, process.env.SECRET);
  User.findById(decoded.id, function(err, user) {
    if(!err){
      if(user) {
        req.current_user = decoded.id
        next();
      } else {
        res.status(406).json({
            msg: 'Invalid token'
        });
      }
    } else {
      res.status(500).json({
        msg: `Internal server error`,
        error: err.message
      });
    }
  });
}

module.exports = verifyToken;