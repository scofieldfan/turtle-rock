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
    flatten() {

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