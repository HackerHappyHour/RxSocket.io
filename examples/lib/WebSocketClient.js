import {WebSocketClient} from '../../lib/WebSocketClient';
import fs from 'fs';

var url = 'http://localhost:3031';
var source = WebSocketClient(url);
source.next({name: 'thing', data: "stuff"});
var testFile = fs.createWriteStream('test.file.txt');
source.subscribe(function(x){
  console.log("x:", x);
  testFile.write(x.data);
})
