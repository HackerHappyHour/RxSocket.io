require('babel-register');
var app = require('express')();
var http = require('http').Server(app);
var RxSocketServer = require('../lib/WebSocketServer').WebSocketServer;
var fs = require('fs');
var path = require('path');

var socketServer = new RxSocketServer(http);
socketServer.subscribe(function(data){
  console.log(data)
});

socketServer.next('testing');

http.listen('3031', function(){
  console.log('listening on :3031');
})
