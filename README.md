# turtle 系列

<div align=center>
<img src="./imgs/turtle.jpg" width = "100" height = "100"  />
</div>
turtle系列的核心精神就是 Slow is Fast,慢就是快，慢慢的积累不要停歇。自然会最终达到✌️！
乌龟是一个动物，这个动物行动迟缓，但是寿命很长，不端努力，勇攀高峰。人生是一场马拉松，不到最后没有胜负，一时的落后说明不了什么。
turtle 系列本着这个原则，复习所有相关领域的知识。慢就是快，不要着急。助你成为更好的自己！做一只快乐，积极，奋斗的小乌龟吧!

## turtle-rock

-   环境环境依赖于 node v10.0 以上
-   项目安装

```
   npm install // 安装依赖
   npm run build // 项目打包
   npm run test // 运行测试用例
```

turtle-rock 是前端 Javascript 一些小程序和算法的的集合，方便理解 JS 里的一些语言特性，和异步。

```
作为一个FE，不要排斥算法，不要自己把自己的要求降低，对于基础算法的自己不要放低要求自己，其实对于一些基础算法，也不是非常难。只要像turtle一样，不停的努力就可以了！
```

### Array

-   [flattern 数组展平](https://github.com/scofieldfan/turtle-rock/blob/75e703a38ba64c8478114b16ad200703c377fec9/src/array.js#L1)
-   [flush 将数组乱序](https://github.com/scofieldfan/turtle-rock/blob/75e703a38ba64c8478114b16ad200703c377fec9/src/array.js#L16)
-   [binarySearch 二分查找](https://github.com/scofieldfan/turtle-rock/blob/75e703a38ba64c8478114b16ad200703c377fec9/src/array.js#L24)
-   [qsort 快速排序](https://github.com/scofieldfan/turtle-rock/blob/75e703a38ba64c8478114b16ad200703c377fec9/src/array.js#L42)
-   [twosum 两数之和](https://github.com/scofieldfan/turtle-rock/blob/75e703a38ba64c8478114b16ad200703c377fec9/src/array.js#L69)

### 语言特性

-   [实现 function 的 bind](https://github.com/scofieldfan/turtle-rock/blob/155d58a98315710a44b7a0241daa1ad9d4f38364/src/emcascript.js#L1)
-   [实现 function 的 call](https://github.com/scofieldfan/turtle-rock/blob/155d58a98315710a44b7a0241daa1ad9d4f38364/src/emcascript.js#L12)
-   [实现 function 的 apply](https://github.com/scofieldfan/turtle-rock/blob/155d58a98315710a44b7a0241daa1ad9d4f38364/src/emcascript.js#L16)
-   [实现 instanceOf](https://github.com/scofieldfan/turtle-rock/blob/155d58a98315710a44b7a0241daa1ad9d4f38364/src/emcascript.js#L20)
-   [实现一个 new 函数](https://github.com/scofieldfan/turtle-rock/blob/155d58a98315710a44b7a0241daa1ad9d4f38364/src/emcascript.js#L32)
-   [实现一个继承](https://github.com/scofieldfan/turtle-rock/blob/155d58a98315710a44b7a0241daa1ad9d4f38364/src/emcascript.js#L41)
-   [实现一个 JSON.parse](https://github.com/scofieldfan/turtle-rock/blob/155d58a98315710a44b7a0241daa1ad9d4f38364/src/emcascript.js#L76)
-   [实现一个 JSON.stringify](https://github.com/scofieldfan/turtle-rock/blob/155d58a98315710a44b7a0241daa1ad9d4f38364/src/emcascript.js#L112)
-   [实现一个 promise](https://github.com/scofieldfan/turtle-rock/blob/155d58a98315710a44b7a0241daa1ad9d4f38364/src/my-promise.js#L1)
-   格式化数组数字
-   用 ES5 实现一个 ES6 的 class

### 工具类

-   [debounce （防抖）](https://github.com/scofieldfan/turtle-rock/blob/e4598498e434836d0dcf0a40f1408d4ca02b73fc/src/util.js#L2)
-   [throttle （节流）](https://github.com/scofieldfan/turtle-rock/blob/e4598498e434836d0dcf0a40f1408d4ca02b73fc/src/util.js#L14)
-   [deepclone（实现一个深度克隆）](https://github.com/scofieldfan/turtle-rock/blob/e4598498e434836d0dcf0a40f1408d4ca02b73fc/src/util.js#L68)
-   [memolize （返回一个可存储函数执行结果的函数）](https://github.com/scofieldfan/turtle-rock/blob/e4598498e434836d0dcf0a40f1408d4ca02b73fc/src/util.js#L25)
-   [promisy(将一个函数转化为 promise 的使用)](https://github.com/scofieldfan/turtle-rock/blob/e4598498e434836d0dcf0a40f1408d4ca02b73fc/src/util.js#L46)
-   [currying （函数式编程柯里化）](https://github.com/scofieldfan/turtle-rock/blob/e4598498e434836d0dcf0a40f1408d4ca02b73fc/src/util.js#L57)

### 异步控制

-   [retry （重试发一个 ajax，失败的时候会自动重试）](https://github.com/scofieldfan/turtle-rock/blob/5ab0efce0fc8017a8367a3a96d4495787ff8f162/src/async-util.js#L18)
-   [用 XMLHttpRequest 实现一个 promise 的 ajax](https://github.com/scofieldfan/turtle-rock/blob/5ab0efce0fc8017a8367a3a96d4495787ff8f162/src/async-util.js#L25)
-   [实现一个 sleep 函数](https://github.com/scofieldfan/turtle-rock/blob/5ab0efce0fc8017a8367a3a96d4495787ff8f162/src/async-util.js#L10)
-   [series 流程控制，顺序执行两个 callback](https://github.com/scofieldfan/turtle-rock/blob/5ab0efce0fc8017a8367a3a96d4495787ff8f162/src/async-util.js#L1)
-   parallel 并行执行两个 callback
-   waterfall 串行执行有参数传递
-   [scheduleTask(实现一个同时执行若干个任务的调度任务器)](https://github.com/scofieldfan/turtle-rock/blob/dbf14464c570f829f07002c3aaffc442fc1d419f/src/schedule.js#L9)
-   [LazyMan Promise 版本 （微信经典面试题 lazyman）](https://github.com/scofieldfan/turtle-rock/blob/dbf14464c570f829f07002c3aaffc442fc1d419f/src/lazyman-promise.js#L6)
-   [LazyMan 普通 版本 （微信经典面试题 lazyman）](https://github.com/scofieldfan/turtle-rock/blob/dbf14464c570f829f07002c3aaffc442fc1d419f/src/lazyman.js#L5)
-   [eventBus （实现一个事件系统的 on 监听函数和 emit 发送事件的函数）](https://github.com/scofieldfan/turtle-rock/blob/dbf14464c570f829f07002c3aaffc442fc1d419f/src/event-bus.js#L12)

### 浏览器和其他

-   实现 JSONP
-   实现双向绑定
-   [获取所有 dom 的元素节点](https://github.com/scofieldfan/turtle-rock/blob/b31c5d43b05986101861054dd15626cb234f88da/src/dom.js#L4)
-   [template 替换方法](https://github.com/scofieldfan/turtle-rock/blob/b31c5d43b05986101861054dd15626cb234f88da/src/dom.js#L1)

### 高频算法

-   MinStack
-   MaxStack
-   LRUCache
-   两个有序数组求中位数
-   数据流里求中位数
-   求一个集合的子集
-   搜索旋转排序数组
-   二叉搜索树转链表
-   三数之和
-   合并 K 个排序链表
-   编辑距离
-   [旋转矩阵](https://github.com/scofieldfan/turtle-rock/blob/b31c5d43b05986101861054dd15626cb234f88da/src/spiral-matrix.js#L1)
