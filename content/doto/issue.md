---
date: 2024-10-25 17:50:57
title: 我的TOODO
description: 
img: /img/action-scope.jpg
header: /img/action-scope-header.jpg
banner: false
category: 
tags: 
---

## 我的TOODO

### 1. 监听DOM的焦点变化

通过`document.activeElement`可以获取到当前的焦点元素，但是无法监听焦点的变化。
通过`document.addEventListener('focus', function(event) {})`可以监听焦点的变化，但是无法获取到焦点的变化元素。
`MutationObserver`可以监听DOM的变化，但是无法监听焦点的变化。