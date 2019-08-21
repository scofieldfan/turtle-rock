

const isInstanceOf = (obj, fun) => {
    if (obj === null || obj.__proto__ === null) {
        return false;
    }
    if (obj.__proto__ === fun.prototype) {
        return true;
    }
    return isInstanceOf(obj.__proto__, fun);
}
const curry = (fun, ...args) => {
    if (fun.length <= args.length) {
        return fun.apply(null, args);
    } else {
        return function (...args1) {
            return curry(fun, ...args, ...args1);
        }
    }
}
const deepClone = (obj) => {
    if (typeof obj === 'object') {
        let cloneObj = null;
        if (Array.isArray(obj)) {
            cloneObj = [];
            for (let i = 0; i < obj.length; i++) {
                cloneObj[i] = deepClone(obj[i]);
            }
        } else {
            cloneObj = {};
            for (key in obj) {
                cloneObj[key] = deepClone(obj[key]);
            }
        }
        return cloneObj;
    }
    return obj;

}
export {
    isInstanceOf,
    curry
}