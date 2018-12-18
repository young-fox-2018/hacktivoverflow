var express = require('express');
var router = express.Router();
const tagsController = require("../controllers/tags.js")

/* GET users listing. */

router.post("/", tagsController.create)

module.exports = router;