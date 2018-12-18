const User = require('../models/user')
const { decodeToken, apiError } = require('../helpers')


module.exports = {
  authentication(req, res, next) {
    decodeToken(req.get('access-token'))
      .then(decoded => {
        return User
          .findById(decoded.id)
          .exec()
          .then(user => {
            if (user) {
              let { id, name, email } = user
              req.currentUser = { id, name, email }
              next()
            } else {
              throw new apiError(400, "User doesn't exist")
            }
          })
      })
      .catch(err => {
        res.status(err.httpCode || 500).json({ error: err.message })
      })
  },
}