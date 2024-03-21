---
layout: article
title: forin 与 forof的区别
description: 每个对象将继承 objCustom 属性，并且作为 Array 的每个对象将继承 arrCustom 属性，因为将这些属性添加到 Object.prototype 和 Array.prototype。由于继承和原型链，对象 iterable 继承属性 objCustom 和 arrCustom
img: /img/forof.jpg
header: /img/forof-header.jpg
date: 2023-04-01 12:12:12
category: javascript
tags:
  - 循环
  - forin
  - forof
  - javascript
---

> > > 无论是 for...in 还是 for...of 语句都是迭代一些东西。它们之间的主要区别在于它们的迭代方式。

### forin

```javascript
for (variable in object) statement
```

- **variable**:在每次迭代时，variable 会被赋值为不同的属性名。
- **object**:非 Symbol 类型的可枚举属性被迭代的对象

- for...in 语句以任意顺序迭代对象的可枚举属性;

### forof

- for...of 语句遍历可迭代对象定义要迭代的数据；-
- 在可迭代对象（Array，Map，Set，String，TypedArray，arguments...)上创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性执行；
  > > > 可迭代对象:(满足 ECMAScript 2015 中补充的两个协议：可迭代协议和迭代器协议);
  > > > 可迭代协议:可迭代协议允许 javascript 对象定义或定制它们的迭代行为;要成为可迭代对象， 一个对象必须实现 @@iterator 方法。这意味着对象（或者它原型链上的某个对象）必须有一个键为 @@iterator 的属性，可通过常量 Symbol.iterator 访问该属性：
  > > > 迭代器协议定义了产生一系列值（无论是有限个还是无限个）的标准方式。当值为有限个时，所有的值都被迭代完毕后，则会返回一个默认返回值。

### 区别

```javascript
Object.prototype.objCustom = function () {}
Array.prototype.arrCustom = function () {}

let iterable = [3, 5, 7]
iterable.foo = 'hello'
/*
 * Array继承Object.prototype的objCustom属性
 * iterable继承Array.prototype的objCustom、arrCustom属性
 * forin iterable数组上的可枚举属性(原型链属性及索引属性，length属性可以通过Array.length的Enumerable属性控制是否可被枚举-默认false)
 * (for...in不应该用于迭代一个 Array，其中索引顺序很重要)
 */
for (let i in iterable) {
  console.log(i) // 0, 1, 2, "foo", "arrCustom", "objCustom"
}

/*
 * hasOwnProperty过滤了原型链上的属性
 */
for (let i in iterable) {
  if (iterable.hasOwnProperty(i)) {
    console.log(i) // 0, 1, 2, "foo"
  }
}

/*
 * forof迭代对象的值
 */
for (let i of iterable) {
  console.log(i) // 3, 5, 7
}
```

- 每个对象将继承 objCustom 属性，并且作为 Array 的每个对象将继承 arrCustom 属性，因为将这些属性添加到 Object.prototype 和 Array.prototype。由于继承和原型链，对象 iterable 继承属性 objCustom 和 arrCustom。
