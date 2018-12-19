const bcrypt = require('bcrypt');

module.exports = {

    hashingPassword(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync());
    },

    comparePassword(password, passwordDatabase) {
        return bcrypt.compareSync(password, passwordDatabase)
    },

};