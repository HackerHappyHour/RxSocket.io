import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {Subscriber} from 'rxjs/Subscriber';
import io from 'socket.io-client';

export function SocketIOClientSubject(config){
  var connectURL = config.url;
  var socket = io(connectURL);

  var connectionObserver = Subscriber.create(
    function(data){
      socket.emit(data);
    },
    function(){},
    function(){}
  );

  var observable = Observable.create(function(subscriber){
    socket.on('connect', function(){
      console.log("connected!", socket);
      subscriber.next(socket);
    })

    return function(){
      socket.close();
    }
  });

  return Subject.create(connectionObserver, observable);
}
