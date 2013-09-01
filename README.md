# Description

基于微信的 web 呼叫中心

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
		}
	}

# Usage

