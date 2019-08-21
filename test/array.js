import { array } from '../lib/turtle.js';
import test from 'ava';

test('array', t => {


    let ary = [2, 3, 1, -1, 0, 4];
    t.deepEqual(array.threeSum(ary, 0), [-1, 0, 1]);
    t.deepEqual(array.threeSum(ary, 5), [0, 1, 4]);
    t.deepEqual(array.threeSum(ary, 9), [2, 3, 4]);
});