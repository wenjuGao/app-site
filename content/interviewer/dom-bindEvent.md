---
layout: article
title: DOM事件
description: 
img: app-site/img/action-scope.jpg
header: app-site/img/action-scope-header.jpg
banner: true
date: 2023-04-01 12:12:12
category: 面试
tags:
  - 面试
  - DOM
---


### 1. DOM中绑定

```html
<div id="btn" onclick="console.log(1)"></div>
```

### 2. javascript获得DOM后绑定

```javascript
document.getElementById("btn").onclick = console.log(1)
```

### 3. 事件监听

#### addeventlistener
接收3个参数:
1. 事件名(Event)
2. 事件处理函数(Function)
3. 布尔值(Boolean):
	- true表示在捕获阶段调用事件处理程序
	- false（默认值）表示在冒泡阶段调用事件处理程序

```javascript
document.getElementById("btn").addeventlistener("click",console.log(1),false);
```

#### 兼容IE：

attachEvent接收2个参数（只支持事件冒泡）:
1. 事件名(Event)
2. 事件处理函数(Function)

```javascript
document.getElementById("btn").attachEvent("onclick",console.log(1));
```

#### 使用

```javascript
function addHandler(element, type, handler) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent("on" + type, handler);
    } else {
      element["on" + type] = handler;
    }
}
```

---
### 区别

1. addeventlistener、attachEvent相同事件绑定多个逻辑，多个逻辑不相互覆盖，使用DOM中绑定、javascript获得DOM后绑定逻辑会覆盖，仅保留最后一次注册的逻辑
2. addeventlistener、attachEvent被点击的DOM通过e.target得到，使用DOM中绑定、javascript获得DOM后绑定被点击的DOM通过一般通过this获得
3. addeventlistener、attachEvent注销的事件分别通过removeListener、detachEvent注销，使用DOM中绑定、javascript获得DOM后绑定注销需要使用新的空逻辑拦截

---

### 事件冒泡

事件被定义为从最具体的元素（文档树中最深的节点）开始触发，然后向上传播至没有那么具体的元素（文档）

### 事件捕获

最不具体的节点应该最先收到事件，而最具体的节点应该最后收到事件