const jwt = require('jsonwebtoken');

function tokenProses(data) {
    return tokens = jwt.sign({ data }, process.env.ENV_TOKEN);
}

module.exports = tokenProses