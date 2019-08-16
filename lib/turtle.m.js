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
      callback.apply(null, args);
    });
  }
};

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

var _this = undefined;

function Schedule() {
  this.tasks = [];
  this.max = 2;
  this.isRunng = false;
}

Schedule.prototype.addTask = function (task) {
  _this.tasks.push(task);

  if (!_this.isRunng) {
    _this.isRunng = true;

    _this.run();
  }
};

Schedule.prototype.run = function () {
  if (_this.tasks.length === 0) {
    _this.isRunng = false;
    return;
  }

  var size = _this.max;

  for (var i = 0; i < size; i++) {
    var task = _this.tasks.shift();

    _this.max--;
    task.then(function (res) {
      _this.run();

      _this.max++;
    })["catch"](function (err) {
      _this.run();

      _this.max++;
    });
  }
};

export { EventBus, Schedule, util };
