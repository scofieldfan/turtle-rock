import { DomUtil } from "../lib/turtle.js";
import test from "ava";

test("replace", t => {
    let str = DomUtil.template("a {test}", { test: 1 });
    t.is(str, "a 1");
});
