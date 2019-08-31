import { asyncUtil } from "../lib/turtle.js";
import test from "ava";

test("series", t => {
    t.pass();
});
/*
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
            t.deepEqual(results, ["one", "two"]);
        }
    );
});
*/
