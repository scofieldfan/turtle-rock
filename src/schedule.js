export function Schedule() {
    this.tasks = [];
    this.max = 2;
    setTimeout(() => {
        this.run();
    }, 0)
}

Schedule.prototype.addTask = function (task) {
    this.tasks.push(task);

}

Schedule.prototype.run = function () {
    if (this.tasks.length === 0) {
        return;
    }
    let size = Math.min(this.max, this.tasks.length);
    for (let i = 0; i < size; i++) {
        let task = this.tasks.shift();
        this.max--;
        task().then((res) => {
            this.max++;
            this.run();
        }).catch((err) => {
            this.max++;
            this.run();
        })
    }
}