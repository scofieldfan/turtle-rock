Function.prototype.bind2 = (context) => {
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