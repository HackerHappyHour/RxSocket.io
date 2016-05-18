import {Subject} from 'rxjs/Subject';
import {Subscriber} from 'rxjs/Subscriber';
import {Observable} from 'rxjs/Observable';
import Server from 'socket.io';
import {ConnectionSubject} from './ConnectionSubject';

export function WebSocketServer(http, options) {

    var io = new Server(http, options);
    var clientConnection = new ConnectionSubject(io);
    var observable = new Subject();

    clientConnection.subscribe(function(socket){
      socket.on("thing", function(data){
        console.log("thing: ", data);
      })
    });


    var observer = Subscriber.create(function (event) {
            console.log("sending to client: ", event);
            clientConnection.next(event);
    });

    return Subject.create(observer, observable);
}
