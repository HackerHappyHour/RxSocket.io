import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {Subscriber} from 'rxjs/Subscriber';
import 'rxjs/add/operator/share';
import io from 'socket.io-client';

export function SocketIOClientSubject(config){
  var connectURL = config.url;
  var socket = io(connectURL);

  var subscriber = Subscriber.create(function(eventName, data){
      socket.emit(eventName, data);
  });

  var observable = Observable.create((obs) => {
    socket.on('connect', function(){
      subscriber.next(socket);
    })
  }).share();

  return Subject.create(subscriber, observable);
}
