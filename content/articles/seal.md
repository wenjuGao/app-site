---
layout: article
title: 封闭或者修改只读
description: 封闭一个对象，阻止添加新属性并将所有现有属性标记为不可配置。当前属性的值只要原来是可写的就可以改变。
img: app-site/img/seal.jpg
header: app-site/img/seal-header.jpg
date: 2023-04-01 12:12:12
category: javascript
tags:
  - 只读
  - javascript
---


### Object.seal

- 封闭一个对象，阻止添加新属性并将所有现有属性标记为不可配置。当前属性的值只要原来是可写的就可以改变。

```javascript
const a = { a: 'a' }
Object.seal(a)
console.log(a) // {a:'a'}
a.a = 'b'
console.log(a) // {a:'b'}
a.b = 'b'
console.log(a) // {a:'b'}
delete a // return false
console.log(a) // {a:'b'}
```
