---
layout: article
title:  docker基础指令
description:  docker指令
img: app-site/img/action-scope.jpg
header: app-site/img/action-scope-header.jpg
date: 2023-08-25 09:35:09
category: docker
tags:
  - docker
---
 


### docker基础指令

```shell
#启动
systemctl start docker

#守护进程重启
sudo systemctl daemon-reload

#重启docker服务 
systemctl restart  docker

#重启docker服务
sudo service docker restart

#关闭docker
service docker stop

#关闭docker 
systemctl stop docker
```


1. 下载镜像
```shell
#查询镜像
docker search  redis
#下载镜像
docker pull mysql
```
1. 查看镜像&容器
```shell
#查看镜像
docker images
#查看容器
docker ps
```

1. 删除镜像&容器
```shell
# 查看容器
docker ps
# 停止容器 容器ID
docker stop ID
# 删除容器
docker rm ID
# 查看镜像
docker images
# 删除镜像 镜像ID
docker rmi ID
# 清除未被容器使用的镜像
docker image prune -a
```

1. 如果启动容器报错，可以通过查询容器日志定位问题
```shell
#查询容器日志  容器ID
docker logs ID
```
2. 运行容器
```shell
#i 标志表示交互式，t 标志代表 tty 镜像ID
docker run -it -d ID
```
2. 进入容器
```shell
#查询容器日志  容器ID
docker exec -it ID 
```
2. 退出容器
```shell
exit
```
