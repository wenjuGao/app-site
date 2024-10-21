---
layout: article
title:  数据类型
description:  数据类型
img: /img/action-scope.jpg
header: /img/action-scope-header.jpg
date: 2023-08-28 21:49:01
category: js
tags:
  - 数据类型
  - javascript
---

```javascript
var a = [1,2,3];
var b = [1,2,3];
var c = a;

console.log(a === b) 	// false
console.log(a === c) 	// true
```

在一般开发中，我们总是避免使用等号来判断两个引用数据类型的数据是否相等，本质是因为，我们知道判断的结果并不能提供这两个数据属性是否一直的依据。
但是正像上面的例子中的比较a、c，当我们想知道这个引用数据与另外一个引用数据是否指向同一个内存时，等号就变成了很好的选择。