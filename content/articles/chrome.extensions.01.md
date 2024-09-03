---
layout: article
title: SpiderBag一个帮助你了解自己的浏览器插件
description: 使用离线方式帮助你记录和分析浏览器记录，也支持你随手收藏网页图片或者页面内容。本文简要介绍了项目的最开始的idea和工具选择。
img: site/banner/ChromeExtensionsHeader.png
header: site/banner/ChromeExtensions.png
date: 2024-07-08 12:12:12
category: chrome
tags:
  - chrome extension
  - 浏览器插件
---


## SpiderBag一个帮助你了解自己的浏览器插件

最近有些精力过剩，潘驴邓小闲，可谓除了“邓”的富有其他都都实现了。苦于没有王干娘这样的复合型人才的帮忙，只能自己琢磨点有意思的事了

<img src="site/chrome/001.jpeg" alt="潘驴邓小闲" class="md:w-3/5 mx-auto my-1.5 rounded" />



### 1. 做什么，有没有搞头

#### 1.1 定位：客户端资源能用就用，服务端资源能省就省

现在大家是全干工程师，可是落实项目的时候，还是有侧重的。因为我一直都是做前端靓仔的，所以自己的产品自然要选择重前端，服务端轻量处理下就好了，而且简化后端逻辑，毕竟自家小产品，请不起王多鱼😂


#### 1.2 需求：离线浏览时长统计

