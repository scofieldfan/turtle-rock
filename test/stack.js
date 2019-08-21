
import { maxStack } from '../lib/turtle.js';
import test from 'ava';
test('stack', t => {

    let myStack = new maxStack();
    myStack.push(2);
    t.is(myStack.getMax(), 2);
    myStack.push(3);
    myStack.push(1);
    t.is(myStack.getMax(), 3);
    myStack.push(4);
    t.is(myStack.getMax(), 4);
    myStack.push(6);
    t.is(myStack.getMax(), 6);
    myStack.pop();
    t.is(myStack.getMax(), 4);
    myStack.pop();
    t.is(myStack.getMax(), 3);
    myStack.pop();
    t.is(myStack.getMax(), 3);
});