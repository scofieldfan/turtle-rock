import { isInstanceOf, curry } from '../lib/turtle.js';
import test from 'ava';


test('structorcase1', t => {
    function C() { }
    function D() { }

    var o = new C();
    t.is(isInstanceOf(o, C), true);
    t.is(isInstanceOf(o, D), false);
    t.is(isInstanceOf(o, Object), true);
    t.is(isInstanceOf(C.prototype, Object), true);

    D.prototype = new C();
    //D.prototype.constructor = D;
    var o3 = new D();
    t.is(isInstanceOf(o3, C), true);
    t.is(isInstanceOf(o3, D), true);
});

test('curry', t => {
    function add(a, b, c) { return a + b + c };
    let curryAdd = curry(add);
    let add1 = curryAdd(1);
    t.is(add1(2, 3), 6);
    t.is(add1(2)(3), 6);
});

