const multer = require('multer');

const upload = multer({ dest: '../server/public/images/' });

module.exports = upload;