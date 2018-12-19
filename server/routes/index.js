var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.status(200).json({
    msg: "running port 3000"
  })
})
module.exports = router;
