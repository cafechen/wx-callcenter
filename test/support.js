// support library for testing

var fs = require('fs'),
	path = require("path"),
	crypto = require('crypto'),
	Mustache = require('mustache'),
	querystring = require('querystring');

exports.mock_wx_query = function(token, echostr) {
	var q = {
	    timestamp: new Date().getTime(),
	    nonce: parseInt((Math.random() * 100000000000), 10)
	};
	var s = [token, q.timestamp, q.nonce].sort().join('');
	q.signature = crypto.createHash('sha1').update(s).digest('hex');
	q.echostr = echostr;
	return '?' + querystring.stringify(q);
};

exports.mock_text_xml_msg = Mustache.compile(
	fs.readFileSync(path.join(__dirname, '..', 'views', 'text_msg.xml')).toString()
);
