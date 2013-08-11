// example robot for wx

var webot = require('weixin-robot');

webot.set('hi', 'hi, dude');

webot.set('subscribe', {
  pattern: function(info) {
    return info.is('event') && info.param.event === 'subscribe';
  },
  handler: function(info) {
    return 'welcome subscribe!';
  }
});

module.exports = webot;