---
layout: article
title: 异步
description: JavaScript 引擎负责解析，执行 JavaScript 代码，但它并不能单独运行，通常都得有一个宿主环境，一般如浏览器或 Node 服务器，前文说到的单线程是指在这些宿主环境创建单一线程，提供一种机制，调用 JavaScript 引擎完成多个 JavaScript 代码块的调度，这种机制就称为事件循环（ Event Loop ）
img: app-site/img/action-scope.jpg
header: app-site/img/action-scope-header.jpg
date: 2023-04-01 12:12:12
category: 面试
tags:
  - 面试
  - 异步
  - javaScript
---



#### 关于事件循环流程分解如下：

- 宿主环境为JavaScript 创建线程时，会创建堆 (heap) 和栈 (stack) ，堆内存储 JavaScript 对象，栈内存储执行上下文；

- 栈内执行上下文的同步任务按序执行，执行完即退栈，而当异步任务执行时，该异步任务进入等待状态（不入栈），同时通知线程：当触发该事件时（或该异步操作响应返回时），需向消息队列插入一个事件消息；

- 当事件触发或响应返回时，线程向消息队列插入该事件消息（包含事件及回调）；

- 当栈内同步任务执行完毕后，线程从消息队列取出一个事件消息，其对应异步任务（函数）入栈，执行回调函数，如果未绑定回调，这个消息会被丢弃，执行完任务后退栈；

- 当线程空闲（即执行栈清空）时继续拉取消息队列下一轮消息（next tick ，事件循环流转一次称为一次 tick ）。


## 并发模型与事件循环 Concurrency model and the event loop


### 浏览器中的事件循环

- 函数的执行顺序实现：函数调用栈、任务队列(task queue)
- 一个线程中，事件循环是唯一，任务队列可以拥有多个

**任务队列：**

- 宏任务macro-task：
	- script(整体代码)
	- setTimeout
	- setInterval
	- setImmediate
	- I/O
	- UI render
- 微任务micro-task：
	- process.nextTick
	- Promise
	- Async/Await(实际就是promise)
	- MutationObserver(html5新特性)


先执行宏任务，然后执行该宏任务产生的微任务，若微任务在执行过程中产生了新的微任务，则继续执行微任务，微任务执行完毕后，再回到宏任务中进行下一轮循环


node 11:

输入数据阶段(incoming data)
->
轮询阶段(poll)
->
检查阶段(check)
->
关闭事件回调阶段(close callback)
->
定时器检测阶段(timers)
->
I/O事件回调阶段(I/O callbacks)
->
闲置阶段(idle, prepare)
->
轮询阶段(poll)




node io密集型


http无状态协议

webpack  gulp


https://juejin.cn/post/6844904100195205133