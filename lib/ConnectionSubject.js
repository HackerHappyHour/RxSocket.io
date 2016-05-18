import {Subject} from 'rxjs/Subject';
import {Subscriber} from 'rxjs/Subscriber';
import {Observable} from 'rxjs/Observable';
import {Decoder} from 'socket.io-parser';

exports.ConnectionSubject = function(io){
  var packetDecoder = new Decoder();
  var observable = Observable.create(function(subscriber){
      io.on('connection', function(socket){
        socket.client.conn.on('packet', function(packet){
          if(packet.type === 'message'){
            packetDecoder.add(packet.data);
          }
        });
        packetDecoder.on('decoded', function(packet){
          subscriber.next(packet);
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
