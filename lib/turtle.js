'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function EventBus() {
  this.eventMap = {};
}

EventBus.prototype.on = function (eventName, callback) {
  if (this.eventMap[eventName] === undefined) {
    this.eventMap[eventName] = [];
  }

  this.eventMap[eventName].push(callback);
};

EventBus.prototype.emit = function (eventName) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  var callbacks = this.eventMap[eventName];

  if (callbacks) {
    callbacks.forEach(function (callback) {
      Promise.resolve().then(function () {
        callback.apply(null, args);
      });
    });
  }
};

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

var util = {
  debounce: function debounce(fun, delay, immediate) {
    var _this = this;

    var timer = null;
    return function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (timer) {
        clearTimeout(timer);
      } else {
        timer = setTimeout(function () {
          return fun.apply(_this, args);
        }, delay);
      }
    };
  },
  throttle: function throttle(fun, delay, immediate) {
    var _this2 = this;

    var flag = false;
    return function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      if (!flag) {
        flag = true;
        setTimeout(function () {
          fun.apply(_this2, args);
          flag = false;
        }, delay);
      }
    };
  },
  memeorize: function memeorize(fun) {
    var _this3 = this;

    var cache = {};
    return function () {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      var key = args.toString();

      if (cache[key]) {
        return cache[key];
      }

      var value = fun.apply(_this3, args);
      cache[key] = value;
      return value;
    };
  },
  log: function log(fun) {
    var _this4 = this;

    return function () {
      var start = new Date().getTime();

      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      var value = fun.apply(_this4, args);
      var end = new Date().getTime();
      console.log('invoke.. time cost:', value);
      return value;
    };
  },
  promisy: function promisy(fun) {
    var _this5 = this;

    return function () {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      return new Promise(function (resolve, reject) {
        try {
          resolve(fun.apply(_this5, args));
        } catch (e) {
          reject(e);
        }
      });
    };
  },
  curry: function curry(fun) {
    function helper(fn) {
      for (var _len6 = arguments.length, arg1 = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
        arg1[_key6 - 1] = arguments[_key6];
      }

      var length = fn.length;
      var self = this;
      return function () {
        for (var _len7 = arguments.length, arg2 = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
          arg2[_key7] = arguments[_key7];
        }

        var arg = arg1.concat(arg2);

        if (arg.length < length) {
          return helper.call.apply(helper, [self, fn].concat(_toConsumableArray(arg)));
        }

        return fn.apply(this, arg);
      };
    }

    return helper(fun);
  },
  flatten: function flatten(array) {
    /*[2,3,[2]] */

    /* [[3,4,5],[2,3],[[3,4],6]] */
    function helper(ary) {
      var ret = [];

      if (Object.prototype.toString.call(array).slice(8, -1) === "Array") {
        ary.forEach(function (item) {
          if (Object.prototype.toString.call(item).slice(8, -1) === "Array") {
            ret = ret.concat(helper(item));
          } else {
            ret.push(item);
          }
        });
      } else {
        ret.push(ary);
      }

      return ret;
    }

    return helper(array);
  },
  retryAjax: function retryAjax(retryTimes) {}
};
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

function Schedule() {
  this.tasks = [];
  this.max = 2;
  this.isRunng = false;
}

Schedule.prototype.addTask = function (task) {
  this.tasks.push(task);

  if (!this.isRunng) {
    this.isRunng = true;
    this.run();
  }
};

Schedule.prototype.run = function () {
  var _this = this;

  if (this.tasks.length === 0) {
    this.isRunng = false;
    return;
  }

  var size = this.max;

  for (var i = 0; i < size; i++) {
    var task = this.tasks.shift();
    this.max--;
    task.then(function (res) {
      _this.run();

      _this.max++;
    })["catch"](function (err) {
      _this.run();

      _this.max++;
    });
  }
};

exports.EventBus = EventBus;
exports.Schedule = Schedule;
exports.util = util;
