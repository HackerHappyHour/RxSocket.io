import {WebSocketClient} from '../../lib/SocketIOClientSubject';
import {Subject} from 'rxjs/Subject';

var url = 'http://localhost:3031';
var openObserver = new Subject();
var source = new WebSocketClient(url, openObserver);

source.subscribe(function(x){
  console.log("x: ", x);
})

source.next();
