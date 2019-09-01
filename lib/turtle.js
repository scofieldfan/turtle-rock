'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var flatten = function flatten(ary) {
  var result = [];

  if (Object.prototype.toString.call(ary).slice(8, -1) === "Array") {
    ary.forEach(function (item) {
      if (Object.prototype.toString.call(item).slice(8, -1) === "Array") {
        result = result.concat(flatten(item));
      } else {
        result.push(item);
      }
    });
  } else {
    result.push(ary);
  }

  return result;
};

var flush = function flush() {
  var num = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  for (var i = 0; i < num.length; i++) {
    var index = Math.floor(Math.random() * (num.length - 1));
    var temp = num[i];
    num[i] = num[index];
    num[index] = temp;
  }
};

var binarySearch = function binarySearch(ary, target) {
  if (!Array.isArray(ary)) {
    throw new TypeError("arg1 is not a array");
  }

  var start = 0,
      end = ary.length - 1;

  while (start <= end) {
    var mid = Math.floor(start + (end - start) / 2);

    if (ary[mid] === target) {
      return mid;
    } else if (ary[mid] < target) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  return -1;
};

var quickSort = function quickSort() {
  var ary = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ary.length - 1;

  if (!Array.isArray(ary)) {
    throw new TypeError("arg1 is not a array");
  }

  if (start >= end || isNaN(start) || isNaN(end)) {
    return;
  }

  var index = partition(start, end);
  quickSort(ary, start, index - 1);
  quickSort(ary, index + 1, end);

  function partition(left, right) {
    var priviot = ary[right];
    var k = left - 1;

    for (var i = left; i <= right - 1; i++) {
      if (ary[i] <= priviot) {
        swap(++k, i);
      }
    }

    swap(++k, right);
    return k;
  }

  function swap(i, j) {
    var temp = ary[i];
    ary[i] = ary[j];
    ary[j] = temp;
  }
};

var twoSum = function twoSum(arys, target) {
  if (!Array.isArray(arys)) {
    throw new TypeError("arg1 is not a array");
  }

  var map = new Map();

  for (var i = 0; i < arys.length; i++) {
    var num = target - arys[i];

    if (map.get(num) !== undefined) {
      return [map.get(num), i];
    }

    map.set(arys[i], i);
  }

  return [];
};

var array = {
  flatten: flatten,
  binarySearch: binarySearch,
  flush: flush,
  quickSort: quickSort,
  twoSum: twoSum
};

function series(tasks, callback) {
  var result = [];

  for (var i = 0; i < tasks.length; i++) {
    tasks[i](function (context, ret) {
      result.push(ret);
    });
  }

  callback(result);
}

function sleep(time) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve();
    }, time);
  });
}

function retryAjax(url) {
  var num = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  if (num <= 0) {
    return Promise.reject(err);
  } else {
    return fetch(url).then(function (res) {
      return res;
    })["catch"](function (err) {
      return retryAjax(url, num - 1);
    });
  }
}

function myRequest(url, method, params) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);

    xhr.onreadystatechange = function () {
      if (xhr.readyState != 4) {
        return;
      }

      if (xhr.state === 200) {
        resolve(xhr.response);
      }
    };

    xhr.addEventListener("error", function (e) {
      reject(error);
    });
    xhr.send(params);
  });
}

function cacheRequest(url) {
  var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "get";
  var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var key = url + method + JSON.stringify(params);
  var cache = {};

  function send() {
    if (cache[key]) {
      return Promise.resolve(cache[key]);
    }

    var request = new Request(url);
    var init = {
      method: method
    };
    return fetch(request, init).then(function (res) {
      cache[key] = res;
      return res;
    })["catch"](function (error) {
      cache[key] = error;
      return error;
    });
  }

  return send;
}

function sendParallel() {
  var urls = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var num = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  var size = Math.min(urls.length, num);

  for (var i = 0; i < size; i++) {
    var url = urls.shift();
    num--;
    fetch(url).then(function (res) {
      sendParallel(urls, num + 1);
    })["catch"](function (error) {
      sendParallel(urls, num + 1);
    });
  }
}

