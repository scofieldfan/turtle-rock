Function.prototype.mybind = function(context, ...args) {
    let fun = this;
    function bound(...args2) {
        let self = this instanceof bound ? this : context;

        return fun.apply(self, args.concat(args2));
    }
    bound.prototype = Object.create(fun.prototype);
    return bound;
};

Function.prototype.mycall = function(context, ...args) {
    context.fun = this;
    return context.fun(...args);
};
Function.prototype.myapply = function(context, args) {
    context.fun = this;
    return context.fun(...args);
};
function isInstanceOf(child, fun) {
    if (typeof fun !== "function") {
        throw new TypeError("arg2 fun is not a function");
    }
    if (child === null) {
        return false;
    }
    if (child.__proto__ !== fun.prototype) {
        return isInstanceOf(child.__proto__, fun);
    }
    return true;
}
function myNew(fun, ...arg) {
    if (typeof fun !== "function") {
        throw new TypeError(" fun is not a function");
    }
    let obj = {};
    Object.setPrototypeOf(obj, fun.prototype);
    fun.apply(obj, arg);
    return obj;
}
function myExtends(parent, child) {
    function nop() {}
    nop.prototype = parent.prototype;
    child.prototype = new nop();
}
const emca = {
    isInstanceOf,
    myNew,
    myExtends
};
export { emca };
