---
layout: article
title: 浏览器插件项目工程化：使用webpack编译
description: 介绍从项目构建到浏览器api调用，代码组织的完成开发流程。
img: app-site/img/action-scope.jpg
header: app-site/img/action-scope-header.jpg
date: 2024-07-08 12:12:12
category: note
tags:
  - chrome extension
  - 浏览器插件
---


## 浏览器插件项目工程化：使用webpack编译

### 1. 要做些什么
1. 拷贝代码到指定目录
- 插件的配置文件manifest.json无需做任何处理，直接拷贝到指定目录
- service_worker设置的js文件，编译之后拷贝到指定目录
2. react项目编译
- 指定多个入口文件输出到指定目录
- scss编译
- 图片处理


### copy 
- manifest.*.json 根据环境copy到指定目录（extension根目录）
- public下copy到指定目录（extension根目录，保持文件夹和文件名）

### js编译
- worker.js 编译成cmd 输出到指定目录（extension根目录）
- content.js  编译成cmd 输出到指定目录（extension根目录）
- contextMenu.js  编译成cmd 输出到指定目录（extension根目录）
? 公共依赖引用？

### spa页面编译（pages文件夹下）
- content
- debugger
- options
- popup
- sidepanel
- uninstall
- welcome
? 公共依赖引用？

### 热更新
- js编译部分需要属性插件及当前打开的tab
- spa页面编译的部分属性页面


