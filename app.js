var express = require('express'),
//        engine = require("consolidate"),
        fs = require("fs"),
        log = require('debug')('webot:log'),
        path = require("path"),
        HOME = process.env.HOME || process.env.USERPROFILE,
        // app config
        config = require(path.join(HOME, '.weixin', 'config.json')),
        webot = require("weixin-robot"),
        app;

var app = express();

// uncomment this line to enable static content compression
// app.use(express.compress());

app.use(express.static('public'));
//app.engine("html", engine.mustache);

// set .html as the default extension
app.set('view engine', 'html');

app.set('views', __dirname + '/views');

app.configure('production', function () {
  app.use(express.logger());
})

// support one acount
if(!!config.accounts) {
  var bot_config = config.accounts[0];

  webot.watch(app, bot_config);
  // load rules
  require('./lib/tck_bot')(webot);
}

if (!!config.jid) {
  var xmpp_bot = require('./lib/dispatcher_bot')(config.jid);
  // TODO create event handler to hook webot and xmpp bot
}

app.listen(config.port, function () {
  log("Listening on %s", config.port);
});

// if it's behind a proxy like nginx
// app.enable('trust proxy');

module.exports = app;