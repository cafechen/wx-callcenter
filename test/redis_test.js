var should = require('should');

describe('redis', function () {

  var redis = require("redis"),
    client = redis.createClient();

  var keys = ["foo", "bar"],
    values = ["abc", "def"];

  it("set", function (done) {
    keys.forEach(function (key, index) {
      client.set(key, values[index]);
    });
    
    done();
  });

  it("get", function (done) {
    client.get(keys[0], function (err, data) {
      should.not.exist(err);
      data.should.eql(values[0]);
      done();
    });
  });

  it("multi get", function (done) {
    client.mget(keys, function (err, data) {
      should.not.exist(err);
      data.length.should.eql(2);
      done();
    });
  });

  it("delete", function (done) {
    client.multi().del(keys[0]).del(keys[1]).exec(function (err, data) {
      data.length.should.eql(2);
      done();
    });
  });

  it("append to list", function (done) {
    client.multi().del(keys[0]).rpush(keys[0],values[0]).rpush(keys[0], values[1])
    .exec(function (err, data) {
      should.not.exist(err);
      data.should.be.an.instanceOf(Array);
      done();
    });
  });

  it("get list", function (done) {
    client.lrange(keys[0], 0, -1, function (err, data) {
      should.not.exist(err);
      data.length.should.eql(2);
      done();
    });
  });

  it("pop from list", function (done) {
    client.llen(keys[0], function (err, data) {
      should.not.exist(err);
      data.should.eql(2);
      //done();
    });

    client.lpop(keys[0], function (err, data) {
      should.not.exist(err);
      data.should.eql(values[0]);
      done();
    });
  });

  it("support hash set", function (done) {
    client.hmset(keys[1], "k1", "v1", "k2", "v2", function (err, data) {
      should.not.exist(err);
      done();
    });
  });

  it("support hash get", function (done) {
    client.hmget(keys[1], ["k1", "k2"], function (err, data) {
      should.not.exist(err);
      data.length.should.eql(2);
      done();
    });
  });
});