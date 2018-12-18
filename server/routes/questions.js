var express = require('express');
var router = express.Router();
const {isLoggedIn} = require('../middlewares/authentication')
const questionsController = require("../controllers/questions.js")

/* GET users listing. */

router.get("/", questionsController.all)
router.post("/", isLoggedIn, questionsController.create)
router.get("/:id", questionsController.detail)
router.patch("/:id", isLoggedIn, questionsController.update)

module.exports = router;