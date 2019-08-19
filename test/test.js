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

test('flattern', t => {
    let case1 = [1, 2, [3]];
    let result = util.flatten(case1);
    t.deepEqual(result, [1, 2, 3]);
});

test('flattern2', t => {
    let case1 = [1, 2, [3], [5, [6, 7]]];
    let result = util.flatten(case1);
    t.deepEqual(result, [1, 2, 3, 5, 6, 7]);
});

test('flattern3', t => {
    let case1 = [1, 2, [3], [5, [6, 7, [8, 9, 10]]]];
    let result = util.flatten(case1);
    t.deepEqual(result, [1, 2, 3, 5, 6, 7, 8, 9, 10]);
});


test('test3', async t => {
    const bar = Promise.resolve('bar');
    t.is(await bar, 'bar');
});

test('bar2', async t => {
    const bar = Promise.resolve('bar');
    t.is(await bar, 'bar');
});

