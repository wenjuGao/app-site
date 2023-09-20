---
layout: article
title: SVG
description: 
img: https://qiniu.gaowenju.com/app-site/img/action-scope.jpg-watermark
header: https://qiniu.gaowenju.com/app-site/img/action-scope-header.jpg-watermark
date: 2023-04-01 12:12:12
category: 数据可视化
tags:
  - 数据可视化
  - svg
  - d3js
---


### SVG 简介
- SVG 指可伸缩矢量图形 (Scalable Vector Graphics)
- SVG 使用 XML 格式定义图形
- SVG 与诸如 DOM 和 XSL 之类的 W3C 标准是一个整体


### HTML 页面中的 SVG
#### SVG 文件可通过以下标签嵌入 HTML 文档：&lt;embed&gt;、&lt;object&gt; 或者 &lt;iframe&gt;
- standalone该属性规定此 SVG 文件是否是“独立的”，或含有对外部文件的引用
- standalone="no" 意味着 SVG 文档会引用一个外部文件
- xmlns 属性可定义 SVG 命名空间

### SVG 形状
- 矩形 &lt;rect&gt;
- 圆形 &lt;circle&gt;
- 椭圆 &lt;ellipse&gt;
- 线 &lt;line&gt;
- 折线 &lt;polyline&gt;
- 多边形 &lt;polygon&gt;
- 路径 &lt;path&gt;

#### 图形属性-rect矩形
- x 属性定义左侧位置
- y 属性定义左侧位置
- width 和 height 属性高度和宽度
- style 属性用来定义 CSS 属性
- CSS 的 fill 属性定义矩形的填充颜色（rgb 值、颜色名或者十六进制值）
- CSS 的 fill-opacity 属性定义填充颜色透明度（合法的范围是：0 - 1）
- CSS 的 stroke-width 属性定义矩形边框的宽度
- CSS 的 stroke 属性定义矩形边框的颜色
- CSS 的 stroke-opacity 属性定义笔触颜色的透明度（合法的范围是：0 - 1）
- CSS 的 opacity 属性定义整个元素的透明值（合法的范围是：0 - 1）
- rx 和 ry 属性可使矩形产生圆角
``` html
	<?xml version="1.0" standalone="no"?>
	<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" 
	"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

	<svg width="100%" height="100%" version="1.1"
	xmlns="http://www.w3.org/2000/svg">

	<rect x="20" y="20" rx="20" ry="20" width="250"
	height="100" style="fill:red;stroke:black;
	stroke-width:5;opacity:0.5"/>

	</svg>
```

#### 图形属性-circle圆形
- cx 和 cy 属性定义圆点的 x 和 y 坐标。如果省略 cx 和 cy，圆的中心会被设置为 (0, 0)
- r 属性定义圆的半径
```html
	<?xml version="1.0" standalone="no"?>
	<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" 
	"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

	<svg width="100%" height="100%" version="1.1"
	xmlns="http://www.w3.org/2000/svg">

	<circle cx="100" cy="50" r="40" stroke="black"
	stroke-width="2" fill="red"/>

	</svg>
```

#### 图形属性-ellipse椭圆
- cx 属性定义圆点的 x 坐标
- cy 属性定义圆点的 y 坐标
- rx 属性定义水平半径
- ry 属性定义垂直半径
```html
	<?xml version="1.0" standalone="no"?>
	<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" 
	"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

	<svg width="100%" height="100%" version="1.1"
	xmlns="http://www.w3.org/2000/svg">

	<ellipse cx="240" cy="100" rx="220" ry="30"
	style="fill:yellow"/>

	<ellipse cx="220" cy="100" rx="190" ry="20"
	style="fill:white"/>

	</svg>
```

