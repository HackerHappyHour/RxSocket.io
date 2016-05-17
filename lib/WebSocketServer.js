import {Subject} from 'rxjs/Subject';
import {Subscriber} from 'rxjs/Subscriber';
import {Observable} from 'rxjs/Observable';
import Server from 'socket.io';
import {SocketPacketSubject} from './SocketPacketSubject';

export function WebSocketServer(http, options) {

    var io = new Server(http, options);
    var clientConnection = new ConnectionSubject(io);



    var observer = Subscriber.create(function (event) {
            console.log("sending to client: ", event);
            socket.emit(event.name, event.data);
    });

    return Subject.create(observer, observable);
}
