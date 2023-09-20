---
layout: article
title:  flex布局
description:  flex布局
img: https://qiniu.gaowenju.com/app-site/img/action-scope.jpg-watermark
header: https://qiniu.gaowenju.com/app-site/img/action-scope-header.jpg-watermark
date: 2023-08-28 21:49:01
category: css
tags:
  - css
---

主轴（main axis）、副轴（cross axis）

```html
<div class="box">
	<div class="child"></div>
	<div class="child"></div>
</div>
```

### 父级容器

```css
.box {
	/* 设置为flex容器 */
	display: flex | inline-flex;

	/* 设置主轴的方向 */
	flex-direction: row | row-reverse | column | column-reverse;
	/* 设置容器内项目是否可换行 */
	flex-wrap: nowrap | wrap | wrap-reverse;

	/* 简写 */
	flex-flow: <flex-direction> | <flex-wrap>;

	/* 设置主轴的对齐方式 */
	justify-content: flex-start | flex-end | center | space-between | space-around;
	/* 设置副轴上的对齐方式 */
	align-items: flex-start | flex-end | center | baseline | stretch;
	/* 设置多根轴线的对齐方式，如果项目只有一根轴线，那么该属性将不起作用 */
	align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
```

1.  设置为flex容器：display
- flex: 块元素
- inline-flex: 行内元素

2. 设置主轴的方向：flex-direction
- row：水平从左到右
- row-reverse：水平从右到左
- column：垂直从上到下
- column-reverse：垂直从下到上


2. 设置容器内项目是否可换行：flex-wrap
- nowrap：不换行
- wrap：换行，行从上到下
- wrap-reverse：换行，行从下到上


2. 设置主轴的对齐方式：justify-content
- flex-start 左对齐
- flex-end：右对齐
- center：居中
- space-between：两端对齐，项目之间的间隔相等，即剩余空间等分成间隙
- space-around：每个项目两侧的间隔相等，所以项目之间的间隔比项目与边缘的间隔大一倍

2. 设置副轴的对齐方式：align-items
- flex-start：起点对齐
- flex-end：终点对齐
- center：中点对齐
- baseline: 项目的第一行文字的基线对齐
- stretch：未设置高度或者设为 auto，将占满整个容器的高度

2. 设置多根轴线的对齐方式
- flex-start：轴线全部在副轴上的起点对齐
- flex-end：轴线全部在副轴上的终点对齐
- center：轴线全部在副轴上的中间对齐
- space-between：轴线两端对齐，之间的间隔相等，即剩余空间等分成间隙
- space-around：每个轴线两侧的间隔相等，所以轴线之间的间隔比轴线与边缘的间隔大一倍
- stretch：平分副轴空间

### 子容器

```css
.child {
	/* 容器中的排列顺序，数值越小，排列越靠前，默认值为 0 */
	order: <integer>;

	/* 分配多余空间之前，项目占据的主轴空间，浏览器根据这个属性，计算主轴是否有多余空间 */
	flex-basis: <length> | auto;
	/* 放大比例 */
	flex-grow: <number>;
	/* 缩小比例 */
	flex-shrink: <number>;

	/* 简写 */
	 flex: none | [ <flex-grow> <flex-shrink>? || <flex-basis> ];

	/* 单个元素对齐属性 */
	align-self: auto | flex-start | flex-end | center | baseline | stretch;

}
```

### 等价：

1. flex: 1;

```css
.child {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0%;
}
```

1. flex: 0%;

```css
.child {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0%;
}
```

1. flex: 0;

```css
.child {
    flex-grow: 0;
    flex-shrink: 1;
    flex-basis: 0%;
}
```

1. flex: 10px;

```css
.child {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 10px;
}
```

1. flex: 2 3;

```css
.child {
    flex-grow: 2;
    flex-shrink: 3;
    flex-basis: 0%;
}
```

1. flex: 2 10px;

```css
.child {
    flex-grow: 2;
    flex-shrink: 1;
    flex-basis: 10px;
}
```