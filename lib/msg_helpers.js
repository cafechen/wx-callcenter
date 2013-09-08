// wx msg helpers

var redis = require("redis"),
  client = redis.createClient();

var H_MSG_MAP = "msg_map",
  H_MSG_ENTRIES = "msg_entries",
  H_MSG_BODIES = "msg_body:";	// prefix of msg_body array key

exports.readMsgs = function (userId, cb) {
	// namespace
	var key = H_MSG_BODIES + "userId";
	client.llen(key, function (err, data) {
	  if (data > 0) {
      client.lrange(key, 0, -1, function (err, data) {
        try {
          cb();
        } finally {
          client.del(key);
        }
      });
		} else {
		  cb(null, []);
		}
	});
}

exports.deleteMsg = function (msgIds, cb) {
  client.hmget(H_MSG_ENTRIES, msgIds, function (err, data) {
    cb(data);
  }
}

exports.appendMsg = function (msgId, msgBody) {
  client.hget(H_MSG_MAP, msgId, function(err, userId) {
    if (!! userId) {
      var key = H_MSG_BODIES + "userId";
      client.rpush(key, msgBody);
    }
  });
}