// message model

var Stanza = require("node-xmpp").Stanza;

Stanza.prototype.customer = function () {
  if (this.name === "message") {
  	return extractCustomerId(this.getChildText("body"));
  } else {
  	return "";
  }
};

var extractCustomerId = function (b) {
  // follow the message format defined in https://github.com/letoke/wx-callcenter/issues/1
  if (b.indexOf('@') !== 0) {
    throw new Error("customer msg should start with @");
  } else {
  	return b.substr(1, b.indexOf(' '));
  }
}