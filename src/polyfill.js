

Function.prototype.mybind = function (context, ...args) {

    let f = this;
    function bound(...args2) {

        let self = this instanceof bound ? this : context;

        return f.apply(self, args.concat(args2));
    }
    bound.prototype = this.prototype;
    return bound;
}











Function.prototype.bind2 = function (context) {
    const self = this;
    let args = [].slice.call(1, arguments);
    function newbind(...args2) {
        return self.apply(this instanceof newbind ? this : context, args.concat(args2));
    }
    function nop() { }
    nop.prototype = this.prototype;
    newbind.prototype = new nop();
    return newbind;
}