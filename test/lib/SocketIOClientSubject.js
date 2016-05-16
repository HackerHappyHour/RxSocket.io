import {WebSocketClient} from '../../lib/SocketIOClientSubject';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/filter';
import fs from 'fs';

var url = 'http://localhost:3031';
var openObserver = new Subject();
var source = new WebSocketClient(url, openObserver);

var testFile = fs.createWriteStream('file.txt');
source.subscribe(function(x){
  console.log(x);
  testFile.write(x.data);
})
