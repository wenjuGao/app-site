---
layout: article
title: http协议
description: 
img: https://qiniu.gaowenju.com/app-site/img/action-scope.jpg-watermark
header: https://qiniu.gaowenju.com/app-site/img/action-scope-header.jpg-watermark
date: 2023-04-01 12:12:12
category: 面试
tags:
  - 面试
  - http
---


### Http/0.x

**特性：**

- 不支持多种类型文件下载：只能获取html文件（没有请求和响应头，浏览器只能按照协议规定视为html解析）
- 限定了数据传输方式：简单的ASCII字节码传输方式（因为服务端返回都是html格式文件）
- 不需要考虑连接复用问题（每次请求只有一个html）


### http/1.0

**特性：**

- 最大改进是增加了请求头和响应头（有了头部kv的标识，就可以约定和协商）
- 对于头部信息的利用（增加了POST/HEAD方法、主动声明keep-alive、状态码、支持文件压缩、文件编码、用户代理、缓存机制…）

**缺点：**

- TCP链接不能共用（创建和断开tcp连接的开销大，每次通信独占一个连接，每个请求都需要经过创建、断开TCP连接过程，连续的两个请求至少浪费3个RTT耗时，http1.0如果共用连接需要在请求和响应头同时设置Connection: keep-alive）
- 不能够支持服务端虚拟主机技术（一个服务器多个host）
- 动态内容支持不友好（浏览器接收数据需要依赖服务端响应头的Content-Length字段，服务端必须提前知道内容长度，否则导致浏览器不知道何时结束)
- http队头阻塞问题（只支持串联通信，每个http请求必须等待前一个请求结束在开始，如果前一个请求丢包或其他原因没有响应，下一个请求必须等待）


### http/1.1

**特性：**

- 增加了tcp持久连接和同域名连接共享（默认开启keep-alive，多个请求可共用连接，浏览器为同域名允许同时创建6个tcp持久连接）
- 请求头增加了HOST标识（用于标识当前请求的主机名）
- 使用Chunk transfer 机制解决动态内容支持（服务器会将数据分割若干任意大小的数据块，发送每个数据块时附上上个数据块的长度，最后用零长度的块作为发送数据完成的标志。这样就提供了对动态内容的支持。）
- 尝试使用管线化技术（pipelining）解决队头阻塞问题（在同一个tcp连接中并发发起多个请求，但是服务端依然要按照顺序接收）
- 引入了安全策略
- 引入了cookie机制等

**缺点：**

- 不能充分利用带宽资源
	- 由于TCP的网络拥塞控制策略（为了保护减少网络拥塞，tcp采用慢启动发送数据，导致带宽不能被最大化利用）
	- 由于TCP的流量控制(滑动窗口)导致多条tcp连接带宽资源抢占问题（虽然增加了持久连接，同域名连接共享来使用cdn域名分片加速，但同一时间连接个数的也将抢占固定的带宽）
- http队头阻塞问题（虽然1尝试使用管线技术解决并发问题，但是服务端依然按照顺序接收，所以最终放弃，选择建立6个连接，但是同连接下的请求依然是阻塞排队发送）
- 多个请求阻塞问题（同域名可以连接共享，但请求数量大于6个时，请求依然需要队列等待）
- 资源加载优先级问题（队头阻塞问题也会导致关键资源的加载滞后问题，影响首次渲染）

### http/2

**特性：**

- 引入了二进制分帧层(多路复用)
	- 多路复用multiplexing（在应用层和传输层之间添加了二进制分帧层实现同域一个连接共享，二进制分帧层将请求头请求体编号分帧处理，服务端接收帧后按编号合并处理返回）
	- 请求优先级的设置（由于二进制分帧层的灵活性，可以标记额外帧信息，服务端也可以根据接收的关键资源顺序进行响应）
- 数据加密传输
- 添加了服务端推送能力
- 头部压缩

**缺点：**

- 单个TCP+TLS建立连接RTT耗时问题依然存在（3个RTT）
- TCP队头阻塞依然存在（tcp的数据丢失重传机制导致）

### http/3

- 基于UDP传输层协议QUIC
	- 优化了创建连接，减少RTT个数（0个或1个RTT，基于QUIC减少了 TCP 三次握手及 TLS 握手时间）
	- 改进的拥塞控制（QUIC使用了TCP 协议的 Cubic 拥塞控制算法，具体看参照QUCI原理分析文章）
	- 共享连接并发（实现了同一物理连接上的多个逻辑数据流并行）
	- Quic的丢包重传机制（数据包编号严格递增保证唯一+stream offset保证有序传输）



### https

**HTTP的缺点**

- 通信使用明文，不进行加密，内容可能被窃听
- 不验证通信方身份，可能遭遇伪装
- 无法验证报文完整性，可能遭到篡改

**SSL**

- 通过增加一层SSL（Secure Socket Layer）或TLS（Transport Layer Security）
- 使用权威的第三方机构也就是CA向安全的服务器颁发证书。来证明这台服务器的合法性。
- 服务器通过这个证书来把自己的公钥加密以后发给客户端
- 客户端收到这个加密后的公钥以后 ，就用第三方机构的公钥 把这个服务器返回的加密后的公钥 解密 从而得到真正的服务器 的公钥

**完整性保护**

- 为了防止篡改通常使用MD5或SHA-1确定报文的完整性


UDP:两次握手
TCP：连接三次握手/四次握手，TCP可靠协议

### 参考文章
[HTTP的演进之路](https://zhuanlan.zhihu.com/p/50879185)


总结

	1. Http/0.x：ASCII字节码传输
	1. Http/1.0：增加了请求头和响应头（POST、HEAD、状态码、支持文件压缩、文件编码、用户代理、缓存机制…）
	1. Http/1.1：默认开启keep-alive、增加HOST标识、尝试使用管线化技术（pipelining）解决队头阻塞问、引入cookie机制
	1. Http/2：二进制分帧层(多路复用)
	1. Http/3：基于UDP传输层协议QUIC