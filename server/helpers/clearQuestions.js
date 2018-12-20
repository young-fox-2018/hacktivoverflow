const Question = require('../models/Question');

module.exports = function(done) {
  if (process.env.NODE_ENV === 'test') {
    Question
      .deleteMany({})
      .then(function() {
        done();
      })
      .catch(function(err) {
        console.log(err);
      });
  }
};