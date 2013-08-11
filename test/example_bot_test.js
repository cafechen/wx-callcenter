var express = require('express')
  , request = require('supertest')
  , should  = require('should')
  , webot	= require('../lib/example_bot')
  , mock_query = require('./support').mock_wx_query
  , mock_text  = require('./support').mock_text_xml_msg;

describe('example_bot.js', function () {
	var app;
	var mock_path = '/foo';
	var mock_token = 'your1weixin2token';

    before(function () {
      app = express();
      app.use(express.query());

      webot.watch(app, { token: mock_token, path: mock_path });
    });

    describe('GET works', function() {
    	var msg = 'hello';
    	it('should 200', function (done) {
	        request(app)
	        .get(mock_path + mock_query(mock_token, msg))
	        .expect(200)
	        .expect(msg, done);
      	});
    })

    describe('POST works', function() {
    	it('respond 200', function (done) {
	        var info = {
	          to: 'tester',
	          from: 'bar',
	          type: 'text',
	          content: 'hi',
	          created: new Date().getTime()
	        };

	        request(app)
	        .post(mock_path + mock_query(mock_token, 'hi'))
	        .send(mock_text(info))
	        .expect(200)
	        .end(function(err, res){
	          if (err) return done(err);
	          var body = res.text.toString();

	          body.should.include('<ToUserName><![CDATA[bar]]></ToUserName>');
	          body.should.include('<FromUserName><![CDATA[tester]]></FromUserName>');
	          body.should.match(/<CreateTime>\d{13}<\/CreateTime>/);
	          body.should.include('<MsgType><![CDATA[text]]></MsgType>');
	          body.should.match(/<Content>.+<\/Content>/);
	          body.should.include('<FuncFlag>0</FuncFlag>');
	          done();
	        })
	    })
    })
})