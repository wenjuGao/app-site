---
layout: article
title: javascript中的this
description: 
img: https://qiniu.gaowenju.com/app-site/img/action-scope.jpg-watermark
header: https://qiniu.gaowenju.com/app-site/img/action-scope-header.jpg-watermark
banner: true
date: 2023-04-01 12:12:12
category: 面试
tags:
  - 面试
  - javascript
---


### this

1. 函数调用，this -> 全局对象(window/global)
```javascript
	function fn(){
		console.log(this) // window\global 
	}
```
1. 对象方法的调用，this -> 上级对象
```javascript
	var dome = {
		name:"dome",
		fn: function(){
			console.log(this) // dome对象
		},
		es6:() =>{
			console.log(this) // window\global 或者上一层作用域
		}
	}
```
1. 构造函数调用，this -> 新对象
```javascript
	function Fn(){
		this.name = "dome"
	}
	var dome = new Fn()
	console.log(dome) // dome.name = "dome" 
```

### bind

- 第一个参数this，参数从第二个开始依次传递
- 返回函数，需要手动调用

```javascript
fn.bind(this,arg1,arg2)(arg1,arg2)
```


### call

- 第一个参数this，参数从第二个开始依次传递
- 返回函数执行

```javascript
fn.call(this,arg1,arg2)
```

### apply


- 第一个参数this，函数参数放在数组中传递
- 返回函数执行

```javascript
fn.call(this,[arg1,arg2])
```


### 总结bind、call、apply

- 三个函数都是用于改变this指向
- 第一个参数都是函数内部this指向的对象
- call、bind都是参数从第二个开始依次传递，apply是通过数组传递参数
- call返回函数执行，bind返回函数


修改this

1. bind

```javascript
function bindThis(f, oTarget) {
    return f.bind(oTarget)
}
```

2. call

```javascript
function bindThis(f, oTarget) {
    return function() {
        return f.apply(oTarget, arguments)
    }
}
```

3. apply

```javascript
function bindThis(f, oTarget) {
    return function() {
		const args = Array.prototype.slice.call(arguments)
        return f.apply(oTarget, args)
    }
}
```