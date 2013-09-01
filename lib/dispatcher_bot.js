// bot for dispatch customer support messages
var xmpp = require("node-xmpp"),
  ticket = require("./ticket"),
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

var saveTicket = function(stanza) {
  if (stanza.is('message')) {
  	try {
      var customer = stanza.customer();
      var body = stanza.getChildText('body');

      console.log("%s: %s", customer, body);

    } catch (e) {
      errorHandle(e);
    }
  }
}

module.exports = exports = function (config) {
  bot = new xmpp.Client(config);

  //bot.emit('online');
  bot.on("online", echoPresence);
  bot.on("stanza", saveTicket);
  bot.on("error", errorHandle);

  return bot;
};