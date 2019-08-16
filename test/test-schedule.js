test('bar', async t => {
    const bar = Promise.resolve('bar');
    t.is(await bar, 'bar');
});