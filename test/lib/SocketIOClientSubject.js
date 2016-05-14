require("babel-register");
var {SocketIOClientSubject} = require('../../lib/SocketIOClientSubject');

var config = {
  url: 'http://localhost:3031'
}
var source = new SocketIOClientSubject(config);
