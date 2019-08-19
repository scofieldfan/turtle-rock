import { LazyManAsync } from '../lib/turtle.js';
import test from 'ava';

test('lazy', t => {
    LazyManAsync("Hank");
    t.pass();
});

test('lazy1', t => {
    LazyManAsync("Hank").sleep(10).eat("dinner")
    t.pass();
});

test('lazy2', t => {
    // LazyManAsync("Hank").eat("dinner").eat("supper");
    t.pass();
});


test('lazy3', t => {
    //LazyManAsync("Hank").sleepFirst(5).eat("supper");
    t.pass();
});




