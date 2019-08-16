

test('event', t => {

    let eventBus = new EventBus();
    eventBus.emit('touch');
    eventBus.on('touch', () => {
        console.log('on touch....');
    })

    t.pass();
});