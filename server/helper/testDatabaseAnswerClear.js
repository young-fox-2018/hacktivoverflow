const Answer = require('../models/answer');

module.exports = function(done) {
  if (process.env.NODE_ENV === 'test') {
    Answer
      .deleteMany({})
      .then(function() {
        done();
      })
      .catch(function(err) {
        console.log(err);
      });
  }
};
