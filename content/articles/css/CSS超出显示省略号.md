---
layout: article
title:  CSS 超出显示省略号
description:  CSS 超出显示省略号
img: https://qiniu.gaowenju.com/app-site/img/action-scope.jpg-watermark
header: https://qiniu.gaowenju.com/app-site/img/action-scope-header.jpg-watermark
date: 2023-08-25 09:35:09
category: css
tags:
  - css
---


实现单行文本的溢出显示省略号主要使通过 css3 属性 text-overflow:ellipsis 来实行。

### 1. 单行文本溢出显示省略号

```css
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
```

---

### 1. 多行文本溢出显示省略号

```css
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 3;
overflow: hidden;
```

1.  因使用了 WebKit 的 CSS 扩展属性，该方法适用于 WebKit 浏览器及移动端；
1.  -webkit-line-clamp 用来限制在一个块元素显示的文本的行数。 为了实现该效果，它需要组合其他的 WebKit 属性。
1.  display: -webkit-box; 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。
1.  -webkit-box-orient 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 。

---

### 1. 伪元素实现

```css
p {
  position: relative;
  line-height: 20px;
  max-height: 40px;
  overflow: hidden;
}
p::after {
  content: '...';
  position: absolute;
  bottom: 0;
  right: 0;
  padding-left: 40px;
  background: -webkit-linear-gradient(left, transparent, #fff 55%);
  background: -o-linear-gradient(right, transparent, #fff 55%);
  background: -moz-linear-gradient(right, transparent, #fff 55%);
  background: linear-gradient(to right, transparent, #fff 55%);
}
```

1.  将 height 设置为 line-height 的整数倍，防止超出的文字露出。
1.  给 p::after 添加渐变背景可避免文字只显示一半。
1.  由于 ie6-7 不显示 content 内容，所以要添加标签兼容 ie6-7（如：<span>…<span/>）；兼容 ie8 需要将::after 替换成:after。
1.  内容未超出时使用 js 隐藏伪元素。
