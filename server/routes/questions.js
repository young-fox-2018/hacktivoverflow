var express = require('express');
var router = express.Router();
const {isLoggedIn} = require('../middlewares/authentication')
const questionsController = require("../controllers/questions.js")

/* GET users listing. */

router.get("/", questionsController.all)
router.get("/own", isLoggedIn, questionsController.own)
router.post("/", isLoggedIn, questionsController.create)
router.get("/:id", questionsController.detail)
router.patch("/:id", isLoggedIn, questionsController.update)
router.delete("/:id", isLoggedIn, questionsController.delete)

module.exports = router;