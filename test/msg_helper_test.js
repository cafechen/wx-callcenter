var should = require('should');

var helper = require('../lib/msg_helper');

describe('manage messages', function () {
  var mockMsgId = "foo",
    mockMsgReceipt = "mock receipt",
    mockUserId = "bar",
    mockMsgBody = "hi";

  it('post sent message', function (done) {
    helper.sentMsg(mockUserId, mockMsgId, mockMsgReceipt, function (err, data) {
      should.not.exist(err);
      //console.log(data);
      done();
    });
  });

  it('append message', function (done) {
    var isAppended_1 = helper.appendMsg(mockMsgId, mockMsgBody);
    isAppended_1.should.be.ok;

    //var isAppended_2 = helper.appendMsg(mockMsgId, mockMsgBody);
    //isAppendend_2.should.be.ok;

    done();
  });

  it('read message', function (done) {
    helper.readMsgs(mockUserId, function (data) {
      data.should.have.property("length");
      data.should.include(mockMsgBody);
      done();
    });
  });

  it('reads no message', function (done) {
    helper.readMsgs('non-exist-user-id', function (data) {
      data.length.should.eql(0);
      done();
    });
  });

  it('clean message', function (done) {
    helper.cleanupMsgs(mockMsgId, function (data) {
      data.should.have.property("length");
      data.length.should.eql(1);
      data[0].should.eql(mockMsgReceipt);
      helper.removeMsgReceipt(mockMsgId, function (err) {
        should.not.exist(err);
        done();
      });
    });
  });

  it('recycle msg recept', function (done) {
    helper.recycle(function (err, data) {
      should.not.exist(err);
      done();
    });
  });
});