
export function LazyManAsync(name) {
    return new LazyManFactory(name);
}

function LazyManFactory(name) {

    this.tasks = [];
    this.tasks.push(() => {
        return new Promise((resolve, reject) => {
            console.log("hi", name);
            resolve();
        })
    });
    setTimeout(() => {
        this.run();
    }, 0);

}

LazyManFactory.prototype.run = function () {

    if (this.tasks.length === 0) {
        return;
    }
    let task = this.tasks.shift();

    task().then(() => {
        this.run();
    }).catch(() => {
        this.run();
    })
}

LazyManFactory.prototype.sleep = function (time) {
    this.tasks.push(() => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, time * 1000)
        })
    })
    return this;
}


LazyManFactory.prototype.eat = function (name) {
    this.tasks.push(() => {
        return new Promise((resolve, reject) => {
            console.log("eat:", name);
            resolve();
        })
    })
    return this;
}


LazyManFactory.prototype.sleepFirst = function (time) {
    this.tasks.unshift(() => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, time * 1000)
        })
    })
    return this;
}