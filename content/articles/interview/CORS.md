---
layout: article
title: 跨域
description: 因为浏览器出于安全考虑，有同源策略。也就是说，如果协议、域名或者端口有一个不同就是跨域，Ajax 请求会失败。
img: https://qiniu.gaowenju.com/app-site/img/action-scope.jpg-watermark
header: https://qiniu.gaowenju.com/app-site/img/action-scope-header.jpg-watermark
banner: true
date: 2023-04-01 12:12:12
category: 面试
tags:
  - 面试
  - 跨域
---

## 同源策略

### 1. 同域, 同协议, 同端口:

- 同域即host相同, 顶级域名, 一级域名, 二级域名, 三级域名等必须相同, 且域名不能与 ip 对应;
- 同协议要求, http与https协议必须保持一致;
- 同端口要求, 端口号必须相同.

注：（IE有些例外, 它仅仅只是验证主机名以及访问协议，而忽略了端口号.）


### 2. 限制

- iframe限制：可以访问同域资源, 可读写;访问跨域页面时, 只读.
- Ajax限制
- Script无限制

### 3. 跨域
- 使用代理，web服务器代理转发
- JSONP，回调本地js方法，返回值用参数形式传递
- postMessage实现跨文本档、多窗口、跨域消息传递
	postMessage(data,origin)
	addEventListener('message',{data,source,origin}){}
	- data, 表示父页面传递过来的message
	- source, 表示发送消息的窗口对象
	- origin, 表示发送消息窗口的源(协议+主机+端口号)
```javascript
// send
window.frames[0].postMessage('message', origin)
// get
window.addEventListener('message',function(e){
    if(e.source!=window.parent) return;//若消息源不是父页面则退出
      //TODO ...
});
```
- CORS 跨域访问


### CORS 跨域访问

1. 简单请求(HEAD、GET、POST)

- 浏览器会自动在请求的头信息加上 Origin 字段
- 服务端允许
	如果要发送Cookie，Access-Control-Allow-Origin就不能设为*，必须指定明确的、与请求网页一致的域名
- 服务端拒绝
	当然我们为了防止接口被乱调用，需要限制源，对于不允许的源，服务端还是会返回一个正常的HTTP回应，但是不会带上 Access-Control-Allow-Origin 字段，浏览器发现这个跨域请求的返回头信息没有该字段，就会抛出一个错误，会被 XMLHttpRequest 的 onerror 回调捕获到。
这种错误无法通过 HTTP 状态码判断，因为回应的状态码有可能是200


1. 非简单请求(PUT、DELETE)
- 预检请求(OPTIONS)
- 浏览器的正常请求和回应



为来防止CSRF攻击
1. JSONP
    JSONP 的原理很简单，就是利用 <script> 标签没有跨域限制的漏洞。
    通过 <script> 标签指向一个需要访问的地址并提供一个回调函数来接收数据当需要通讯时。
```html
<script src="http://domain/api?param1=a&param2=b&callback=jsonp"></script>
<script>
    function jsonp(data) {
    	console.log(data)
	}
</script>
```
    JSONP 使用简单且兼容性不错，但是只限于 get 请求。

2. CORS
    CORS 需要浏览器和后端同时支持。IE 8 和 9 需要通过 XDomainRequest 来实现。
3. document.domain
    该方式只能用于二级域名相同的情况下，比如 a.test.com 和 b.test.com 适用于该方式。

    只需要给页面添加 document.domain = 'test.com' 表示二级域名都相同就可以实现跨域
4. webpack配置proxyTable设置开发环境跨域
5. nginx代理跨域
6. iframe跨域
7. postMessage
    这种方式通常用于获取嵌入页面中的第三方页面数据。一个页面发送消息，另一个页面判断来源并接收消息


XDomainRequest是在IE8和IE9上的HTTP access control (CORS) 的实现，在IE10中被 包含CORS的XMLHttpRequest 取代了，如果你的开发目标是IE10或IE的后续版本，或想要支待其他的浏览器，你需要使用标准的HTTP access control。



参考：
[一次弄懂跨域问题](https://segmentfault.com/a/1190000017579464)