import {Subject} from 'rxjs/Subject';
import {Subscriber} from 'rxjs/Subscriber';
import {Observable} from 'rxjs/Observable';

exports.ConnectionSubject = function(io){

  var observable = Observable.create(function(subscriber){
      io.on('connection', function(socket){
        subscriber.next(socket);

        socket.on('thing', function(data){
          console.log('thing received: ', data);
        })
      })

      return function(){
        console.log("client disconnected");
      }
  })

  var observer = Subscriber.create(function(x){
    console.log('ConnectionSubjectSubscriber::next', x);
  });

  return Subject.create(observer, observable)
}
