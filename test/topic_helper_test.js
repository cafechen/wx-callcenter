var should = require('should');

var helper = require('../lib/topic_helper');

describe('manage topic', function () {
  it('can publish', function (done) {
    helper.enableBot(function (ch, msg) {
      should.exist(msg);
      done();
    });

    helper.sendMessage({sp: "foo", text: "hi"});
  });

  it('can unsubscribe', function (done) {
    helper.disableBot(done);
  });
});