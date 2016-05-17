import {Subject} from 'rxjs/Subject';
import {Subscriber} from 'rxjs/Subscriber';
import {Observable} from 'rxjs/Observable';

exports.ConnectionSubject = function(io){

  var observable = Observable.create(function(subscriber){
      io.on('connection', function(socket){
        subscriber.next(socket);

        socket.io.on('packet', function(packet){
          console.log('packet: ', packet);
        });

        socket.on('disconnect', function(){
          subscriber.complete();
        })
      })

      return function(){
        socket.close();
      }
  })

  var observer = Subscriber.create(function(x){
    console.log('ConnectionSubjectSubscriber::next', x);
  });
  
  return Subject.create(observer, observable)
}
