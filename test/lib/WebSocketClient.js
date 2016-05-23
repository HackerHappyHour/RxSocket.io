import test from 'tape';
import {WebSocketClient} from '../lib/WebSocketClient';


test('WebSocketClient', assert => {
    const actual = typeof WebSocketClient.subscribe;
    const expected = 'function';

    assert.equal(actual, expected, 'WebSocketClient.subscribe should return a function');
    assert.end();
});
// it should have a subscribe function
// it should receive packets

// it should have an
