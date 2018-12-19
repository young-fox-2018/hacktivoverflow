const bcryptjs = require('bcryptjs')

function hash(pass) {
    return bcryptjs.hashSync(pass, 10)
}
module.exports = hash