由于在公司内部一直做的是个埋点的产品，除了最常用的PV/UV被使用的最多的数据就是浏览时长和自定义的操作，可以参考[神策](https://www.sensorsdata.cn/)这种商业化的工具。

这种就基于站点出发，记录用户在该站点产生的行为（浏览、点击等）。当在平台查询用户的行为轨迹时，不禁会想换另外一个角度看，用户在多站点产生的行为是没有办法串联在一起的，这些对单个站点也没有什么意义，但是对用户会不会有需求呢？

apple有“屏幕使用时长”，浏览器中似乎没有类似的工具帮忙做用户侧的分析。

再进一步想，基本所有的网站，都要记录你的信息或者轨迹，即使没有自己埋点没有也有谷歌分析和百度统计这样的免费工具可以使用，而作为用户这些数据自己却是无从得知的，有时候过多碎片话的时间分割了精力，一天结束都忘记了今天自己做了什么。

那么做一个类似，“屏幕使用时长”的个工具，来记录用户在浏览中的浏览记录和浏览时长分析，是不是有搞头呢（应该比少林功夫+唱歌跳舞有搞头💪）。

<img src="site/chrome/006.jpeg" alt="少林功夫+唱歌跳舞" class="md:w-2/3 w-full mx-auto my-1.5 rounded" />

**搞个头！！**

什么？想看我的浏览记录！你是想看我P站的口味还是想偷我的种子？！！

<img src="site/chrome/002.jpeg" alt="浏览记录" class="md:w-3/5 mx-auto my-1.5 rounded" />

**那么离线的呢？数据只保存在本地拿这样是不是就安心多了，有没有搞头？**

每天刷的那么多 ~~种子~~ 网页，本地处理十万级别的报表，我你说有没有搞头？

<img src="site/chrome/003.jpeg" alt="浏览记录" class="md:w-1/3 w-2/3 mx-auto my-1.5 rounded" />

那支持用户设置最大数据存储时长，最长3个月，三个月以前的数据就清除掉。数据的计算可以使用WebAssembly引入其他语言解决，嘿嘿嘿，这不就可以在项目里面使用Rust尝尝鲜了吗。

<img src="site/chrome/007.jpeg" alt="少林功夫+足球" class="md:w-2/3 w-full mx-auto my-1.5 rounded" />

**有搞头**

### 2. 怎么做

#### 2.1 实现方式：浏览器插件

我们的主体需求是记录用户浏览行为，现在普遍的形式是在站点引入埋点的JS文件，而我们的需求下指望用户或者开发者插入js是不是不太现实的。那还有什么方式能获取到用户浏览行为呢？

这嗑唠的不加绕回主题了吗，浏览器插件（[chrome插件文档](https://developer.chrome.com/docs/extensions)）,在浏览器插件中我们可以通过浏览器提供的api在页面变更或者新建、切换tab时获取到tab和窗口的信息，这样就可以记录浏览历史和浏览记录了

#### 2.2 离线数据存储

问：客户端存储方案有哪些？
答：cookies、Web Storage（sessionStorage、localStorage）、IndexedDB。[客户端存储方案](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Client-side_web_APIs/Client-side_storage)

<img src="site/chrome/004.jpg" alt="浏览记录" class="md:w-1/3 w-1/2 mx-auto my-1.5 rounded" />

怎么选呢？我当然选东莞仔啦，他跨栏最帅的嘛
<img src="site/chrome/005.jpeg" alt="东莞仔" class="md:w-5/6 w-full mx-auto my-1.5 rounded" />

考虑到数据量（十万级别），方便查询的机构数据。满足这两点的就只有IndexedDB了

#### 2.3 用户标识及其他点缀功能

对插件而言单一功能是会让产品更简洁，但是我们既然已经获取了浏览记录，把浏览记录看做浏览器自身浏览记录，那书签也是基于浏览记录发起的也可以加进来，另外作为前端开发者，URL或者内容转到手机这种场景也会常常需要，按基于浏览记录可以也吧二维码的功能加进来那产品的全貌基本就成型了：

<img src="site/chrome/20240955.png" alt="功能" class="w-full mx-auto my-1.5 rounded" />

[power by excalidraw](https://excalidraw.com/#json=gTBlalrkzjQ9lb6CIJXLq,F_O04xbqjWpQERv9QzW7gw)


#### 2.4 产品对标及技术选项

又名~~抄~~借鉴谁的产品，~~抄什么家伙~~用什么工具库。

##### 产品对标
- 浏览记录 => [chrome历史记录](chrome://history/)
- 书签 => [掘金闪念笔记](https://juejin.cn/extension)

##### 工具选择

1. 客户侧
- webpack
- Reat+antd
- jsstore、fingerprintjs等

2. 服务侧
- nextjs、apollo/server
- mysql、graphql、typeorm

<img src="site/chrome/20240956.png" alt="服务侧" class="w-full mx-auto my-1.5 rounded" />

[power by excalidraw](https://excalidraw.com/#json=OiiE2XwCE_6L1sfpokuS5,X806H0I4veB-LeLiCh-mAg)


### 3. 前戏结束，正文开始

#### 3.1 插件项目搭建

**搭建插件项目,要做些什么**

简单了解些浏览器插件(v3)包括些什么东西：

1. manifest.json 用户配置权限、指定操作对应的文件、语言、插件作用的域名、icon等
1. service_worker.js（v2的background.js）在[Web Workers](https://developer.mozilla.org/zh-CN/docs/Web/API/Worker)中运行的脚本，它不会阻塞作用站点
1. content_scripts 配置向作用站点注入的js文件
1. side_panel 配置侧边加载的页面
1. options_page 配置页面
1. 支持打开自定义页面
更多浏览器插件配置就方案的介绍可以参考[chrome浏览器插件文档](https://developer.chrome.com/docs/extensions/reference)，或者参考(了解chrome浏览器插件)[./chrome.extensions.02.md]

从工程化角度，可以把插件的项目的需求分为Js 脚本和页面，换种方式就是我们要做的就是编译 js （service_worker.js、content_scripts）和 React 页面（配置页面及自定义页面等）：

1. 拷贝代码到指定目录

- 插件的配置文件manifest.json无需做任何处理，直接拷贝到指定目录
- service_worker设置的js文件，编译之后拷贝到指定目录

2. react项目编译

- 指定多个入口文件输出到指定目录
- scss编译
- 图片处理


3. 热更新问题
插件的热更新和页面的热更新不同，热更新分部分




##### 3.2 服务侧项目搭建