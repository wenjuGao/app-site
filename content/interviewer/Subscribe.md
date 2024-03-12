---
layout: article
title: 设计模式
description: 
img: app-site/img/action-scope.jpg
header: app-site/img/action-scope-header.jpg
date: 2023-04-01 12:12:12
category: 面试
tags:
  - 面试
  - 设计模式
---

## 观察者模式-发布订阅者模式

### 观察者模式

- Subject（观察对象）
- Observers（响应对象）

观察对象发生变化，通知响应对象

### 发布订阅者模式

- Publisher（发布者）
- Observer（观察者）
- Subscriber（订阅者）

发布者变化通知订阅者，订阅者再通知观察者

### 区别

- 在观察者模式中，观察者是知道Subject的，Subject一直保持对观察者进行记录。然而，在发布订阅模式中，发布者和订阅者不知道对方的存在。它们只有通过消息代理进行通信。
- 在发布订阅模式中，组件是松散耦合的，正好和观察者模式相反。
- 观察者模式大多数时候是同步的，比如当事件触发，Subject就会去调用观察者的方法。而发布-订阅模式大多数时候是异步的（使用消息队列）。
- 观察者 模式需要在单个应用程序地址空间中实现，而发布-订阅更像交叉应用模式。


参考
[观察者模式和发布订阅模式有什么不同？](https://juejin.cn/post/6844903513009422343)




vueX
https://blog.csdn.net/saucxs/article/details/91967620
https://tech.meituan.com/2017/04/27/vuex-code-analysis.html
https://juejin.cn/post/6844903734930046984
https://zhuanlan.zhihu.com/p/44789005