---
date: 2024-08-30 13:44:49
title: docker 安装及卸载redis
description: 
img: https://qiniu.gaowenju.com/app-site/
header: https://qiniu.gaowenju.com/app-site/
banner: false
category: 
tags: 
---


### docker 安装及卸载redis

前置条件：
1. docker环境
   检查：
```shell
docker -v
```
#### 安装

##### 1. Docker 下载redis镜像

```shell
docker pull redis
```


##### 2. 创建redis容器并运行

```shell
docker run -itd --name redis -p 6379:6379 redis --requirepass "123456"
```

```shell
## 通过Docker命令进入Mysql容器内部
docker exec -it redis /bin/bash
## 或者
docker exec -it redis bash
```
