import test from 'tape';
import {WebSocketServer} from '../lib/WebSocketServer';
import {WebSocketClient} from '../lib/WebSocketClient';

test('public API functions exist', function(t){
    t.plan(2);

    t.ok(WebSocketClient, 'WebSocketClient loads');
    t.ok(WebSocketServer, 'WebSocketServer loads');
});
