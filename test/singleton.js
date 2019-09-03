import { Singleton } from "../lib/turtle.js";
import test from "ava";

test("singleton", t => {
    let a = Singleton.getInstance();
    let b = Singleton.getInstance();
    t.is(a, b);
});