#### 图形属性-line线条
- x1 属性在 x 轴定义线条的开始
- y1 属性在 y 轴定义线条的开始
- x2 属性在 x 轴定义线条的结束
- y2 属性在 y 轴定义线条的结束
```html
	<?xml version="1.0" standalone="no"?>
	<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" 
	"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

	<svg width="100%" height="100%" version="1.1"
	xmlns="http://www.w3.org/2000/svg">

	<line x1="0" y1="0" x2="300" y2="300"
	style="stroke:rgb(99,99,99);stroke-width:2"/>

	</svg>
```

#### 图形属性-polygon三个边的图形（多边形）
- points 属性定义多边形每个角的 x 和 y 坐标
```html
	<?xml version="1.0" standalone="no"?>
	<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" 
	"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

	<svg width="100%" height="100%" version="1.1"
	xmlns="http://www.w3.org/2000/svg">

	<polygon points="220,100 300,210 170,250 123,234"
	style="fill:#cccccc;
	stroke:#000000;stroke-width:1"/>

	</svg>
```

#### 图形属性-polyline折线
- points 属性定义每个点的 x 和 y 坐标
```html
	<?xml version="1.0" standalone="no"?>
	<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" 
	"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

	<svg width="100%" height="100%" version="1.1"
	xmlns="http://www.w3.org/2000/svg">

	<polyline points="0,0 0,20 20,20 20,40 40,40 40,60"
	style="fill:white;stroke:red;stroke-width:2"/>

	</svg>
```

#### 图形属性-path路径
- M = moveto
- L = lineto
- H = horizontal lineto
- V = vertical lineto
- C = curveto
- S = smooth curveto
- Q = quadratic Belzier curve
- T = smooth quadratic Belzier curveto
- A = elliptical Arc
- Z = closepath
- 以上所有命令均允许小写字母。大写表示绝对定位，小写表示相对定位
```html
	<?xml version="1.0" standalone="no"?>
	<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" 
	"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

	<svg width="100%" height="100%" version="1.1"
	xmlns="http://www.w3.org/2000/svg">

	<path d="M250 150 L150 350 L350 350 Z" />

	</svg>
```

#### SVG 滤镜
- feBlend
- feColorMatrix
- feComponentTransfer
- feComposite
- feConvolveMatrix
- feDiffuseLighting
- feDisplacementMap
- feFlood
- feGaussianBlur
- feImage
- feMerge
- feMorphology
- feOffset
- feSpecularLighting
- feTile
- feTurbulence
- feDistantLight
- fePointLight
- feSpotLight

#### SVG 高斯模糊（必须在 &lt;defs&gt;-definitions  标签中定义 SVG 滤镜）
- &lt;filter&gt; 标签用来定义 SVG 滤镜
- &lt;filter&gt; 标签使用必需的 id 属性来定义向图形应用哪个滤镜
- &lt;filter&gt; 标签必须嵌套在 &lt;defs&gt; 标签内
- stdDeviation 属性可定义模糊的程度
- in="SourceGraphic" 这个部分定义了由整个图像创建效果
```html
	<?xml version="1.0" standalone="no"?>
	<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" 
	"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

	<svg width="100%" height="100%" version="1.1"
	xmlns="http://www.w3.org/2000/svg">

	<defs>
		<filter id="Gaussian_Blur">
			<feGaussianBlur in="SourceGraphic" stdDeviation="20"/>
		</filter>
	</defs>

	<ellipse cx="200" cy="150" rx="70" ry="40"
	style="fill:#ff0000;stroke:#000000;
	stroke-width:2;filter:url(#Gaussian_Blur)"/>

	</svg>
```

### SVG 线性渐变
- &lt;linearGradient&gt; 可用来定义 SVG 的线性渐变
- &lt;linearGradient&gt; 标签必须嵌套在 &lt;defs&gt; 标签内
- 每种颜色通过一个 &lt;stop&gt; 标签来规定。offset 属性用来定义渐变的开始和结束位置
```html
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" 
"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

<svg width="100%" height="100%" version="1.1"
xmlns="http://www.w3.org/2000/svg">

<defs>
	<linearGradient id="orange_red" x1="0%" y1="0%" x2="0%" y2="100%">
		<stop offset="0%" style="stop-color:rgb(255,255,0);
		stop-opacity:1"/>
		<stop offset="100%" style="stop-color:rgb(255,0,0);
		stop-opacity:1"/>
	</linearGradient>
</defs>

<ellipse cx="200" cy="190" rx="85" ry="55"
style="fill:url(#orange_red)"/>

</svg>
```

