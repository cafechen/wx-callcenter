var xmpp = require('node-xmpp'),
  should = require('should');

var C2S_PORT = 65001;

describe("Client connectivity", function () {

  var sv = new xmpp.C2SServer({port: C2S_PORT });
  var svcl;

  sv.on('connect', function (client) {
    svcl = client;
    client.on('authenticate', function (opts, cb) {
      cb();
    });

    client.on("disconnect", function (cl) {
      console.log("disconnect: " + cl);
    });
  });

  var cl = new xmpp.Client({
    jid: 'test1@localhost',
    password: 'test',
    host: '::1',
    port: C2S_PORT
  });

  it("receive message", function (done) {
    svcl.once('stanza', function (stanza) {
      stanza.is('message').should.be.ok;
      done();
    });

    svcl.send(new xmpp.Message({ to: "test1@localhost" }).c('body').t("Hello"));
  });

  it("send message", function (done) {
    svcl.once('stanza', function (stanza) {
      stanza.is('message').should.be.true;
      stanza.attrs.to.should.eql("foo@bar.org");
      done();
    });

    cl.send(new xmpp.Message({to: 'foo@bar.org'}).c('body').t('hi'));
  });
});

describe("Connect to letoke.com", function () {

  var jidA = {
    jid: "wangxia001@letoke.com",
    password: "wangxia",
    host: "letoke.com",
    port: 5222
  };

  var jidB = {
    jid: "wangxia002@letoke.com",
    password: "wangxia",
    host: "letoke.com",
    port: 5222
  };

  var bot = require('../lib/dispatcher_bot')(jidA);

  it("send message", function (done) {
    bot.send(new xmpp.Message({to: jidB.jid}).c('body').t('hi'));
    done();
  });
});