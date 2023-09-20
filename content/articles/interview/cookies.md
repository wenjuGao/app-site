---
layout: article
title: cookie
description: cookie之所以存在，是基于HTTP协议是无状态协议（既每次请求都是独立的，无上下文环境的，对应客户端、服务端-主要是服务端是无法区分请求的身份和语境的），引入cookie就是来标记请求者的，cookie虽然有大小限制，因为没有更好的客户端存储API，早期也承担了客户端数据存储的任务，限制的cookie更多用于管理回话状态、个性设置、浏览器行为跟踪，这个就主要取决于开发者约定cookie存储的内容了。
img: https://qiniu.gaowenju.com/app-site/img/action-scope.jpg-watermark
header: https://qiniu.gaowenju.com/app-site/img/action-scope-header.jpg-watermark
banner: true
date: 2023-04-01 12:12:12
category: 面试
tags:
  - 面试
  - cookie
---


#### 使用

1. 创建

cookie的创建动作可以从服务端发起返回给客户端，也可以从客户端发起提交给服务端

- 服务端发起返回给客户端
	```
	Set-Cookie: <cookie名>=<cookie值>;Expires=<过期时间>
	```
	服务端在响应头（response）中添加Set-Cookie告知客户端在其本地设置cookie（该部分操作，一般客户端在解析HTTP请求的响应是自主完成，无需开发者做额外的操作）
- 客户端发起提交给服务端
	```js
	document.cookie = `${cookie名}=${cookie值};${cookie名1}=${cookie值1};`
	```
	注意：通过 JavaScript 创建的 Cookie 不能包含 HttpOnly 标志。（设置了HttpOnly的cookie，客户端通过javascript无法访问）


#### 属性

1. name：cookie名
1. value：cookie值
1. Domain
	- Cookie的作用域：允许携带Cookie的域名
	- 不指定，默认为 origin，不包含子域名
	- 指定，包含子域名
1. Path
	- Cookie的作用域：允许携带Cookie的地址
1. Expires/Max-Age：生命周期
	- 会话期 Cookie：浏览器关闭（关闭所有tab）之后它会被自动删除，不需要指定过期时间（Expires）或者有效期（Max-Age）。注意有些浏览器提供了会话恢复功，使删除的cookie被恢复。
	- 持久性 Cookie：决于过期时间（Expires）或有效期（Max-Age）指定的一段时间
1. size：大小（name和value一起是字符数量）
1. HttpOnly（限制访问）
	- 无法通过Document.cookie访问带有 HttpOnly 属性的cookie
1. Secure（限制访问）
	- 标记为 Secure 的 Cookie 只应通过被 HTTPS 协议加密过的请求发送给服务端
1. SameSite
	- 允许服务器要求某个 cookie 在跨站请求时不会被发送，参数不区分大小写
	- None：客户端会在同站请求、跨站均发送 cookies
	- Strict：只有访问服务端地址与客户端地址时发送 cookie
	- Lax：与Strict一致，但是从外部站点导航至URL时不发送（图片加载、frames、 link等）
1. priority


document.cookie = newCookie;

newCookie是一个键值对形式的字符串：
1. name **(必要)** ：要创建或覆盖的cookie的名字
1. value **(必要)** ：cookie的值
1. end **(必要)** ：最大年龄的秒数 (一年为31536e3， 永不过期的cookie为Infinity) 
1. path **(可选)** ：如果没有定义，默认为当前文档位置的路径
1. domain **(可选)** ：如果没有定义，默认为当前文档位置的路径的域名部分，如果指定了一个域，那么子域也包含在内
1. max-age **(可选)** =max-age-in-seconds 过期时间
1. expires **(可选)** =date-in-GMTString-format 如果没有定义，cookie会在对话结束时过期
1. secure **(可选)**  (cookie只通过https协议传输)

#### 带来的问题

1. 传输负担
- 每次HTTP请求都会携带cookie增加了传输的负担
- 但是话又话又说回来，如果没有更好的方式，来取代cookie这种增加额外数据的形式来标记状态（客户端身份）的方法，cookie带来的传输性能负担也不能称之为问题

2. 安全问题
- 会话劫持和 XSS
- 跨站请求伪造（CSRF）
- 中间人攻击（Man-in-the-middle attack，MitM）
- 会话固定攻击（session fixation attacks）