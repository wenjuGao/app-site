---
layout: article
title: 从URL到页面加载完成
description: 
img: app-site/img/action-scope.jpg
header: app-site/img/action-scope-header.jpg
date: 2023-04-01 12:12:12
category: 面试
tags:
  - 面试
  - 浏览器
---

### URL到页面加载完成

1. 读取缓存： 
        
	搜索自身的 DNS 缓存。
	(如果 DNS 缓存中找到IP 地址就跳过了接下来查找 IP 地址步骤，直接访问该 IP 地址。)
2.DNS 解析:将域名解析成 IP 地址
3.TCP 连接：TCP 三次握手，简易描述三次握手
           客户端：服务端你在么？ 
           服务端：客户端我在，你要连接我么？ 
           客户端：是的服务端，我要链接。 
           连接打通，可以开始请求来
4.发送 HTTP 请求
5.服务器处理请求并返回 HTTP 报文
6.浏览器解析渲染页面
7.断开连接：TCP 四次挥手

关于第六步浏览器解析渲染页面又可以聊聊如果返回的是html页面
根据 HTML 解析出 DOM 树
根据 CSS 解析生成 CSS 规则树
结合 DOM 树和 CSS 规则树，生成渲染树
根据渲染树计算每一个节点的信息
根据计算好的信息绘制页面
