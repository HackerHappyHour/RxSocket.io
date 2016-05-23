var {WebSocketClient} = require('../../dist/WebSocketClient');
var filter = require('rxjs/add/operator/filter');

var url = 'http://localhost:3031';
var source = WebSocketClient(url).filter(() => 'testing');
source.next({name: 'thing', data: "stuff"});
source.subscribe(function(x){
  console.log("x:", x);
})
