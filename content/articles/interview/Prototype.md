---
layout: article
title: 原型链与继承
description: 
img: https://qiniu.gaowenju.com/app-site/img/action-scope.jpg-watermark
header: https://qiniu.gaowenju.com/app-site/img/action-scope-header.jpg-watermark
date: 2023-04-01 12:12:12
category: 面试
tags:
  - 面试
  - prototype
---

### [MDN:原型链](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)

每个实例对象（ object ）都有一个私有属性（称之为 __proto__ ）指向它的构造函数的原型对象（prototype ）。
该原型对象也有一个自己的原型对象( __proto__ ) ，层层向上直到一个对象的原型对象为 null。
根据定义，null 没有原型，并作为这个原型链中的最后一个环节。

几乎所有 JavaScript 中的对象都是位于原型链顶端的 Object 的实例。





实例.__proto__ => 构造函数.prototype
构造函数.__proto__ => Object.prototype
Object.__proto__ => null

https://github.com/mqyqingfeng/Blog/issues/2

```javascript
function Person (){}

Person.prototype;  // { constructor: f, __proto__ : Object }
Person.__proto__; // ƒ () { [native code] }

let person = new Person()

person.prototype; // undefined

person.__proto__ === Person.prototype  // true

person.constructor === Person  // true

person === Person.prototype.constructor  // true

```


### 基于原型链的继承

当试图访问一个对象的属性时，它不仅仅在该对象上搜寻，还会搜寻该对象的原型，以及该对象的原型的原型，依次层层向上搜索，直到找到一个名字匹配的属性或到达原型链的末尾。

**性能**

在原型链上查找属性比较耗时，对性能有副作用，这在性能要求苛刻的情况下很重要。另外，试图访问不存在的属性时会遍历整个原型链。