var asyncUtil = {
  series: series,
  retryAjax: retryAjax,
  myRequest: myRequest,
  cacheRequest: cacheRequest,
  sendParallel: sendParallel,
  sleep: sleep
};

function template(tpl, obj) {
  return tpl.replace(/\{(\w+)\}/g, function (word, key) {
    return obj[key];
  });
}

var DomUtil = {
  getElementsNum: function getElementsNum() {
    var set = new Set();

    function helper(childNodes) {
      if (!childNodes || childNodes.length === 0) {
        return;
      }

      var nodes = [].slice.call(childNodes);
      nodes.filter(function (node) {
        return node.nodeType === 1;
      }).forEach(function (node) {
        set.add(node.nodeName.toLowerCase());
        helper(node.childNodes);
      });
    }

    helper(document.childNodes);
    return set;
  },
  template: template
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

Function.prototype.mybind = function (context) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  var fun = this;

  function bound() {
    var self = this instanceof bound ? this : context;

    for (var _len2 = arguments.length, args2 = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args2[_key2] = arguments[_key2];
    }

    return fun.apply(self, args.concat(args2));
  }

  bound.prototype = Object.create(fun.prototype);
  return bound;
};

Function.prototype.mycall = function (context) {
  context.fun = this;

  for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }

  return context.fun.apply(context, args);
};

Function.prototype.myapply = function (context, args) {
  context.fun = this;
  return context.fun.apply(context, _toConsumableArray(args));
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

function myNew(fun) {
  if (typeof fun !== "function") {
    throw new TypeError(" fun is not a function");
  }

  var obj = {};
  Object.setPrototypeOf(obj, fun.prototype);

  for (var _len4 = arguments.length, arg = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    arg[_key4 - 1] = arguments[_key4];
  }

  fun.apply(obj, arg);
  return obj;
}

function myExtends(parent, child) {
  function nop() {}

  nop.prototype = parent.prototype;
  child.prototype = new nop();
}

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
    var _value = parseFloat(str);

    if (!isNaN(_value)) {
      return _value;
    }
  }

  var value = parseInt(str);

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
    var obj = {};

    if (strs[strs.length - 1] == "}") {
      var fields = strs.substring(1, strs.length - 1).split(",");
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = fields[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var field = _step.value;
          var index = field.indexOf(":");
          var temp = [];

          if (index !== -1) {
            temp[0] = field.substring(0, index);
            temp[1] = field.substring(index + 1, field.length);
          }

          var key = temp[0].substring(1, temp[0].length - 1);
          var value = parseValue(temp[1]); //if (value !== undefined) {

          obj[key] = value; //}
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }

    return obj;
  }

  if (strs[0] === "[") {
    if (strs[strs.length - 1] == "]") {
      var result = [];

      var _fields = strs.substring(1, strs.length - 1).split(",");

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = _fields[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _field = _step2.value;
          result.push(parseValue(_field));
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return result;
    }
  }
}

function JSONStringify(obj) {
  if (obj === undefined || obj === null || typeof obj === "string" || typeof obj === "boolean" || typeof obj === "number") {
    return obj;
  }

  if (typeof obj === "function") {
    return "";
  }

  if (Array.isArray(obj)) {
    var result = [];

    for (var i = 0; i < obj.length; i++) {
      result.push(JSONStringify(obj[i]));
    }

    return "[" + result.join(",") + "]";
  } else {
    var _result = [];

    for (var key in obj) {
      _result.push("\"".concat(key, "\":").concat(JSONStringify(obj[key])));
    }

    return "{" + _result.join(",") + "}";
  }
}

var emca = {
  isInstanceOf: isInstanceOf,
  JSONParse: JSONParse,
  JSONStringify: JSONStringify,
  myNew: myNew,
  myExtends: myExtends
};

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

