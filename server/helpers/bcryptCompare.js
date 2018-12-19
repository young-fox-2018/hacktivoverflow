const bcryptjs = require('bcryptjs');

function bcryptCompare (password, hash) {
    return bcryptjs.compareSync(password, hash)
}

module.exports = bcryptCompare