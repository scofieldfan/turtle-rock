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
function fromateNum() {}
function parseValue(str) {
    if (str === "undefined") {
        return undefined;
    }
    if (str === "null") {
        return null;
    }
    if (str === "true") {
        return true;
    }
    if (str === "false") {
        return false;
    }

    if (str[0] === "{") {
        return JSONParse(str);
    }
    if (str.indexOf(".") !== -1) {
        let value = parseFloat(str);
        if (!isNaN(value)) {
            return value;
        }
    }
    let value = parseInt(str);
    if (!isNaN(value)) {
        return value;
    }
    return str;
}
function JSONParse(strs) {
    if (strs === "" || typeof strs !== "string") {
        throw new SyntaxError("JSONParse error");
    }
    if (strs[0] === "{") {
        let obj = {};
        if (strs[strs.length - 1] == "}") {
            let fields = strs.substring(1, strs.length - 1).split(",");
            for (let field of fields) {
                let index = field.indexOf(":");
                let temp = [];
                if (index !== -1) {
                    temp[0] = field.substring(0, index);
                    temp[1] = field.substring(index + 1, field.length);
                }
                let key = temp[0].substring(1, temp[0].length - 1);
                let value = parseValue(temp[1]);
                //if (value !== undefined) {
                obj[key] = value;
                //}
            }
        }
        return obj;
    }
    if (strs[0] === "[") {
        if (strs[strs.length - 1] == "]") {
            let result = [];
            let fields = strs.substring(1, strs.length - 1).split(",");
            for (let field of fields) {
                result.push(parseValue(field));
            }
            return result;
        }
    }
}
function JSONStringify(obj) {
    if (
        obj === undefined ||
        obj === null ||
        typeof obj === "string" ||
        typeof obj === "boolean" ||
        typeof obj === "number"
    ) {
        return obj;
    }
    if (typeof obj === "function") {
        return "";
    }
    if (Array.isArray(obj)) {
        let result = [];
        for (let i = 0; i < obj.length; i++) {
            result.push(JSONStringify(obj[i]));
        }
        return "[" + result.join(",") + "]";
    } else {
        let result = [];
        for (let key in obj) {
            result.push(`"${key}":${JSONStringify(obj[key])}`);
        }
        return "{" + result.join(",") + "}";
    }
}
const emca = {
    isInstanceOf,
    JSONParse,
    JSONStringify,
    myNew,
    myExtends
};
export { emca };
