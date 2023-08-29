---
layout: article
title: javascript 中封闭或者修改只读
description: 封闭一个对象，阻止添加新属性并将所有现有属性标记为不可配置。当前属性的值只要原来是可写的就可以改变。
img: /img/seal.jpg
header: /img/seal-header.jpg
banner: true
category: javascript
tags:
  - 只读
  - javascript
---

## javascript 中封闭或者修改只读

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
