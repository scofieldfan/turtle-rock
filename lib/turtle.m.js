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

  if (start >= end) {
    return;
  }

  var index = partition(ary, start, end);
  quickSort(ary, start, index - 1);
  quickSort(ary, index + 1, end);

  function partition(pAry, left, right) {
    var priviot = pAry[right];
    var start = left - 1;

    for (var i = left; i <= right - 1; i++) {
      if (pAry[i] < priviot) {
        swap(pAry, ++start, i);
      }
    }

    swap(pAry, ++start, right);
    return start;
  }

  function swap(sAry, i, j) {
    var temp = sAry[i];
    sAry[i] = sAry[j];
    sAry[j] = temp;
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

var asyncUtil = {
  series: function series(tasks, callback) {
    var result = [];

    for (var i = 0; i < tasks.length; i++) {
      tasks[i](function (context, ret) {
        result.push(ret);
      });
    }

    callback(null, result);
  }
};

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
  }
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

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

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
          fun.apply(_this, args);
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
  },
  currying: function currying(fun) {
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
  timer: function timer(minute, second) {
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
  },
  formatNumber: function formatNumber(number) {
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
  },
  timeEscape: function timeEscape() {
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

function MyPromise(fun) {
  var _this = this;

  this.state = "pending";
  this.onFulfilledCallbacks = [];
  this.onRejectedCallbacks = [];
  fun(function (data) {
    _this.state = "resolved";

    _this.onFulfilledCallbacks.forEach(function (callback) {
      callback(data);
    });
  }, function () {
    _this.state = "rejected";

    _this.onRejectedCallbacks.forEach(function (callback) {
      callback();
    });
  });
}

MyPromise.prototype.then = function (onSuccess, onFail) {
  var _this2 = this;

  if (this.state === "resolved") {
    onSuccess(this.value);
  }

  if (this.state === "pending") {
    this.onFulfilledCallbacks.push(function () {
      onSuccess(_this2.value);
    });
    this.onRejectedCallbacks.push(function () {
      onFail(_this2.value);
    });
  }

  if (this.state === "rejected") {
    onFail(this.value);
  }
};

Function.prototype.mybind = function (context) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  var f = this;

  function bound() {
    var self = this instanceof bound ? this : context;

    for (var _len2 = arguments.length, args2 = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args2[_key2] = arguments[_key2];
    }

    return f.apply(self, args.concat(args2));
  }

  bound.prototype = this.prototype;
  return bound;
};

Function.prototype.bind2 = function (context) {
  var self = this;
  var args = [].slice.call(1, arguments);

  function newbind() {
    for (var _len3 = arguments.length, args2 = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args2[_key3] = arguments[_key3];
    }

    return self.apply(this instanceof newbind ? this : context, args.concat(args2));
  }

  function nop() {}

  nop.prototype = this.prototype;
  newbind.prototype = new nop();
  return newbind;
};

var request = {
  sendSeqRequest: function sendSeqRequest() {
    var requests = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var result = [];

    function print(ary) {
      for (var i = 0; i < ary.length; i++) {
        if (!ary[i]) {
          return;
        }

        if (!ary[i].isPrint) {
          ary[i].data.isPrint = true;
          console.log(ary[i].data);
        }
      }
    }

    requests.forEach(function (url, i) {
      fetch(url).then(function (res) {
        result[i].data = res;
        result[i].isPrint = false;
        print(result);
      })["catch"](function (err) {
        result[i].data = err;
        result[i].isPrint = false;
        print(result);
      });
    });
  },
  retryAjax: function retryAjax(url) {
    var retryTimes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    function helper(url, times, err) {
      var num = times;
      console.log("call helper,:", num);

      if (num <= 0) {
        return Promise.reject(err);
      } else {
        return fetch(url).then(function (res) {
          return res;
        })["catch"](function (err) {
          return helper(url, num - 1, err);
        });
      }
    }

    return helper(url, retryTimes);
  },
  request: function request(url, method, params) {
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

      xhr.addEventListener('error', function (e) {
        reject(error);
      });
      xhr.send(params);
    });
  },
  cacheRequest: function cacheRequest(url) {
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
  },
  sendParallel: function (_sendParallel) {
    function sendParallel() {
      return _sendParallel.apply(this, arguments);
    }

    sendParallel.toString = function () {
      return _sendParallel.toString();
    };

    return sendParallel;
  }(function () {
    var urls = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    function helper(requests, num) {
      var size = Math.min(requests.length, num);

      for (var i = 0; i < size; i++) {
        var url = requests.shift();
        num--;
        fetch(url).then(function (res) {
          sendParallel(requests, num + 1);
        })["catch"](function (error) {
          sendParallel(requests, num + 1);
        });
      }
    }

    helper(urls, max);
  })
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

