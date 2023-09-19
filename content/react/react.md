---
layout: article
title: react
description: react
img: /img/seal.jpg
header: /img/seal-header.jpg
date: 2023-09-02 12:12:12
category: react
tags:
  - react
---


###  javascript



```js
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
