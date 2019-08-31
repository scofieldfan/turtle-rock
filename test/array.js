import { array } from "../lib/turtle.js";
import test from "ava";

test("binarysearch", t => {
    let ary = [0, 1, 5, 6, 10, 12, 13, 14, 15, 16, 20, 22, 24, 25];
    t.is(array.binarySearch(ary, 2), -1);
    t.is(array.binarySearch(ary, 0), 0);
    t.is(array.binarySearch(ary, 25), ary.length - 1);
    t.is(array.binarySearch(ary, 13), 6);
    const error = t.throws(() => {
        array.binarySearch(null, 13);
    }, TypeError);
    t.is(error.message, "arg1 is not a array");
});

test("flattern1", t => {
    let arys = [1, 2, [3]];
    let result = array.flatten(arys);
    t.deepEqual(result, [1, 2, 3]);
});

test("flattern2", t => {
    let arys = [1, 2, [3], [5, [6, 7]]];
    let result = array.flatten(arys);
    t.deepEqual(result, [1, 2, 3, 5, 6, 7]);
});

test("flattern3", t => {
    let arys = [1, 2, [3], [5, [6, 7, [8, 9, 10]]]];
    let result = array.flatten(arys);
    t.deepEqual(result, [1, 2, 3, 5, 6, 7, 8, 9, 10]);
});

test("qsort1", t => {
    let arys = [2, 1, 3];
    array.quickSort(arys);
    t.deepEqual(arys, [1, 2, 3]);
});
test("qsort2", t => {
    let arys = [2, 1, 3, -1];
    array.quickSort(arys);
    t.deepEqual(arys, [-1, 1, 2, 3]);
});
test("qsort3", t => {
    let arys = [2, 1, 3, -1, -1, -1];
    array.quickSort(arys);
    t.deepEqual(arys, [-1, -1, -1, 1, 2, 3]);
});
test("twosum", t => {
    let arys = [2, 1, 3, -1, -1, -1];
    t.deepEqual(array.twoSum(arys, 5), [0, 2]);
});
test("twosum1", t => {
    let arys = [2, 1, 3, -1, -1, -1];
    t.deepEqual(array.twoSum(arys, 3), [0, 1]);
});
test("twosum2", t => {
    let arys = [2, 1, 3, -1, -1, -1];
    t.deepEqual(array.twoSum(arys, 100), []);
});
