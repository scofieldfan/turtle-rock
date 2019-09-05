import { genUtil } from "../lib/turtle.js";
import test from "ava";

console.log("gen-util.....");
test.cb("gen-util", t => {
    // t.plan(1);
    console.log("gen-util.....");
    let a = genUtil.genF(1);
    let b = a.next();
    t.is(b.value, 3);
    t.is(a.next().done, true);
    setTimeout(() => {
        let a = 5;
        t.is(a, 5);
        t.end();
    }, 100);
});
