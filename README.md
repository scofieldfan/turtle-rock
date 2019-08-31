# turtle 系列

<div align=center>
<img src="./imgs/turtle.jpg" width = "100" height = "100"  />
</div>

乌龟是一个动物，这个动物行动迟缓，但是寿命很长，不端努力，勇攀高峰。人生是一场马拉松，不到最后没有胜负，一时的落后说明不了什么。
turtle 系列本着这个原则，复习所有相关领域的知识。慢就是快，不要着急。助你成为更好的自己！做一只快乐，积极，奋斗的小乌龟吧!

## turtle-rock

-   环境环境依赖于 node v10.0 以上
-   项目安装

```
   npm install // 安装依赖
   npm run build // 项目打包
   npm run test // 运行测试测试
```

turtle-rock 是前端 Javascript 一些小程序的集合，方便理解 JS 里的一些语言特性，和异步。

### Array

-   flush
-   flattern
-   二分查找

### 语言特性

-   bind （实现 function 的 bind）
-   call （实现 function 的 call）
-   apply（实现 function 的 apply）
-   instanOf（实现 instanceOf）
-   new 实现一个 new 函数
-   实现一个 JSON.parse
-   实现一个继承
-   用 ES5 实现一个 ES6 的 class
-   promise（实现一个 promise)
-   格式化数组数字

### 工具类

-   debounce （防抖）
-   throttle （节流）
-   deepclone（实现一个深度克隆）
-   eventBus （实现一个事件系统的 on 监听函数和 emit 发送事件的函数）
-   用 xmlhttprequest 实现一个 promise 的 ajax
-   memolize （返回一个可存储函数结构的函数）
-   promisy(将一个函数转化为 promise 的使用)
-   curry （函数式编程柯里化）
-   retry （重试发一个 ajax，失败的时候会自动重试）

### 异步控制

-   实现一个 sleep 函数
-   series 流程控制，顺序执行两个 callback
-   parallel 并行执行两个 callback
-   waterfall 串行执行有参数传递
-   scheduleTask(实现一个同时执行若干个任务的调度任务器)
-   LazyMan （微信经典面试题 lazyman）

### 浏览器和其他

-   实现 JSONP
-   实现双向绑定
-   获取所有 dom 的元素节点
-   template 替换方法
