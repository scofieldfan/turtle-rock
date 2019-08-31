import { MyPromise } from "../lib/turtle.js";

import test from "ava";

test.cb("promise", t => {
    t.plan(2);
    new MyPromise((resolve, reject) => {
        setTimeout(() => {
            resolve(1);
        }, 1000);
    })
        .then(res => {
            t.is(res, 1);
            return 5;
        })
        .then(res => {
            t.is(res, 5);
            t.end();
        });
});
