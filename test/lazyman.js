import { LazyMan } from '../lib/turtle.js';

test('lazy', async t => {
    LazyMan("Hank");
});

test('eat', async t => {
    LazyMan("Hank").sleep(10).eat("dinner")
});

test('eat', async t => {
    LazyMan("Hank").eat("dinner").eat("supper");
});


test('eat', async t => {
    LazyMan("Hank").sleepFirst(5).eat("supper");
});