### SVG 放射性渐变
- &lt;radialGradient&gt; 可用来定义 SVG 的线性渐变
- &lt;radialGradient&gt; 标签必须嵌套在 &lt;defs&gt; 标签内
- 每种颜色通过一个 &lt;stop&gt; 标签来规定。offset 属性用来定义渐变的开始和结束位置
```html
	<?xml version="1.0" standalone="no"?>
	<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" 
	"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

	<svg width="100%" height="100%" version="1.1"
	xmlns="http://www.w3.org/2000/svg">

	<defs>
		<radialGradient id="grey_blue" cx="50%" cy="50%" r="50%"
		fx="50%" fy="50%">
			<stop offset="0%" style="stop-color:rgb(200,200,200);
			stop-opacity:0"/>
			<stop offset="100%" style="stop-color:rgb(0,0,255);
			stop-opacity:1"/>
		</radialGradient>
	</defs>

	<ellipse cx="230" cy="200" rx="110" ry="100"
	style="fill:url(#grey_blue)"/>

	</svg>
```

### SVG 元素
元素|	描述
---|:--:|---:
a|定义超链接
altGlyph|允许对象性文字进行控制，来呈现特殊的字符数据（例如，音乐符号或亚洲的文字）
altGlyphDef|定义一系列象性符号的替换（例如，音乐符号或者亚洲文字）
altGlyphItem|定义一系列候选的象性符号的替换
animate	|随时间动态改变属性
animateColor|	规定随时间进行的颜色转换
animateMotion|	使元素沿着动作路径移动
animateTransform|	对元素进行动态的属性转换
circle	|定义圆
clipPath|	 
color-profile|	规定颜色配置描述
cursor|	定义独立于平台的光标
definition-src|	定义单独的字体定义源
defs|	被引用元素的容器
desc	|对 SVG 中的元素的纯文本描述 - 并不作为图形的一部分来显示。用户代理会将其显示为工具提示。
ellipse	|定义椭圆
feBlend|	SVG 滤镜。使用不同的混合模式把两个对象合成在一起。
feColorMatrix|	SVG 滤镜。应用matrix转换。
feComponentTransfer|	SVG 滤镜。执行数据的 component-wise 重映射。
feComposite|	SVG 滤镜。
feConvolveMatrix|	SVG 滤镜。
feDiffuseLighting|	SVG 滤镜。
feDisplacementMap|	SVG 滤镜。
feDistantLight|	SVG 滤镜。 Defines a light source
feFlood	|SVG 滤镜。
feFuncA	|SVG 滤镜。feComponentTransfer 的子元素。
feFuncB	|SVG 滤镜。feComponentTransfer 的子元素。
feFuncG	|SVG 滤镜。feComponentTransfer 的子元素。
feFuncR	|SVG 滤镜。feComponentTransfer 的子元素。
feGaussianBlur|	SVG 滤镜。对图像执行高斯模糊。
feImage |SVG 滤镜。
feMerge |SVG 滤镜。创建累积而上的图像。
feMergeNode|	SVG 滤镜。feMerge的子元素。
feMorphology|	SVG 滤镜。 对源图形执行"fattening" 或者 "thinning"。
feOffset|	SVG 滤镜。相对与图形的当前位置来移动图像。
fePointLight|	SVG 滤镜。
feSpecularLighting|	SVG 滤镜。
feSpotLight|	SVG 滤镜。
feTile|	SVG 滤镜。
feTurbulence|	SVG 滤镜。
filter|	滤镜效果的容器。
font|	定义字体。
font-face|	描述某字体的特点。
font-face-format|	 
font-face-name|	 
font-face-src	| 
font-face-uri|	 
foreignObject	| 
g	|用于把相关元素进行组合的容器元素。
glyph	|为给定的象形符号定义图形。
glyphRef	|定义要使用的可能的象形符号。
hkern	| 
image|	 
line	|定义线条。
linearGradient|	定义线性渐变。
marker	| 
mask	| 
metadata	|规定元数据。
missing-glyph	 |
mpath	| 
path	|定义路径。
pattern	 |
polygon	|定义由一系列连接的直线组成的封闭形状。
polyline|	定义一系列连接的直线。
radialGradient	|定义放射形的渐变。
rect	|定义矩形。
script|	脚本容器。（例如ECMAScript）
set	|为指定持续时间的属性设置值
stop	| 
style	|可使样式表直接嵌入SVG内容内部。
svg	|定义SVG文档片断。
switch	 |
symbol	| 
text	| 
textPath|	 
title	|对 SVG 中的元素的纯文本描述 - 并不作为图形的一部分来显示。用户代理会将其显示为工具提示。
tref	| 
tspan	 |
use	 |
view	 |
vkern	 |

