var app = require('../app')
  , request = require('supertest')
  , should  = require('should')
  , mock_query = require('./support').mock_wx_query
  , mock_text  = require('./support').mock_text_xml_msg;

describe('front page', function() {
        describe('GET /', function() {
                it('respond with html',function(done){
                  request(app)
                    .get('/')
                    .expect('Content-Type',/html/)
                    .expect(200)
                    .end(function(err, res) {
                      done();
                    });
                })
        })
})

describe('tck_bot.js', function() {
  var mock_token = 'your-wx-token';
  var mock_path = '/foo';

  it('hi', function() {
      var msg = 'hi';
      it('should 200', function (done) {
          request(app)
          .get(mock_path + mock_query(mock_token, msg))
          .expect(200)
          .expect(msg, done);
        });
  })

  describe('rules', function() {
      
      it('help', function (done) {
          var info = {
            to: 'tester',
            from: 'bar',
            type: 'text',
            content: 'help',
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
            //body.should.match(/<Content>.+<\/Content>/);
            body.should.include('<FuncFlag>0</FuncFlag>');
            done();
          })
      })

      it('version', function (done) {
          var info = {
            to: 'tester',
            from: 'bar',
            type: 'text',
            content: 'version',
            created: new Date().getTime()
          };

          request(app)
          .post(mock_path + mock_query(mock_token, 'hi'))
          .send(mock_text(info))
          .expect(200)
          .end(function(err, res){
            if (err) return done(err);
            var body = res.text.toString();

            body.should.match(/<Content><\!\[CDATA\[alpha\]\]><\/Content>/);
            done();
          })
      })


      it('human support', function (done) {
          var info = {
            to: 'tester',
            from: 'bar',
            type: 'text',
            content: '有人在吗',
            created: new Date().getTime()
          };

          request(app)
          .post(mock_path + mock_query(mock_token, 'hi'))
          .send(mock_text(info))
          .expect(200)
          .end(function(err, res){
            if (err) return done(err);
            var body = res.text.toString();
            console.log(body);

            body.should.match(/<Content><\!\[CDATA\[alpha\]\]><\/Content>/);
            done();
          })
      })
  })
})
