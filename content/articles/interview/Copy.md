---
layout: article
title: 深拷贝浅拷贝
description: 
img: https://qiniu.gaowenju.com/app-site/img/action-scope.jpg-watermark
header: https://qiniu.gaowenju.com/app-site/img/action-scope-header.jpg-watermark
date: 2023-04-01 12:12:12
category: 面试
tags:
  - 面试
  - 拷贝
---

### 深拷贝&浅拷贝

1. 基本数据类型赋值是拷贝值到新的变量
2. 引用数据类型赋值是拷贝值的引用

### API

1. Object.assign：拷贝的是（可枚举）属性值，假如源值是一个对象的引用，它仅仅会复制其引用值
1. 展开语法：执行的浅拷贝(只遍历一层)
1. concat：执行的浅拷贝(只遍历一层)
