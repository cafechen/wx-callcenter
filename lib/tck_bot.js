// rules for 竞彩客(tck)

var msg_helper = require('./msg_helper'),
  queue_helper = require('./topic_helper');

var subscriptionResp = {
	// name 和 description 都不是必须的
	name: 'help',
	description: '获取使用帮助，发送 help',
	pattern: function (info) {
	  return info.is('event') && info.param.event === 'subscribe';
	},
	handler: function (info) {
		return {
		    title: '感谢你关注',
		    pic: 'http://m.letoke.com/img/logo1.png',
		    url: 'http://m.letoke.com/',
		    description: [
		      '建议你试试这几条指令:',
		        '1 : 福彩双色最新资讯',
		        '2 : 最新开奖及历史',
		        '3 : 方案推荐',
	/**	        '4 : 特色玩法',
		        '5 : 投注技巧',
		        '6 : 分析方法',
		        '7 : 专有名词介绍',
		        '8 : 心法介绍',
		        '9 : 故事趣事',
	 */
		        'help : 重看本指令请回复help或问号',
		        'PS: 点击下面的「查看全文」将跳转到我的首页'
		    ].join('\n')
		}
	}
};

var humanResp = {
      name: "human response",
      description: "文本消息自动转客服回复",
  		pattern: function (info) {
        return info.type === "text";
  		},
  		handler: function (info, next) {
	      // step #1 : send meg to queue
        queue_helper.sendMessage(info, function (msgId, receiptHandle) {
          msg_helper.sentMsg(info.sp, msgId, receiptHandle);
        });
        var self = this;
        msg_helper.readMsgs(info.sp, function (data) {
  	        if (data.length > 0) {
  	          info.reply = data;
  	        } else {
  	          // default reply
  	          info.reply = "您的消息已发送至人工客服，请继续对话以获取回复";
  	        }
            next(info);
  	    });
      }
}

// TODO support unsubscribe handler

module.exports = exports = function (webot) {
	webot.set(subscriptionResp);

	require('js-yaml');
	webot.dialog(__dirname + '/tck.yaml');
  webot.set(humanResp);
}