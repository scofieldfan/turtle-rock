export function EventBus() {
    this.eventMap = {};
}
EventBus.prototype.on = function (eventName, callback) {

    if (this.eventMap[eventName] === undefined) {
        this.eventMap[eventName] = [];
    }
    this.eventMap[eventName].push(callback);
}

EventBus.prototype.emit = function (eventName, ...args) {
    let callbacks = this.eventMap[eventName];
    if (callbacks) {
        callbacks.forEach((callback) => {
            Promise.resolve().then(() => {
                callback.apply(null, args);
            })
        })
    }

}