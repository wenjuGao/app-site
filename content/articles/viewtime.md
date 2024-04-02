---
layout: article
title:  前端访问时长监控
description:  前端访问时长监控
img: app-site/img/action-scope.jpg
header: app-site/img/action-scope-header.jpg
date: 2023-08-25 09:35:09
category: 浏览器
tags:
  - 监控
  - 浏览器
---

页面关闭时发送：
阻塞页面关闭：

1.  阻塞式的 Ajax 请求
1.  暴力的死循环
1.  暴力的死循环

```javascript
window.addEventListener('unload', function(event) {
	var xhr = new XMLHttpRequest(),
	xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
	xhr.open('post', '/log', false); // 同步请求
	xhr.send(data);
});
```
