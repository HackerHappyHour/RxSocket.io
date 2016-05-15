import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {Subscriber} from 'rxjs/Subscriber';
import io from 'socket.io-client';

export function WebSocketClient(address, openObserver) {
    var socket = io(address);
    // Handle the data
    var observable = Observable.create (function (obs) {
        if (openObserver) {
            socket.on('connect', function () {
                openObserver.next();
                openObserver.complete();
            });
        }

        // Handle messages
        socket.io.on('packet', function (packet) {
            if (packet.data) obs.next({
                name: packet.data[0],
                data: packet.data[1]
            });
        });
        socket.on('error', function (err) { obs.error(err); });
        socket.on('reconnect_error', function (err) { obs.error(err); });
        socket.on('reconnect_failed', function () { obs.error(new Error('reconnection failed')); });
        socket.io.on('close', function () { obs.complete(); });

        // Return way to unsubscribe
        return function() {
            socket.close();
        };
    });

    var observer = Subscriber.create(function (event) {
            console.log("sending to server: ", event);
            socket.emit(event.name, event.data);
    });

    return Subject.create(observer, observable);
}
