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

  return Observable.create(function(observer){
      socket.io.on('packet', (packet) => {
        if(packet.data && packet.type === 2 || packet.type === 5){
          observer.next({
            type: events[packet.type],
            name: packet.data[0],
            data: packet.data[1]
          });
        }
      });

      socket.on('error', function(err){
        observer.error(err);
      });
      socket.on('reconnect_error', function (err) {
        observer.error(err);
      });
      socket.on('reconnect_failed', function (err) {
        observer.error(err);
      });

      return function(){
        socket.close();
      }
  });


}
