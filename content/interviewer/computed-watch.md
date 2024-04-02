---
layout: article
title: vue中的computed与watch
description: 
img: app-site/img/action-scope.jpg
header: app-site/img/action-scope-header.jpg
banner: true
date: 2023-04-01 12:12:12
category: 面试
tags:
  - 面试
  - vue
---


### computed

根据所依赖的数据动态显示新的计算结果
- 计算结果会在getter执行后是会缓存的
- 依赖的属性值改变后，下一次获取computed的值时才会重新调用对应的getter来计算


### watch

数据监听回调
- Vue 实例将会在实例化时调用 $watch()，遍历 watch 对象的每一个属性

**注意：**
不应该使用箭头函数来定义 watcher 函数，因为箭头函数没有 this，它的 this 会继承它的父级函数，但是它的父级函数是 window，导致箭头函数的 this 指向 window，而不是 Vue 实例

### 区别
- watch 会生成一个watcher对象，在监视的属性每次变动时都会触发回调
- computed 则是生成一个惰性的watcher，只有在取值操作(getter触发)时收集依赖且计算值