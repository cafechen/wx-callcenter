// wx msg helpers

var redis = require("redis"),
  client = redis.createClient();

var H_MSG_MAP = "msg_map",
  H_MSG_ENTRIES = "msg_entries",
  H_MSG_BODIES = "msg_body:"; // prefix of msg_body array key

exports.sentMsg = function (userId, msgId, receiptHandle, cb) {
  client.multi().hset(H_MSG_MAP, msgId, userId)
    .hset(H_MSG_ENTRIES, msgId, receiptHandle).exec(cb);
};

exports.readMsgs = function (userId, cb) {
  // namespace
	var key = H_MSG_BODIES + "userId";
	client.llen(key, function (err, len) {
	  if (len > 0 && !err) {
      client.lrange(key, 0, -1, function (err, data) {
        try {
          cb(data);
        } finally {
          client.del(key);
        }
      });
		} else {
		  cb([]);
		}
	});
}

exports.cleanupMsgs = function (msgIds, cb) {
  client.hmget(H_MSG_ENTRIES, msgIds, function (err, data) {
    if(!err) {
      cb(data);
    }
  });
}

exports.removeMsgReceipt = function (msgId, cb) {
  client.hdel(H_MSG_ENTRIES, msgId, cb);
}

exports.appendMsg = function (msgId, msgBody, cb) {
  return client.hget(H_MSG_MAP, msgId, function(err, userId) {
    if (!! userId) {
      var key = H_MSG_BODIES + "userId";
      client.rpush(key, msgBody);
    }
  });
}

exports.recycle = function (cb) {
  client.multi().del(H_MSG_ENTRIES).del(H_MSG_MAP).exec(cb);
}