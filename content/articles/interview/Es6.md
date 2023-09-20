---
layout: article
title: es6常用API
description: 
img: https://qiniu.gaowenju.com/app-site/img/action-scope.jpg-watermark
header: https://qiniu.gaowenju.com/app-site/img/action-scope-header.jpg-watermark
banner: true
date: 2023-04-01 12:12:12
category: 面试
tags:
  - 面试
  - es6
---

### Array

1. Array.prototype.concat():合并数组
1. Array.prototype.filter():返回过滤后的新数组
1. Array.prototype.map():返回新数组
1. Array.prototype.reverse():翻转数组
1. Array.prototype.flat():按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。
1. Array.prototype.reduce():为数组中的每一个元素依次执行callback函数，不包括数组中被删除或从未被赋值的元素
```javascript
[0, 1, 2, 3, 4].reduce(function(accumulator, currentValue, currentIndex, array){
	// accumulator 累计器- 累计回调的返回值
	// currentValue 当前值
	// currentIndex 当前索引
	// array 数组
  return accumulator + currentValue;
});
```


### Object

1. Object.assign：合并对象
1. Object.keys：对象建数组
1. Object.is ：判断两个值是否为同一个值


### 语法

1. 展开语法：合并对象或者数组
1. 结构赋值
1. 箭头函数：this指向上层作用域

### 异步
1. Promise：then、catch、finally

### 迭代
1. Iterator
1. for...of...


1. Symbol
1. Set、WeakSet
1. Map、WeakMap
	WeakMap只接收除null以外的对象作为key，且key为弱引用即如果作为key的对应在其执行环境中无其他引用则key会被回收，回收后weakMap对象也自动删除其key-value