var maxStack =
/*#__PURE__*/
function () {
  function maxStack() {
    _classCallCheck(this, maxStack);

    this.stack = [];
    this.maxStack = [];
  }

  _createClass(maxStack, [{
    key: "push",
    value: function push(item) {
      this.stack.push(item);

      if (this.maxStack.length > 0) {
        var topItem = this.maxStack[this.maxStack.length - 1];

        if (item > topItem) {
          this.maxStack.push(item);
        }
      } else {
        this.maxStack.push(item);
      }
    }
  }, {
    key: "pop",
    value: function pop() {
      var item = this.stack.pop();
      var topItem = this.maxStack[this.maxStack.length - 1];

      if (topItem === item) {
        this.maxStack.pop();
      }

      return item;
    }
  }, {
    key: "getMax",
    value: function getMax() {
      return this.maxStack[this.maxStack.length - 1];
    }
  }]);

  return maxStack;
}();

var isInstanceOf = function isInstanceOf(obj, fun) {
  if (obj === null || obj.__proto__ === null) {
    return false;
  }

  if (obj.__proto__ === fun.prototype) {
    return true;
  }

  return isInstanceOf(obj.__proto__, fun);
};

var curry = function curry(fun) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  if (fun.length <= args.length) {
    return fun.apply(null, args);
  } else {
    return function () {
      for (var _len2 = arguments.length, args1 = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args1[_key2] = arguments[_key2];
      }

      return curry.apply(void 0, [fun].concat(args, args1));
    };
  }
};

function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

function travelMiddlerOrder(treeNode) {
  if (treeNode == null) {
    return;
  }

  travelMiddlerOrder(treeNode.left);
  console.log(treeNode.val);
  travelMiddlerOrder(treeNode.right);
}

var buildTree = function buildTree(preorder, inorder) {
  var inmap = {};

  for (var i = 0; i < inorder.length; i++) {
    inmap[inorder[i]] = i;
  }

  function helper(pleft, pright, inleft, inright) {
    if (pleft > pright || inleft > inright) {
      return null;
    }

    if (pleft < 0 || pright > preorder.length - 1) {
      return null;
    }

    if (inleft < 0 || inright > inorder.length - 1) {
      return null;
    }

    var node = new TreeNode(preorder[pleft]);
    var inorderIndex = inmap[preorder[pleft]];
    var preoderIndex = Math.floor(pleft + 1);

    for (var _i = pleft + 1; _i <= pright; _i++) {
      if (inmap[preorder[_i]] > inorderIndex) {
        preoderIndex = _i;
        break;
      }
    }

    if (inorderIndex >= pleft && inorderIndex <= pright && preoderIndex >= inleft && preoderIndex <= inright) {
      node.left = helper(pleft, preoderIndex - 1, inleft, inorderIndex - 1);
      node.right = helper(preoderIndex, pright, inorderIndex + 1, inright);
    }

    console.log("pleft:", pleft);
    console.log("pright:", pright);
    console.log("inleft:", inleft);
    console.log("inright:", inright);
    console.log("inorderIndex:", inorderIndex);
    console.log("preoderIndex:", preoderIndex);
    return node;
  }

  return helper(0, preorder.length - 1, 0, inorder.length - 1);
};

export { DomUtil, EventBus, LazyMan, LazyManAsync, MyPromise, Schedule, array, asyncUtil, buildTree, curry, isInstanceOf, maxStack, request, travelMiddlerOrder, util };
