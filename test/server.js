var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){
  console.log('a client connected');
  socket.emit("testing", {name: "testing"});
  socket.on("thing", function(packet){
    console.log("thing: ", packet.data);
  })
});

http.listen('3031', function(){
  console.log('listening on :3031');
})
