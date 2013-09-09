# Description

基于微信的 web 呼叫中心

# Dependencies

* [NodeJS](http://nodejs.org/)
* [Redis](http://redis.io/)

# Installation

	$ npm install

# Configuration

See file `~/.weixin/config.json`:

	{
		"port": 4000,
		"accounts": [
			{"token":"your-wx-token", "path":"URI that it listens to"}
		],
		"jid": {
			"jid": "<jid>",
			"password": "<password>",
			"host": "<xmpp-server-addr>",
			"port": 5222
		},
		"accessKeyId": "<aws-access-key-id>",
		"secretAccessKey": "<aws-secret-access-key>",
		"region": "<aws-region-name>"
	}

# Testing

	$ make test

Get code coverage report by command `make test-cov`.

# Usage

	$ node app