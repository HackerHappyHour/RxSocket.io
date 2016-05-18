import {Subject} from 'rxjs/Subject';
import {Subscriber} from 'rxjs/Subscriber';
import {Observable} from 'rxjs/Observable';
import io from 'socket.io-client';
import {SocketPacketSubject} from './SocketPacketSubject';

export function WebSocketClient(address) {

    const socket = io(address);
    var packetObservable = SocketPacketSubject(socket);

    var observable = Observable.create(function(observer){
      socket.on('connect', function(){
          packetObservable.subscribe(
            function(packet){
              observer.next(packet);
            },
            function(err){
              observer.error(err);
            },
            function(){
              observer.complete();
            }
          );
      })

      return function(){
        socket.close();
      }
    });


    var observer = Subscriber.create(function (event) {
            socket.emit(event.name, {data: event.data});
    });

    return Subject.create(observer, observable);
}
