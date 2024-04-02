---
layout: article
title: javascript作用域
description: javascript作用域
img: app-site/img/action-scope.jpg
header: app-site/img/action-scope-header.jpg
date: 2023-04-01 12:12:12
category: javascript
tags:
  - 作用域
  - 上下文
  - 变量提升
  - javascript
---


```javascript
function foo (a) {
	bar()
	var b = 2;
	function bar () {
		console.log('bar-b=', b)	// undefined  变量提升后还没执行赋值
		console.log('bar-c=', c)	// undefined	变量提升后还没执行赋值
		console.log('bar-a=', a)	// a					a的作用域贯穿整个foo函数包括内部函数的子作用域
		a = 'A'
		console.log('bar-a=', a)		// A				作为参数的变量可以被再次赋值，但是开发中要尽量避免这样的操作
	}
	console.log('foo-b=', b)		// 2			已经执行赋值
	console.log('foo-c=', c)		// undefined	变量提升后还没执行赋值
	console.log('foo-a=', a)		// A				a执行过赋值操作后整个作用域的a的值都被篡改了
	var c = 3;
}
// console.log('b=', b)    // throw error 未声明
// console.log('c=', c)		// throw error	未声明
foo('a')
```

输出

```
bar-b= undefined
bar-c= undefined
bar-a= a        
bar-a= A        
foo-b= 2        
foo-c= undefined
foo-a= A 
```
