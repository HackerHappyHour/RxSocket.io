var {Observable} from 'rxjs/Observable';

exports.fromPacket = function(source){
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
    source.on('packet', (packet) => {
      if(packet.type === 2 || packet.type === 5){
        observer.next();
      }
    });
  })
}
