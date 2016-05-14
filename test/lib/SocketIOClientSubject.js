import {SocketIOClientSubject} from '../../lib/SocketIOClientSubject';

var config = {
  url: 'http://localhost:3031'
}
var source = new SocketIOClientSubject(config);
