var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var path = require('path');

io.on('connection', function(socket){
  socket.io.on('packet', function(packet){
    console.log('packet: ', packet);
  });
  console.log('a client connected');
  socket.emit("testing", {name: "testing"});
  socket.on("thing", function(packet){
    console.log("thing: ", packet.data);
  });

  fs.readFile(path.join(__dirname, '../package.json'), function(err, buf){
    socket.emit(buf);
  })
});

http.listen('3031', function(){
  console.log('listening on :3031');
})
