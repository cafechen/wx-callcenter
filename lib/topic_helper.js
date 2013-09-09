var redis = require("redis"),
  client1 = redis.createClient(),
  client2 = redis.createClient();

var generateTicket = function (info) {
  return "@" + info.sp + " " + info.text;
}

var TOPIC_NAME = "wx_msg";

exports.sendMessage = function (info, cb) {
  //console.log("going to publish info: %s, %s", info.sp, info.text);
  client1.publish(TOPIC_NAME, generateTicket(info));
  // just for matching SQS interface
  if (!!cb) {
    cb(info.sp, info.sp);
  }
}

exports.enableBot = function (cb) {
  client2.subscribe(TOPIC_NAME);
  client2.on('message', cb);
}

exports.disableBot = function (cb) {
  client2.unsubscribe(TOPIC_NAME);
  if (!!cb) {
  	cb();
  }
}