export function LazyMan(name) {
    return new LazyManFactory(name);
}

function LazyManFactory(name) {

    this.name = name;
    this.flag = false;
    this.tasks = [];
    this.tasks.push(() => {
        console.log('hi,', this.name);
        this.next();
    });
    setTimeout(() => {
        this.next();
    }, 0)
}

LazyManFactory.prototype.eat = function (sth) {
    this.tasks.push(() => {
        console.log(this.name, ' eat dinner');
        this.next();
    });
    return this;
}
LazyManFactory.prototype.next = function () {
    let fn = this.tasks.shift();
    fn && fn();
}
LazyManFactory.prototype.sleep = function (delay) {

    this.tasks.push(() => {
        setTimeout(() => {
            this.next();
        }, delay * 1000);
    });

    return this;
}
LazyManFactory.prototype.sleepFirst = function (delay) {
    this.tasks.unshift(() => {
        setTimeout(() => {
            this.next();
        }, delay * 1000);
    });

    return this;
}