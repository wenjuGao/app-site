---
date: 2024-08-30 13:44:49
title: docker 安装及卸载mysql
description: 
img: /img/action-scope.jpg
header: /img/action-scope-header.jpg
banner: false
category: 
tags: 
---


### docker 安装及卸载mysql

前置条件：
1. docker环境
   检查：
```shell
docker -v
```
#### 安装

##### 1. Docker 下载Mysql镜像

```shell
docker pull mysql
```


##### 2. 创建Mysql容器并运行

```shell
docker run -itd --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql
```

```shell
## 通过Docker命令进入Mysql容器内部
docker exec -it mysql /bin/bash
## 或者
docker exec -it mysql bash
```

##### 3. 登录mysql

```shell
#进入容器
docker exec -it mysql bash
#登录mysql（输入密码）
mysql -u root -p
#添加用户
ALTER USER 'root'@'localhost' IDENTIFIED BY 'Test123#';
#添加远程登录用户
CREATE USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'Link123!';
#设置远程连接权限
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%';
#刷新权限
flush privileges;
```

查看用户表

```shell
#进入到mysql
use mysql;
select host, user, plugin from user;
```

+-----------+------------------+-----------------------+
| host      | user             | plugin                |
+-----------+------------------+-----------------------+
| %         | root             | mysql_native_password |
| localhost | mysql.infoschema | caching_sha2_password |
| localhost | mysql.session    | caching_sha2_password |
| localhost | mysql.sys        | caching_sha2_password |
| localhost | root             | caching_sha2_password |
+-----------+------------------+-----------------------+


#### 卸载

1. 停止&删除容器

```shell
# 查看容器
docker ps
# 停止容器 容器ID
docker stop ID
# 删除容器
docker rm ID
```

2. 删除镜像

```shell
# 查看镜像
docker images
# 删除镜像 镜像ID
docker rmi ID
```