function LazyManAsync(name) {
  return new LazyManFactory(name);
}

function LazyManFactory(name) {
  var _this = this;

  this.tasks = [];
  this.tasks.push(function () {
    return new Promise(function (resolve, reject) {
      console.log("hi", name);
      resolve();
    });
  });
  setTimeout(function () {
    _this.run();
  }, 0);
}

LazyManFactory.prototype.run = function () {
  var _this2 = this;

  if (this.tasks.length === 0) {
    return;
  }

  var task = this.tasks.shift();
  task().then(function () {
    _this2.run();
  })["catch"](function () {
    _this2.run();
  });
};

LazyManFactory.prototype.sleep = function (time) {
  this.tasks.push(function () {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve();
      }, time * 1000);
    });
  });
  return this;
};

LazyManFactory.prototype.eat = function (name) {
  this.tasks.push(function () {
    return new Promise(function (resolve, reject) {
      console.log("eat:", name);
      resolve();
    });
  });
  return this;
};

LazyManFactory.prototype.sleepFirst = function (time) {
  this.tasks.unshift(function () {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve();
      }, time * 1000);
    });
  });
  return this;
};

function LazyMan(name) {
  return new LazyManFactory$1(name);
}

function LazyManFactory$1(name) {
  var _this = this;

  this.name = name;
  this.flag = false;
  this.tasks = [];
  this.tasks.push(function () {
    console.log('hi,', _this.name);

    _this.next();
  });
  setTimeout(function () {
    _this.next();
  }, 0);
}

LazyManFactory$1.prototype.eat = function (sth) {
  var _this2 = this;

  this.tasks.push(function () {
    console.log(_this2.name, ' eat dinner');

    _this2.next();
  });
  return this;
};

LazyManFactory$1.prototype.next = function () {
  var fn = this.tasks.shift();
  fn && fn();
};

LazyManFactory$1.prototype.sleep = function (delay) {
  var _this3 = this;

  this.tasks.push(function () {
    setTimeout(function () {
      _this3.next();
    }, delay * 1000);
  });
  return this;
};

LazyManFactory$1.prototype.sleepFirst = function (delay) {
  var _this4 = this;

  this.tasks.unshift(function () {
    setTimeout(function () {
      _this4.next();
    }, delay * 1000);
  });
  return this;
};

function MyPromise(executor) {
  var _this = this;

  this.state = "pending";
  this.onFulfilledCallbacks = [];
  this.onRejectedCallbacks = [];
  executor(function (data) {
    _this.state = "resolved";
    _this.value = data;

    _this.onFulfilledCallbacks.forEach(function (callback) {
      callback(data);
    });
  }, function (err) {
    _this.state = "rejected";
    _this.value = err;

    _this.onRejectedCallbacks.forEach(function (callback) {
      callback(err);
    });
  });
}

MyPromise.prototype.then = function (onSuccess, onFail) {
  var callback = null;

  if (this.state === "resolved") {
    var newValue = onSuccess(this.value);
    callback(newValue);
  }

  if (this.state === "pending") {
    this.onFulfilledCallbacks.push(function (res) {
      var newValue = onSuccess(res);
      callback(newValue);
    });
    this.onRejectedCallbacks.push(function (error) {
      onFail(error);
    });
  }

  if (this.state === "rejected") {
    onFail(this.value);
  }

  return new Promise(function (resolve, reject) {
    callback = function callback(data) {
      resolve(data);
    };
  });
};

function Schedule() {
  var _this = this;

  this.tasks = [];
  this.max = 2;
  setTimeout(function () {
    _this.run();
  }, 0);
}

Schedule.prototype.addTask = function (task) {
  this.tasks.push(task);
};

Schedule.prototype.run = function () {
  var _this2 = this;

  if (this.tasks.length === 0) {
    return;
  }

  var size = Math.min(this.max, this.tasks.length);

  for (var i = 0; i < size; i++) {
    var task = this.tasks.shift();
    this.max--;
    task().then(function (res) {
      _this2.max++;

      _this2.run();
    })["catch"](function (err) {
      _this2.max++;

      _this2.run();
    });
  }
};

