// sqs test
var AWS = require('aws-sdk'),
  path = require("path"),
  should = require("should"),
  HOME = process.env.HOME || process.env.USERPROFILE;

AWS.config.loadFromPath(path.join(HOME, '.weixin', 'config.json'));

describe('SQS', function () {

  var sqs = new AWS.SQS({apiVersion: "2012-11-05"});
  var Q_NAME = "zhuke-test";
  var qUrl = "https://sqs.us-west-2.amazonaws.com/386813338723/zhuke-test";
  var MSG = "hi";
  var msgEntries = [];

  //console.log(sqs);
  it('queue exists', function (done) {
    sqs.listQueues({}, function (err, data) {
	    should.not.exist(err);
	    data.should.have.property("QueueUrls");
	    done();
	  });

  });

  it('queue attributes', function (done) {
	  sqs.getQueueAttributes({
	  	"QueueUrl": qUrl,
	  	"AttributeNames": ["MaximumMessageSize", "QueueArn"]
	  }, function(err, data) {
	  	should.not.exist(err);
	    data.should.have.property("Attributes");
	    data["Attributes"].should.have.keys(["MaximumMessageSize", "QueueArn"]);
	    done();
	  });
  });

  it('send msg', function (done) {

  	sqs.sendMessage({QueueUrl: qUrl, MessageBody: MSG}, function (err, data){
      should.not.exist(err);
      data.should.have.property("MessageId");
      data.should.have.property("MD5OfMessageBody");
      done();
  	});
  });

  it('receive msg', function (done) {
  	/**
  	sqs.getQueueAttributes({
	  	"QueueUrl": qUrl,
	  	"AttributeNames": ["ApproximateNumberOfMessages"]
	  }, function(err, data) {
	  	should.not.exist(err);
	    data.should.have.property("Attributes");
	    //console.log(data["Attributes"]["ApproximateNumberOfMessages"]);
	  });
    */

	  sqs.receiveMessage({
        	QueueUrl: qUrl,
          MaxNumberOfMessages: 10,
        	WaitTimeSeconds: 3}, function (err, data) {
			      should.not.exist(err);
			      data.should.have.property("Messages");
			      data["Messages"].forEach(function (msg) {
			      	msg.Body.should.exist;
			      	msgEntries.push({Id: msg.MessageId, ReceiptHandle: msg.ReceiptHandle});
			      });
			      done();
		      });  
   });

  it('delete msg', function (done) {
  	if (msgEntries.length > 0) {
      sqs.deleteMessageBatch({QueueUrl: qUrl, Entries: msgEntries}, function (err, data) {
        should.not.exist(err);
        //console.log(data);
        data.Successful.should.exist;
        data.Successful.length.should.eql(msgEntries.length);
        data.Failed.should.be.empty;
        done();
      });
  	} else {
  		done();
  	}
  });
});