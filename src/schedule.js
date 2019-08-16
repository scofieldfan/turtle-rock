export function Schedule() {
    this.tasks = [];
    this.max = 2;
    this.isRunng = false;
}

Schedule.prototype.addTask = (task) => {
    this.tasks.push(task);
    if (!this.isRunng) {
        this.isRunng = true;
        this.run();
    }
}

Schedule.prototype.run = () => {
    if (this.tasks.length === 0) {
        this.isRunng = false;
        return;
    }
    let size = this.max;
    for (let i = 0; i < size; i++) {
        let task = this.tasks.shift();
        this.max--;
        task.then((res) => {
            this.run();
            this.max++;
        }).catch((err) => {
            this.run();
            this.max++;
        })
    }
}