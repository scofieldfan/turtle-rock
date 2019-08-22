
import { MyPromise } from '../lib/turtle.js';

import test from 'ava';


test('promise', t => {
    t.timeout(2000);
    new MyPromise((resolve, reject) => {
        console.log("new promise....");
        setTimeout(() => {
            console.log("new promise settimeout....");
            resolve(1);
        }, 1000)
    }).then((res) => {
        console.log("MyPromise then:", res);

        t.is(res, 1);
    })

});