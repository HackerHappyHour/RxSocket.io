import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {Subscriber} from 'rxjs/Subscriber';
import io from 'socket.io-client';
import {fromPacket} from './fromPacket';

export function WebSocketClient(address) {
    const events = {
      0: 'CONNECT',
      1: 'DISCONNECT',
      2: 'EVENT',
      3: 'ACK',
      4: 'ERROR',
      5: 'BINARY_EVENT',
      6: 'BINARY_ACK'
    };
    const socket = io(address);

    var packetSubscription = fromPacket(socket.io);


    socket.on('error', function (err) { obs.error(err); });
    socket.on('reconnect_error', function (err) { obs.error(err); });
    socket.on('reconnect_failed', function () { obs.error(new Error('reconnection failed')); });
    socket.io.on('close', function () { obs.complete(); });


    var observer = Subscriber.create(function (event) {
            console.log("sending to server: ", event);
            socket.emit(event.name, event.data);
    });

    var observable = Observable.create(function(obs){

      return socket.close();
    });

    return Subject.create(observer, observable);
}
