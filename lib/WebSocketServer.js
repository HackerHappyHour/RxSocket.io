import {Subject} from 'rxjs/Subject';
import {Subscriber} from 'rxjs/Subscriber';
import {Observable} from 'rxjs/Observable';
import io from 'socket.io';
import {SocketPacketSubject} from './SocketPacketSubject';

export function WebSocketServer(http) {

    const socket = io(http);
    var packetObservable = SocketPacketSubject(socket);

    var observable = Observable.create(function(observer){
      socket.on('connection', function(){
          packetObservable.subscribe(
            function(packet){
              console.log("WebSocketServer::next")
              observer.next(packet);
            },
            function(err){
              console.log("packet observer error");
              observer.error(err);
            },
            function(){
              console.log("packet observer completing");
              observer.complete();
            }
          );
      })

      return function(){
        console.log("socket being closed");
        socket.close();
      }
    });


    var observer = Subscriber.create(function (event) {
            console.log("sending to client: ", event);
            socket.emit(event.name, event.data);
    });

    return Subject.create(observer, observable);
}
