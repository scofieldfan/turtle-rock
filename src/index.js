const util = {

    debounce(fun, delay, immediate) {
        let timer = null;
        return (...args) => {
            if (timer) {
                clearTimeout(timer);
            } else {
                timer = setTimeout(() => {
                    fun.apply(this, args);
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
    timer(minute, second) {


        let timer = setInterval(() => {
            if (minute === 0 && second === 0) {
                clearInterval(timer);
            } else {
                if (second <= 0) {
                    second = 60;
                    minute--;
                }
                second--;
                console.log(`${minute}:${second}`);
            }

        }, 1000);
    },
    formatNumber(number) {
        if (typeof number !== "number") {
            return false;
        }
        if (!isNaN(number)) {
            return;
        }
        let result = [];
        while (number != 0) {
            result.unshift(number % 1000);
            number = Math.floor(number / 1000);
        }
        return result.join(",");

    }

}
export {
    util
}
