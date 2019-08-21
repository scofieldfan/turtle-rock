class maxStack {
    constructor() {
        this.stack = [];
        this.maxStack = [];
    }
    push(item) {
        this.stack.push(item);
        if (this.maxStack.length > 0) {
            let topItem = this.maxStack[this.maxStack.length - 1];
            if (item > topItem) {
                this.maxStack.push(item);
            }
        } else {
            this.maxStack.push(item);
        }

    }

    pop() {
        let item = this.stack.pop();
        let topItem = this.maxStack[this.maxStack.length - 1];
        if (topItem === item) {
            this.maxStack.pop();
        }
        return item;
    }
    getMax() {
        return this.maxStack[this.maxStack.length - 1];
    }
}

export {
    maxStack
}