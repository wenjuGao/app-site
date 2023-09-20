---
layout: article
title: 浏览器内核
description: 不同的内核对网页编写语法的解释也有不同，进而导致同一个页面在不同内核的浏览器下显示出来的效果也会有所出入，这也是作为一个前端工程师需要了解不同浏览器所使用的内核和各种兼容性问题。浏览器内核是浏览器的核心，也叫“渲染引擎”，解释html并渲染绘制。浏览器内核决定了浏览器该如何显示网页内容以及页面的格式信息。\n 不同的浏览器内核对网页的语法解释也不同，因此网页开发者需要在不同内核的浏览器中测试网页的渲染效果
img: https://qiniu.gaowenju.com/app-site/img/action-scope.jpg-watermark
header: https://qiniu.gaowenju.com/app-site/img/action-scope-header.jpg-watermark
banner: true
date: 2023-04-01 12:12:12
category: 浏览器
tags:
  - 浏览器
---

## 常见的浏览器内核

1. Trident
2. Gecko
3. Webkit
4. Blink

### 以下是主流浏览器的所使用的内核：

1. IE浏览器内核：Trident内核，也是俗称的IE内核； 
2. Chrome浏览器内核：统称为Chromium内核或Chrome内核，以前是Webkit内核，现在是Blink内核； 
3. Firefox浏览器内核：Gecko内核，俗称Firefox内核； 
4. Safari浏览器内核：Webkit内核； 
5. Opera浏览器内核：最初是自己的Presto内核，后来是Webkit，现在是Blink内核； 
6. 360浏览器、猎豹浏览器内核：IE+Chrome双内核； 
7. 搜狗、遨游、QQ浏览器内核：Trident（兼容模式）+Webkit（高速模式）； 
8. 百度浏览器、世界之窗内核：IE内核； 
9. 2345浏览器内核：以前是IE内核，现在也是IE+Chrome双内核；


## 双内核浏览器 指定浏览器内核渲染

浏览器默认内核的指定只需在head标签中添加一行代码即可：

- 若页面需默认用极速核，增加标签：
```html
<meta name="renderer" content="webkit">
```

- 若页面需默认用ie兼容内核，增加标签：
```html
<meta name="renderer" content="ie-comp">
```

- 若页面需默认用ie标准内核，增加标签：
```html
<meta name="renderer" content="ie-stand">
```

content的取值为webkit,ie-comp,ie-stand之一，区分大小写，分别代表用webkit内核，IE兼容内核，IE标准内核。