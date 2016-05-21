require('babel-register');
var app = require('express')();
var http = require('http').Server(app);
var WebSocketServer = require('../lib/WebSocketServer').WebSocketServer;

var socketServer = new WebSocketServer(http);
socketServer.subscribe(function(connection){
    socketServer.next('testing');
});


http.listen('3031', function(){
  console.log('listening on :3031');
})