### demo
```html
	<?xml version="1.0" standalone="no"?>
	<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" 
	"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

	<svg width="100%" height="100%" version="1.1"
	xmlns="http://www.w3.org/2000/svg">

	<rect id="rec" x="300" y="100" width="300" height="100" style="fill:lime"> 
	<animate attributeName="x" attributeType="XML" begin="0s" dur="6s" fill="freeze" from="300" to="0"/> 
	<animate attributeName="y" attributeType="XML" begin="0s" dur="6s" fill="freeze" from="100" to="0"/> 
	<animate attributeName="width" attributeType="XML" begin="0s" dur="6s" fill="freeze" from="300" to="800"/> 
	<animate attributeName="height" attributeType="XML" begin="0s" dur="6s" fill="freeze" from="100" to="300"/> 
	<animateColor attributeName="fill" attributeType="CSS" from="lime" to="red" begin="2s" dur="4s" fill="freeze"/>
	</rect>

	<g transform="translate(100,100)"> 
	<text id="TextElement" x="0" y="0" style="font-family:Verdana;font-size:24; visibility:hidden"> It's SVG!
	<set attributeName="visibility" attributeType="CSS" to="visible" begin="1s" dur="5s" fill="freeze"/>
	<animateMotion path="M 0 0 L 100 100" begin="1s" dur="5s" fill="freeze"/>
	<animateColor attributeName="fill" attributeType="CSS" from="red" to="blue" begin="1s" dur="5s" fill="freeze"/> 
	<animateTransform attributeName="transform" attributeType="XML" type="rotate" from="-30" to="0" begin="1s" dur="5s" fill="freeze"/> 
	<animateTransform attributeName="transform" attributeType="XML" type="scale" from="1" to="3" additive="sum" begin="1s" dur="5s" fill="freeze"/> 
	</text> 
	</g>

	</svg>
```

```html
	<?xml version="1.0" standalone="no"?>
	<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" 
	"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

	<svg width="100%" height="100%" version="1.1"
	xmlns="http://www.w3.org/2000/svg">

	<script>
	function create_a(evt)
	{
	var SVGDoc=evt.getTarget().getOwnerDocument();
	var txt=SVGDoc.getElementById("txt");
	var link=SVGDoc.createElement("a");
	var text_node=SVGDoc.createTextNode("LINK");

	link.setAttributeNS(
	"http://www.w3.org/1999/xlink",
	"xlink:href",
	"http://www.w3schools.com");

	link.appendChild(text_node);
	txt.appendChild(link);
	}
	</script>

	<text id="txt" x="10" y="10">Click on the circle to create a ....</text>
	<circle cx="20" cy="40" r="1.5em" style="fill:blue" onclick="create_a(evt)"/>

	</svg>
```