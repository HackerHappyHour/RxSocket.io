var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Observable = require('rxjs/Observable').Observable;

io.on('connection', function(socket){
  console.log('a client connected');
});

http.listen('3031', function(){
  console.log('listening on :3031');
})
