---
layout: article
title: 字面量与构造器的区别
description: 字面量与 构造器 构建变量的区别
img: /img/action-scope.jpg
header: /img/action-scope-header.jpg
date: 2023-04-03 12:12:12
category: javascript
tags:
  - 字面量
  - 构造器
  - 构建变量
  - javascript
---

```javascript
const a = 1,
  b = new Number(1)
console.log(typeof a, typeof b) // number object
```

### 字面量声明

### 构造器构建

#### 构造器类型

- Number;
- String;
- Boolean;
- Symbol;

#### 构造器使用

- Number、String 和 Boolean，三个构造器是两用的，当跟 new 搭配时，它们产生对象，当直接调用时，它们表示强制类型转换。
- Symbol 函数比较特殊，直接用 new 调用它会抛出错误，但它仍然是 Symbol 对象的构造器。
