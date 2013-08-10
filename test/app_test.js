var app = require('../app')
  , request = require('supertest')
  , should  = require('should');

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
