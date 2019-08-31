import { emca } from "../lib/turtle.js";
import test from "ava";

test("bind", t => {
    function add(a, b) {
        return this.m + a + b;
    }
    let bindAdd = add.mybind({ m: 2 }, 3, 4);
    t.is(bindAdd(), 9);

    let b = { m: 3 };
    let bindAdd2 = add.mybind(b);
    t.is(bindAdd2(3, 4), 10);
});

test("call", t => {
    function add(a, b) {
        return this.m + a + b;
    }
    let obj = {
        m: 1
    };
    t.is(add.mycall(obj, 2, 3), 6);
});

test("apply", t => {
    function add(a, b) {
        return this.m + a + b;
    }
    let obj = {
        m: 1
    };
    t.is(add.myapply(obj, [2, 3]), 6);
});

test("instanceOf", t => {
    function C() {}
    function D() {}
    const isInstanceOf = emca.isInstanceOf;
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

test("myNew", t => {
    function C() {
        this.name = "hello";
    }
    let o = emca.myNew(C);
    t.is(o.name, "hello");
    t.is(o.__proto__, C.prototype);
});

test("myExtends", t => {
    function C() {
        this.name = "hello";
    }
    let o = emca.myNew(C);
    t.is(o.name, "hello");
    t.is(o.__proto__, C.prototype);
});

test("JSONStringify1", t => {
    let obj = { a: 1 };
    t.is(emca.JSONStringify(obj), '{"a":1}');
});
test("JSONStringify2", t => {
    let obj = { a: 1, b: true, c: false, foo: null, bar: [1, 2, 3] };
    t.is(
        emca.JSONStringify(obj),
        '{"a":1,"b":true,"c":false,"foo":null,"bar":[1,2,3]}'
    );
});
test("JSONStringify3", t => {
    let obj = { a: 1, bar: [1, 2, 3], o: { a: { c: 1 } } };
    t.is(emca.JSONStringify(obj), '{"a":1,"bar":[1,2,3],"o":{"a":{"c":1}}}');
});

test("JSONParse", t => {
    t.deepEqual(emca.JSONParse('{"a":1}'), { a: 1 });
    t.deepEqual(emca.JSONParse('{"a":null,"c":{"d":1}}'), {
        a: null,
        c: { d: 1 }
    });
    t.deepEqual(emca.JSONParse('{"a":null,"foo":true,"bar":100,"c":{"d":1}}'), {
        a: null,
        foo: true,
        bar: 100,
        c: { d: 1 }
    });
});
