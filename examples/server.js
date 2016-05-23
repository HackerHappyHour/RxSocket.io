var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){
  socket.on('thing', function(data){
    console.log("thing received", data);
  });
  socket.emit('testing', {data: 'server data'})
});

http.listen('3031', function(){
  console.log('listening on :3031');
})