function travelMiddlerOrder(treeNode) {
  if (treeNode == null) {
    return;
  }

  travelMiddlerOrder(treeNode.left);
  console.log(treeNode.val);
  travelMiddlerOrder(treeNode.right);
}

var buildTree = function buildTree(preorder, inorder) {};

function debounce(fun, delay) {
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
        fun.apply(_this, args);
      }, delay);
    }
  };
}

function throttle(fun, delay, immediate) {
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
}

function memeorize(fun) {
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
}

function log(fun) {
  var _this4 = this;

  return function () {
    var start = new Date().getTime();

    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    var value = fun.apply(_this4, args);
    var end = new Date().getTime();
    console.log("invoke.. time cost:", value);
    return value;
  };
}

function promisy(fun) {
  return function () {
    for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }

    return new Promise(function (resolve, reject) {
      try {
        fun.apply(void 0, args.concat([resolve]));
      } catch (e) {
        reject(e);
      }
    });
  };
}

function currying(fn) {
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
      return currying.call.apply(currying, [self, fn].concat(_toConsumableArray(arg)));
    }

    return fn.apply(this, arg);
  };
}

function timer(minute, second) {
  var timer = setInterval(function () {
    if (minute === 0 && second === 0) {
      clearInterval(timer);
    } else {
      if (second <= 0) {
        second = 60;
        minute--;
      }

      second--;
      console.log("".concat(minute, ":").concat(second));
    }
  }, 1000);
}

function formatNumber(number) {
  if (typeof number !== "number") {
    return null;
  }

  if (isNaN(number)) {
    return null;
  }

  var result = [];
  var tmp = number + "";
  var num = number;
  var suffix = "";

  if (tmp.indexOf(".") !== -1) {
    suffix = tmp.substring(tmp.indexOf(".") + 1);
    num = parseInt(tmp.substring(0, tmp.indexOf(".")));
  }

  while (num > 0) {
    result.unshift(num % 1000);
    num = Math.floor(num / 1000);
  }

  var ret = result.join(",");

  if (suffix !== "") {
    ret += "." + suffix;
  }

  return ret;
}

function timeEscape() {
  var timestamp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

  if (!timestamp || isNaN(timestamp)) {
    return null;
  }

  var now = new Date().getTime();
  var minute = 60 * 1000;
  var hour = minute * 60;
  var day = hour * 24;
  var week = day * 7;

  if (timestamp >= now) {
    return "error";
  }

  if (timestamp >= now - minute) {
    return "1分钟内";
  }

  if (timestamp >= now - hour) {
    var m = Math.floor((now - timestamp) / minute);
    return "".concat(m, "\u5206\u949F\u524D");
  }

  if (timestamp >= now - day) {
    var h = Math.floor((now - timestamp) / hour);
    return "".concat(h, "\u5C0F\u65F6\u524D");
  }

  if (timestamp >= now - week) {
    var d = Math.floor((now - timestamp) / day);
    return "".concat(d, "\u5929\u524D");
  }

  return new Date(timestamp).toLocaleString();
}

var util = {
  debounce: debounce,
  throttle: throttle,
  memeorize: memeorize,
  log: log,
  promisy: promisy,
  currying: currying,
  timer: timer,
  formatNumber: formatNumber,
  timeEscape: timeEscape
};

exports.DomUtil = DomUtil;
exports.EventBus = EventBus;
exports.LazyMan = LazyMan;
exports.LazyManAsync = LazyManAsync;
exports.MyPromise = MyPromise;
exports.Schedule = Schedule;
exports.array = array;
exports.asyncUtil = asyncUtil;
exports.buildTree = buildTree;
exports.emca = emca;
exports.retryAjax = retryAjax;
exports.travelMiddlerOrder = travelMiddlerOrder;
exports.util = util;
