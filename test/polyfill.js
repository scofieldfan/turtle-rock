import * as pf from '../src/polyfill';
import test from 'ava';

test('bind', t => {


    function add(a, b) {
        return this.m + a + b;
    }
    let bindAdd = add.mybind({ m: 2 }, 3, 4);
    t.is(bindAdd(), 9);

    let b = { m: 3 };
    let bindAdd2 = add.mybind(b);
    t.is(bindAdd2(3, 4), 10);
});