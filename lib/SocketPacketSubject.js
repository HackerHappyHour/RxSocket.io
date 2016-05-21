import {Observable} from 'rxjs/Observable';

exports.SocketPacketSubject = function(socket){
  const events = {
    0: 'CONNECT',
    1: 'DISCONNECT',
    2: 'EVENT',
    3: 'ACK',
    4: 'ERROR',
    5: 'BINARY_EVENT',
    6: 'BINARY_ACK'
  };

  console.log("socketPacketSubject");
  return Observable.create(function(observer){
      console.log("SocketPacketSubject::Observable");
      socket.io.on('packet', (packet) => {
        console.log("SocketPacketSubject::packet", packet);
        if(packet.data && packet.type === 2 || packet.type === 5){
          observer.next({
            type: events[packet.type],
            name: packet.data[0],
            data: packet.data[1]
          });
        }
      });

      socket.on('error', function(err){
        console.error("SocketPacketSubject::error", err);
        observer.error(err);
      });
      socket.on('reconnect_error', function (err) {
        console.error("SocketPacketSubject::reconnect_error", err);
        observer.error(err);
      });
      socket.on('reconnect_failed', function (err) {
        console.error("SocketPacketSubject::reconnect_failed", err);
        observer.error(err);
      });

      return function(){
        socket.close();
      }
  });


}
