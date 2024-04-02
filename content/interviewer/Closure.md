---
layout: article
title: 闭包
description: 在编程过程中我们总是需要将函数与其所操作的环境关联起来，即某些逻辑依赖其他环境的数据，为了管理函数的执行环境和避免变量污染于是就涉及到了闭包（closure）的概念。
img: app-site/img/action-scope.jpg
header: app-site/img/action-scope-header.jpg
date: 2023-04-01 12:12:12
category: 面试
tags:
  - 面试
  - 闭包
  - javaScript
---


### [MDN:闭包](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures)

一个函数和对其周围状态（lexical environment，词法环境）的引用捆绑在一起（或者说函数被引用包围），这样的组合就是闭包（closure）。

也就是说，闭包让你可以在一个内层函数中访问到其外层函数的作用域。在 JavaScript 中，每当创建一个函数，闭包就会在函数创建的同时被创建出来。


### 闭包的特性

1. 函数嵌套函数（即执行函数IIFE：Immediately Invoked Function Expression）
2. 函数内部可以引用外部的参数和变量
3. 参数和变量不会被垃圾回收机制回收


```javascript
(function (window) {
	var private = "函数的私有属性-不能被访问到"
	var privateDOM = document.getElementById('app');
	window.$ = {
		closure:"闭包-向指定作用域注入属性"
	}
	// 手动清理闭包IE中内存泄露
	privateDOM = null
})(window);
```

**注意**
- $.closure被window引用所有一直不会被GC回收
- private未被引用会被GC标记回收
- privateDOM由于IE的js对象和DOM对象使用不同的垃圾收集方法，所以在IE中privateDOM也不会被回收，所有可能会造成内存泄露问题


### 总结

闭包就是通过即执行函数的形式形成一个一直保留在内存中个词法环境，方便管理函数的执行环境和避免变量污染，其可能引起的问题就是可能会造成内存泄露。
