// bot for dispatch customer support messages
var xmpp = require("node-xmpp"),
  ticket = require("./ticket"),
  msg_helper = require("./msg_helper"),
  queue_helper = require("./topic_helper"),
  bot = null;

var errorHandle = function (e) {
  console.error(e);
};

var echoPresence = function () {
  if (bot === null) {
    console.error("xmpp bot is offline");
    return;
  }

  bot.send(new xmpp.Element('presence', { }).
      c('show').t('chat').up().
      c('status').t('reply me in format @customer-wx-id support-info')
  );
}

var sendTicket = function (channel, msg) {
  // TODO support friends of bot
  console.log("going to send msg: %s", msg);
  bot.send(new xmpp.Message({to: 'wangxia002@letoke.com'}).c('body').t(msg));
}

var saveTicket = function (stanza) {
  if (stanza.is('message')) {
  	try {
      var customer = stanza.customer();
      var body = stanza.getChildText('body');

      console.log("%s: %s", customer, body);
      msg_helper.appendMsg(customer, body);

    } catch (e) {
      errorHandle(e);
    }
  }
}

module.exports = exports = function (config) {
  bot = new xmpp.Client(config);

  bot.on("online", echoPresence);
  bot.on("stanza", saveTicket);
  bot.on("error", errorHandle);

  queue_helper.enableBot(sendTicket);

  bot.on("disconnect", queue_helper.disableBot);

  return bot;
};