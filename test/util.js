import test from "ava";
import { util } from "../lib/turtle.js";

console.log(util);
test("test", t => {
    function foo(arg) {
        console.log("arg:", arg);
        return arg;
    }
    const defoo = util.debounce(foo, 100);
    defoo("hi1");
    defoo("hi2");
    defoo("hi3");
    t.pass();
});

test("curry1", t => {
    function add(a, b) {
        return a + b;
    }
    let curryadd = util.currying(add);
    let add1 = curryadd(1);

    t.is(add1(2), 3);
    t.is(add1(5), 6);
    t.is(add1(6), 7);
});

test("formatNumber", t => {
    t.is(util.formatNumber(undefined), null);
    t.is(util.formatNumber(null), null);
    t.is(util.formatNumber(parseInt("a")), null);
    t.is(util.formatNumber(123456), "123,456");
    t.is(util.formatNumber(1234565.784), "1,234,565.784");
});

test("timeEscape", t => {
    t.is(util.timeEscape(undefined), null);
    t.is(util.timeEscape(null), null);
    t.is(util.timeEscape(parseInt("a")), null);
    let lastMinute = new Date();
    t.is(util.timeEscape(lastMinute.getTime() - 10000), "1分钟内");

    let lastHour = new Date();
    t.is(util.timeEscape(lastHour.getTime() - 1000 * 3600 * 5), "5小时前");

    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    t.is(util.timeEscape(yesterday.getTime()), "1天前");
    let lastweek = new Date();
    lastweek.setDate(lastweek.getDate() - 3);
    t.is(util.timeEscape(lastweek.getTime()), "3天前");
});
