---
layout: article
title:  好用的生僻属性
description:  好用的生僻属性
img: app-site/img/action-scope.jpg
header: app-site/img/action-scope-header.jpg
date: 2023-08-28 21:49:01
category: css
tags:
  - css
---

## 好用的生僻属性

>>> writing-mode：文本水平或垂直排布以及在块级元素中文本的行进方向；
>>> font-variant-numeric：控制数字，分数和序号标记的替代字形的使用；
>>> user-select：用户选中或者不选中；
>>> clip-path：部分区域可以显示的剪切区域；
>>> shape-outside：定义了一个可以是非矩形的形状；
>>> background-clip：设置元素的背景是否扩展到其border 、padding 或content 框之下； 

### writing-mode

  writing-mode 属性定义了文本水平或垂直排布以及在块级元素中文本的行进方向。为整个文档设置书时，应在根元素上设置它（对于 HTML 文档应该在 html 元素上设置）。 
```
/* 关键值 */ 
writing-mode: horizontal-tb; 
writing-mode: vertical-rl; 
writing-mode: vertical-lr; 

/* 全局值 */ 
writing-mode: inherit; 
writing-mode: initial; 
writing-mode: unset;
```
  将 write-mode 属性指定为下面列出的值之一。水平流动方向也受脚本的方向影响，从左到右（ltr，类似于英语和大多数其他语言）或从右到左（rtl，类似于希伯来语或阿拉伯语）。
- **horizontal-tb**：对于左对齐(ltr)脚本，内容从左到右水平流动。对于右对齐(rtr)脚本，内容从右到左水平流动。下一水平行位于上一行下方。
- **vertical-rl**：对于左对齐(ltr)脚本，内容从上到下垂直流动，下一垂直行位于上一行左侧。对于右对齐(rtr)脚本，内容从下到上垂直流动，下一垂直行位于上一行右侧。
- **vertical-lr**：对于左对齐(ltr)脚本，内容从上到下垂直流动，下一垂直行位于上一行右侧。对于右对齐(rtr)脚本，内容从下到上垂直流动，下一垂直行位于上一行左侧。
- **sideways-rl**：对于左对齐(ltr)脚本，内容从下到上垂直流动。对于右对齐(rtr)脚本，内容从上到下垂直流动。所有字形（即使是垂直脚本中的字形）都朝向右侧。
- **sideways-lr**：对于左对齐(ltr)脚本，内容从下到上垂直流动。对于右对齐(rtr)脚本，内容从上到下垂直流动。所有字形（即使是垂直脚本中的字形）都朝向右侧。

  ![writing-mode](app-site/img/css/writing-mode.png 'writing-mode')

  [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/writing-mode)


### font-variant-numeric
    控制数字，分数和序号标记的替代字形的使用
```
font-variant-numeric: normal;
font-variant-numeric: ordinal;
font-variant-numeric: slashed-zero;
font-variant-numeric: lining-nums;         /* <numeric-figure-values> */
font-variant-numeric: oldstyle-nums;       /* <numeric-figure-values> */
font-variant-numeric: proportional-nums;   /* <numeric-spacing-values> */
font-variant-numeric: tabular-nums;        /* <numeric-spacing-values> */
font-variant-numeric: diagonal-fractions;  /* <numeric-fraction-values> */
font-variant-numeric: stacked-fractions;   /* <numeric-fraction-values> */
font-variant-numeric: oldstyle-nums stacked-fractions;

/* Global values */
font-variant-numeric: inherit;
font-variant-numeric: initial;
font-variant-numeric: unset;

```

  ![font-variant-numeric](app-site/img/css/1.gif 'font-variant-numeric')

- font-variant-numeric是font-feature-settings组属性的一部分；
- 诸如font-variant-caps或font-variant-ligatures之类的属性也属于该组；
- 像所有font-feature-settings属性一样，你的字体需要实现上述功能才能正常工作；

  [MDN文档](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric)

### user-select
  控制用户能否选中文本。除了文本框内，它对被载入为 chrome 的内容没有影响。
