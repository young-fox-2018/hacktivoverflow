const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(13)

class BcryptHelper{
    static encode(input){
        return bcrypt.hashSync(input, salt)
    }

    static decode(password, hash){
        return bcrypt.compareSync(password, hash)
    }
}

module.exports = BcryptHelper