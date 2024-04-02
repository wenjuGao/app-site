---
layout: article
title: 0.5px边框
description: 
img: app-site/img/action-scope.jpg
header: app-site/img/action-scope-header.jpg
date: 2023-04-01 12:12:12
category: 面试
tags:
  - 面试
  - css
---



1. border + border-image + 线性渐变linear-gradient

```html
<style>
.border {
	border-bottom: 1px solid transparent;
	border-image: linear-gradient(to bottom,transparent 50%, red 50%) 0 0 100%/1px 0;
}
</style>
```

2. 定位 + 伪元素 + background + 线性渐变linear-gradient

```html
<style>
.border::before {
        content: " ";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1px;
        background-image: linear-gradient(to bottom, transparent 50%, red 50%);
}
</style>
```

3. 定位 + 伪元素 + transfrom缩放（scale）

```html
<style>
    .border::after {
        content: " ";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1px;
        background: red;
        transform: scaleY(0.5);
    }
</style>
```

4. 定位 + 伪元素 + transfrom缩放（scale）

```html
<style>
    .border::after {
    	content: " ";
        position: absolute;
        top: 0;
        left: 0;
        width: 200%;
        height: 200%;
        border: 1px solid red;
        transform-origin: 0 0;
        transform: scale(0.5);
    }
</style>
```

transparent

参考
[CSS3实现0.5px的边框](https://segmentfault.com/a/1190000020640155)