import {WebSocketClient} from '../../lib/WebSocketClient';

var url = 'http://localhost:3031';
var source = WebSocketClient(url);
source.next({name: 'thing', data: "stuff"});
source.subscribe(function(x){
  console.log("x:", x);
})