```
/* Keyword values */
user-select: none;
user-select: auto;
user-select: text;
user-select: contain;
user-select: all;

/* Global values */
user-select: inherit;
user-select: initial;
user-select: unset;

/* Mozilla-specific values */
-moz-user-select: none;
-moz-user-select: text;
-moz-user-select: all;

/* WebKit-specific values */
-webkit-user-select: none;
-webkit-user-select: text;
-webkit-user-select: all; /* Doesn't work in Safari; use only
                             "none" or "text", or else it will
                             allow typing in the <html> container */

/* Microsoft-specific values */
-ms-user-select: none;
-ms-user-select: text;
-ms-user-select: element;
```
- user-select 不是继承属性，即使默认的属性值 auto 的表现基本上以继承为主，似乎是继承属性。甚至，WebKit/基于 Chromium 的浏览器在实现此属性时将其作为继承属性，但这和有关规范是相悖的，且会带来一些问题。目前，Chromium 暂时选择修复将其作为继承属性所带来的问题，使最终表现符合规范。
- **none**：元素及其子元素的文本不可选中。 请注意这个Selection 对象可以包含这些元素。 从Firefox 21开始， none 表现的像 -moz-none，因此可以使用 -moz-user-select: text 在子元素上重新启用选择。
- **auto**:auto 的具体取值取决于一系列条件，具体如下：
  - 在 ::before 和 ::after 伪元素上，采用的属性值是 none;
  - 如果元素是可编辑元素，则采用的属性值是 contain;
  - 否则，如果此元素的父元素的 user-select 采用的属性值为 all，则该元素采用的属性值也为 all;
  - 否则，如果此元素的父元素的 user-select 采用的属性值为 none，则该元素采用的属性值也为 none;
  - 否则，采用的属性值为 text
