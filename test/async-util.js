import { asyncUtil } from "../lib/turtle.js";
import test from "ava";

test("series", t => {
    asyncUtil.series(
        [
            function(callback) {
                callback(null, "one");
            },
            function(callback) {
                callback(null, "two");
            }
        ],
        function(results) {
            console.log(" test series", results);
            t.deepEqual(results, ["one", "two"]);
        }
    );
});
test("sleep", t => {
    asyncUtil.sleep(1000).then(() => {
        t.pass();
    });
    //asyncUtil.sendParallel(["http://www.baidu.com", "http://www.sogou.com"], 2);
});
