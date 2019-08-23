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
                    fun(...args, resolve);
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
            return null;
        }
        if (isNaN(number)) {
            return null;
        }

        let result = [];
        let tmp = number + "";
        let num = number;
        let suffix = "";
        if (tmp.indexOf(".") !== -1) {
            suffix = tmp.substring(tmp.indexOf(".") + 1);
            num = parseInt(tmp.substring(0, tmp.indexOf(".")));
        }
        while (num > 0) {
            result.unshift(num % 1000);
            num = Math.floor(num / 1000);
        }
        let ret = result.join(",");
        if (suffix !== "") {
            ret += "." + suffix;
        }
        return ret;
    },
    timeEscape(timestamp = 0) {
        if (!timestamp || isNaN(timestamp)) {
            return null;
        }
        const now = new Date().getTime();
        const minute = 60 * 1000;
        const hour = minute * 60;
        const day = hour * 24;
        const week = day * 7;
        if (timestamp >= now) {
            return "error";
        }
        if (timestamp >= now - minute) {
            return "1分钟内"
        }
        if (timestamp >= now - hour) {
            let m = Math.floor((now - timestamp) / minute);
            return `${m}分钟前`;
        }
        if (timestamp >= now - day) {
            let h = Math.floor((now - timestamp) / hour);
            return `${h}小时前`;
        }
        if (timestamp >= now - week) {
            let d = Math.floor((now - timestamp) / day);
            return `${d}天前`;
        }
        return new Date(timestamp).toLocaleString();

    }

}
export {
    util
}