- **text**：用户可以选择文本。
- **all**：在一个HTML编辑器中，当双击子元素或者上下文时，那么包含该子元素的最顶层元素也会被选中。
- **contain**：允许在元素内选择；但是，选区将被限制在该元素的边界之内。
- **element（IE 专有别名）**：与 contain 相同，但仅在 Internet Explorer 中受支持。


  [MDN文档](https://developer.mozilla.org/en-US/docs/Web/CSS/user-select)

### clip-path
  clip-path CSS 属性可以创建一个只有元素的部分区域可以显示的剪切区域。区域内的部分显示，区域外的隐藏。剪切区域是被引用内嵌的URL定义的路径或者外部svg的路径，或者作为一个形状例如circle().。clip-path属性代替了现在已经弃用的剪切 clip属性

```
/* Keyword values */
clip-path: none;

/* <clip-source> values */ 
clip-path: url(resources.svg#c1);

/* <geometry-box> values */
clip-path: margin-box;
clip-path: border-box;
clip-path: padding-box;
clip-path: content-box;
clip-path: fill-box;
clip-path: stroke-box;
clip-path: view-box;

/* <basic-shape> values */
clip-path: inset(100px 50px);
clip-path: circle(50px at 0 100px);
clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
clip-path: path('M0.5,1 C0.5,1,0,0.7,0,0.3 A0.25,0.25,1,1,1,0.5,0.3 A0.25,0.25,1,1,1,1,0.3 C1,0.7,0.5,1,0.5,1 Z');

/* Box and shape values combined */
clip-path: padding-box circle(50px at 0 100px);

/* Global values */
clip-path: inherit;
clip-path: initial;
clip-path: unset;
```

  ![clip-path](app-site/img/css/2.gif 'clip-path')

- **clip-source**：用 url 表示剪切元素的路径
- **basic-shape**：一种形状，其大小和位置由<几何盒>值定义。如果没有指定几何框，则边框将用作参考框
- **geometry-box**：如果同basic-shape一起声明，它将为基本形状提供相应的参考框盒。通过自定义，它将利用确定的盒子边缘包括任何形状边角（比如说，被 border-radius 定义的剪切路径）。几何框盒可以有以下的值中的一个：
  - margin-box->使用 margin box 作为引用框。
  - border-box->使用 border box 作为引用框。
  - padding-box->使用 padding box 作为引用框。
  - content-box->使用 content box 作为引用框。
  - fill-box->利用对象边界框作为引用框。
  - stroke-box->使用笔触边界框（stroke bounding box）作为引用框
  - view-box->使用最近的 SVG 视口（viewport）作为引用框。如果viewBox 属性被指定来为元素创建 SVG 视口，引用框将会被定位在坐标系的原点，引用框位于由 viewBox 属性建立的坐标系的原点，引用框的尺寸用来设置 viewBox 属性的宽高值。
- **none**：不创建的剪切路径。
- circle(radius at pair)值有两个参数，第一个参数是圆的半径，第二个参数是表示圆心的点。polygon(pair, pair, pair ...)值取3个或更多的点，表示一个三角形、一个矩形等等。



  [MDN文档](https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path)

### shape-outside
  shape-outside的CSS 属性定义了一个可以是非矩形的形状，相邻的内联内容应围绕该形状进行包装。 默认情况下，内联内容包围其边距框; shape-outside提供了一种自定义此包装的方法，可以将文本包装在复杂对象周围而不是简单的框中。指定使用下面列表的值来定义浮动元素的浮动区域。这个浮动区域决定了行内内容（浮动元素）所包裹的形状。

```
/* 关键字值 */
shape-outside: none;
shape-outside: margin-box;
shape-outside: content-box;
shape-outside: border-box;
shape-outside: padding-box;

/* 函数值 */
shape-outside: circle();
shape-outside: ellipse();
shape-outside: inset(10px 10px 10px 10px);
shape-outside: polygon(10px 10px, 20px 20px, 30px 30px);

/* <url> 值 */
shape-outside: url(image.png);

/* 渐变值 */
shape-outside: linear-gradient(45deg, rgba(255, 255, 255, 0) 150px, red 150px);

/* 全局值 */
shape-outside: initial;
shape-outside: inherit;
shape-outside: unset;
```

- **none** : 该浮动区域不产生影响，行内元素以默认的方式包裹着该元素的margin box。
- **shape-box** : 根据浮动元素的边缘（通过 CSS box model 来定义）形状计算出浮动的区域。可能是 margin-box, border-box, padding-box, 或者 content-box。这个形状包括了由 border-radius 属性制造出来的弧度（与 background-clip 的表现类似）。
  - margin-box : 定义一个由外边距的外边缘封闭形成的形状。这个形状的角的半径由相应的border-radius 和margin 的值决定。如果 border-radius / margin 的比率大于等于 1 , 那么这个 margin box 的角的弧度就是 border-radius + margin ；如果比率小于 1，那么这个 margin box 的角的弧度就是 border-radius + (margin * (1 + (ratio-1)^3)) 。
  - border-box: 定义一个由边界的外边缘封闭形成的形状。 这个形状遵循正常的边界外部圆角的形成规则。
  - padding-box : 定义一个由内边距的外边缘封闭形成的形状。这个形状遵循正常的边界内部圆角的形成规则。
  - content-box : 定义一个由内容区域的外边缘封闭形成的形状（译者：表述的不太好，就是被padding包裹的区域，在chrome控制台中的盒子模型图中的蓝色区域。）。每一个角的弧度取 0 或 border-radius - border-width - padding 中的较大值。
- **basic-shape** :基于 inset()， circle()， ellipse()， 或者 polygon()其中一个创造出来的形状计算出浮动区域。如果同时存在 shape-box ，那么会为 basic-shape 方法定义一个参考盒，这个参考盒默认为 margin-box 。
- **image** :提取并且计算指定 image 的alpha通道得出浮动区域（译者：即根据图片的非透明区域进行包裹）。就跟通过 shape-image-threshold来定义一样。


当在两个  <basic-shape> 之间产生动画时，将会应用以下规则。shape 里的值将会被当成一个简单列表插入。插入列表的值的类型可能是 <length>，<percentage>，或 calc()。如果列表的值不是以上的几种类型，但是都相同的话（如在两个列表的相同位置找到了 nonzero ），那些值会插入到列表中。
- 两个形状必须使用同样的参考盒。
- 如果两个形状都是 ellipse() 或 circle()类型，并且它们的 radii 都没有使用 closest-side 或 farthest-side 关键字，则将两个形状对应值之间的值插入到 shape 方法中。
- 如果两个形状的类型都是 inset()，则将两个形状对应值之间的值插入到 shape 方法中。
- 如果两个形状都是 polygon()， 两个多边形之间有相同的定点数量并且 <fill-rule> 相同，则将两个形状对应值之间的值插入到 shape 方法中。
- 其余所有情况都不会发生插入。

  [MDN文档](https://developer.mozilla.org/en-US/docs/Web/CSS/shape-outside)

### background-clip
  设置元素的背景（背景图片或颜色）是否延伸到边框、内边距盒子、内容盒子下面。
  如果没有设置背景图片（background-image）或背景颜色（background-color），那么这个属性只有在边框（ border）被设置为非固实（soild）、透明或半透明时才能看到视觉效果（与 border-style 或 border-image 有关），否则，本属性产生的样式变化会被边框覆盖。

```
/* Keyword values */
background-clip: border-box;
background-clip: padding-box;
background-clip: content-box;
background-clip: text;

/* Global values */
background-clip: inherit;
background-clip: initial;
background-clip: unset;
```
- **border-box** : 背景延伸至边框外沿（但是在边框下层）。
- **padding-box** : 背景延伸至内边距（padding）外沿。不会绘制到边框处。
- **content-box** : 背景被裁剪至内容区（content box）外沿。
- **text** : 背景被裁剪成文字的前景色

  ![background-clip](app-site/img/css/3.gif 'background-clip')

  [MDN文档](https://developer.mozilla.org/en-US/docs/Web/CSS/background-clip)

### 总结
  ![background-clip](app-site/img/css/9ltj1qqohlcr4ca2klim.png 'background-clip')

###  引用
- [掘金](https://juejin.im/post/5ea8c37fe51d454dc55c8de7)
- [dev.to](https://dev.to/mustapha/7-amazing-css-properties-you-may-not-know-yet-eej)
- [MDN文档](https://developer.mozilla.org/en-US/docs/Web/CSS/)