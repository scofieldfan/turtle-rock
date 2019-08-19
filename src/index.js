const util = {

    debounce(fun, delay, immediate) {
        let timer = null;
        return (...args) => {
            if (timer) {
                clearTimeout(timer);
            } else {
                timer = setTimeout(() => {
                    return fun.apply(this, args);
                }, delay);
            }
        }

    },
    throttle(fun, delay, immediate) {
        let flag = false;
        return (...args) => {
            if (!flag) {
                flag = true;
                setTimeout(() => {
                    fun.apply(this, args);
                    flag = false;
                }, delay);
            }
        }
    },
    memeorize(fun) {
        let cache = {};
        return (...args) => {
            const key = args.toString();
            if (cache[key]) {
                return cache[key];
            }
            let value = fun.apply(this, args);
            cache[key] = value;
            return value;
        }
    },
    log(fun) {
        return (...args) => {
            let start = new Date().getTime();
            const value = fun.apply(this, args)
            let end = new Date().getTime();
            console.log('invoke.. time cost:', value);
            return value;
        }
    },
    promisy(fun) {
        return (...args) => {
            return new Promise((resolve, reject) => {
                try {
                    resolve(fun.apply(this, args));
                } catch (e) {
                    reject(e);
                }
            })
        }

    },
    currying(fun) {

        function helper(fn, ...arg1) {
            let length = fn.length;
            let self = this;
            return function (...arg2) {
                let arg = arg1.concat(arg2);
                if (arg.length < length) {
                    return helper.call(self, fn, ...arg);
                }
                return fn.apply(this, arg);
            }
        }
        return helper(fun);

    },
    flatten(array) {

        /*[2,3,[2]] */
        /* [[3,4,5],[2,3],[[3,4],6]] */
        function helper(ary) {
            let ret = [];
            if (Object.prototype.toString.call(array).slice(8, -1) === "Array") {
                ary.forEach((item) => {
                    if (Object.prototype.toString.call(item).slice(8, -1) === "Array") {
                        ret = ret.concat(helper(item));
                    } else {
                        ret.push(item);
                    }
                })
            } else {
                ret.push(ary);
            }
            return ret;
        }
        return helper(array);
    },
    retryAjax(retryTimes) {

    }
}
export {
    util
}
// Function.prototype.bind = (context) => {
//     const self = this;
//     let args = [].slice.call(1, arguments);
//     function newbind(...args2) {
//         return self.apply(this instanceof newbind ? this : context, args.concat(args2));
//     }
//     function nop() { }
//     nop.prototype = this.prototype;
//     newbind.prototype = new nop();
//     return newbind;
// }