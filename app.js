var express = require('express'),
        engine = require("consolidate"),
        fs = require("fs"),
        path = require("path"),
        HOME = process.env.HOME || process.env.USERPROFILE,
        // app config
        config = require(path.join(HOME, '.weixin', 'config.json')),
//        order_helpers = require('./lib/order_helpers'),
        expressValidator = require('express-validator'),
        app;

var app = express();

// static content compression
// app.use(express.compress());

app.use(express.static('public'));
app.engine("html", engine.mustache);

// set .html as the default extension
app.set('view engine', 'html');

app.set('views', __dirname + '/views');

// use form validator
// app.use(expressValidator());

app.configure('production', function() {
  app.use(express.logger());
})

// routing
//app.get(/^\/orders\/filter(\/)?$/, order_helpers.filterValidator, order_helpers.filter);
//app.get(/^\/msgs(\/)?$/, order_helpers.form);

app.listen(config.port);

module.exports = app;