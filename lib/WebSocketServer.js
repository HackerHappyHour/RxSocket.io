import {Subject} from 'rxjs/Subject';
import {Subscriber} from 'rxjs/Subscriber';
import Server from 'socket.io';
import {ConnectionSubject} from './ConnectionSubject';

export function WebSocketServer(http, options) {

  var io = new Server(http, options);
  var clientConnection = new ConnectionSubject(io);
  var observable = new Subject();

  clientConnection.subscribe(function(data) {
    console.log("data", data);
  });


  var observer = Subscriber.create(function(event) {
    console.log("sending to client: ", event);
    clientConnection.next(event);
  });

  return Subject.create(observer, observable);
}
