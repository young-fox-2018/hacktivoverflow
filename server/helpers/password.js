const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports = {
    hashPassword: (plainPass) => {
      if (!plainPass) return null
      return bcrypt.hashSync(plainPass, saltRounds)
    },

    checkPassword: (plainPass, dbPass) => {
      return bcrypt.compareSync(plainPass, dbPass)
    }
}