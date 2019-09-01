/**
 * initialize your data structure here.
 */
var MinStack = function() {
    this.stack = [];
    this.minstack = [Number.MAX_VALUE];
};

/**
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
    this.stack.push(x);
    let min = this.minstack[this.minstack.length - 1];
    if (x <= min) {
        this.minstack.push(x);
    }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    let value = this.stack.pop();
    if (value === this.minstack[this.minstack.length - 1]) {
        this.minstack.pop();
    }
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    return this.stack[this.stack.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    return this.minstack[this.minstack.length - 1];
};
