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

test.cb("promise2", t => {
    t.plan(1);
    new MyPromise((resolve, reject) => {
        setTimeout(() => {
            reject(1);
        }, 1000);
    }).then(
        res => {},
        error => {
            t.is(error, 1);
            t.end();
        }
    );
});

test.cb("promise3", t => {
    t.plan(1);
    new MyPromise((resolve, reject) => {
        resolve(1);
    }).then(
        res => {
            t.is(res, 1);
            t.end();
        },
        error => {}
    );
});
test.cb("promise3.1", t => {
    t.plan(2);
    new MyPromise((resolve, reject) => {
        resolve(1);
    })
        .then(res => {
            t.is(res, 1);
            return 2;
        })
        .then(res => {
            t.is(res, 2);
            t.end();
        });
});

test.cb("promise4", t => {
    t.plan(1);
    new MyPromise((resolve, reject) => {
        reject(1);
    }).then(
        res => {},
        error => {
            t.is(error, 1);
            t.end();
        }
    );
});
test.cb("promise4.1", t => {
    t.plan(2);
    new MyPromise((resolve, reject) => {
        reject(1);
    })
        .then(
            res => {},
            error => {
                t.is(error, 1);
                return 2;
            }
        )
        .then(res => {
            t.is(res, 2);
            t.end();
        });
});

test.cb("promise5", t => {
    t.plan(1);
    new MyPromise((resolve, reject) => {
        resolve(1);
    }).then(
        res => {
            t.is(res, 1);
            t.end();
        },
        error => {}
    );
});

test.cb("promise6", t => {
    t.plan(2);
    new MyPromise(function(resolve, reject) {
        setTimeout(function() {
            reject("fail");
        }, 2000);
    })
        .then(
            success => {},
            error => {
                t.is(error, "fail");
                return error;
            }
        )
        .then(success => {
            t.is(success, "fail");
            t.end();
        });
});
test.cb("promise7", t => {
    t.plan(2);
    new MyPromise(function(resolve, reject) {
        setTimeout(function() {
            resolve("success");
        }, 2000);
    })
        .then(success => {
            t.is(success, "success");
            return success;
        })
        .then(success => {
            t.is(success, "success");
            t.end();
        });
});
