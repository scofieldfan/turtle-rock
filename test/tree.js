
import { buildTree, travelMiddlerOrder } from '../lib/turtle.js';
import test from 'ava';
test('tree', t => {
    let node = buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7]);
    travelMiddlerOrder(node);
});