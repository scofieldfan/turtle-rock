import test from 'ava';
import { util, EventBus, schedule } from '../lib/turtle.js';

test('test', t => {

    function foo(arg) { console.log("arg:", arg); return arg };
    const defoo = util.debounce(foo, 100);
    defoo("hi1");
    defoo("hi2");
    defoo("hi3");
    t.pass();
});




test('bar2', async t => {
    const bar = Promise.resolve('bar');
    t.is(await bar, 'bar');
});

test('bar2', async t => {
    const bar = Promise.resolve('bar');
    t.is(await bar, 'bar');
});

