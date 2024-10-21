---
layout: article
title: Linux安装MySQL
description: 
img: /img/action-scope.jpg
header: /img/action-scope-header.jpg
date: 2023-04-01 12:12:12
category: 工具
tags:
  - MySQL
  - 工具
---


### 下载

- [https://dev.mysql.com/downloads/mysql/](https://dev.mysql.com/downloads/mysql/ '下载地址')

- 百度云链接：[https://pan.baidu.com/s/1cD5atFH17hno9K242PSVWg](https://pan.baidu.com/s/1cD5atFH17hno9K242PSVWg)
  提取码：l8f3

---

### 安装

### 解压

```
tar -xvf mysql-5.7.XX-linux-glibc2.12-x86_64.tar
```

### 移动并重命名

```
mv mysql-5.7.XX-linux-glibc2.12-x86_64 /usr/local/mysql
```

### 创建 mysql 用户组和用户并修改权限

```
groupadd mysql
useradd -r -g mysql mysql
```

### 创建数据目录并赋予权限

```
mkdir -p  /data/mysql
chown mysql:mysql -R /data/mysql
```

### 配置 my.cnf

```

[mysqld]

skip-grant-tables
bind-address=0.0.0.0
port=3306							# mysql运行端口
user=mysql							# 用户
basedir=/usr/local/mysql			# 程序目录(文件解压的目录)
datadir=/data/mysql					# 数据目录
socket=/tmp/mysql.sock
log-error=/data/mysql/mysql.err
pid-file=/data/mysql/mysql.pid

#character config
character_set_server=utf8mb4
symbolic-links=0
explicit_defaults_for_timestamp=true

```

### 初始化数据库

```
cd /usr/local/mysql/bin/			# 进入mysql的bin目录
./mysqld --defaults-file=/etc/my.cnf --basedir=/usr/local/mysql/ --datadir=/data/mysql/ --user=mysql --initialize
```

### 查看密码

```
cat /data/mysql/mysql.err			# 默认生成的密码
```

### 启动 mysql

```
cp /usr/local/mysql/support-files/mysql.server /etc/init.d/mysql
service mysql start
ps -ef|grep mysql					# 检查mysql运行
```

### 更改 root 密码

```
./mysql -u root -p   #bin目录下
ln -s  /usr/local/mysql/bin/mysql    /usr/bin 		# mysql软连接

SET PASSWORD = PASSWORD('XXXXX');
ALTER USER 'root'@'localhost' PASSWORD EXPIRE NEVER;
FLUSH PRIVILEGES;

use mysql                                            #访问mysql库
update user set host = '%' where user = 'root';      #使root能再任何host访问
FLUSH PRIVILEGES;                                    #刷新

```

-----


## 写入 MySQL 报错超出 max_allowed_packet

> > > > MySQL 会根据配置文件会限制 server 接受的数据包的大小。如果写入大数据时，因为默认的配置太小，插入和更新操作会因为 max_allowed_packet 参数限制，而导致失败。

### 查看当前配置

```
mysql> show variables like 'max_allowed_packet';
+--------------------+---------+
| Variable_name      | Value   |
+--------------------+---------+
| max_allowed_packet | 4194304 |
+--------------------+---------+
1 row in set (0.00 sec)
```

- 也可以用 select 查看：

```
mysql> select @@max_allowed_packet;
+----------------------+
| @@max_allowed_packet |
+----------------------+
|              4194304 |
+----------------------+
1 row in set (0.00 sec)
```

> max_allowed_packet 如果不设置，默认值在不同的 MySQL 版本表现不同，有的版本默认 1M，有的版本默认 4M。

### 修改方法 1（配置文件持久化修改）

```
vim /etc/my.cnf
[mysqld]
max_allowed_packet = 100M

mysql> show variables like '%max_allowed_pack%';
+--------------------+-----------+
| Variable_name      | Value     |
+--------------------+-----------+
| max_allowed_packet | 104857600 |
+--------------------+-----------+
1 row in set (0.00 sec)

```

> 修改配置文件以后，需要重启 mysql 服务才能生效

### 修改方法 2（命令行临时修改）

```
mysql> set global max_allowed_packet = 100 * 1024 * 1024;
mysql> exit
[root@localhost opt]# 
[root@localhost opt]# mysql -uroot
mysql> 
mysql> select @@max_allowed_packet;
+----------------------+
| @@max_allowed_packet |
+----------------------+
|            104857600 |
+----------------------+
1 row in set (0.00 sec)
```

> 需要退出 mysql 控制台才可以查询到设置后的配置

### 注意项

- 命令行修改时，不能用 M、G，只能这算成字节数设置。配置文件修改才允许设置 M、G 单位
- 命令行修改之后，需要退出当前回话(关闭当前 mysql server 链接)，然后重新登录才能查看修改后的值。通过命令行修改只能临时生效，下次数据库重启后又复原了
- max_allowed_packet 最大值是 1G(1073741824)，如果设置超过 1G，查看最终生效结果也只有 1G

```
[mysqld]
max_allowed_packet = 1G

mysql> show variables like '%max_allowed_pack%';
+--------------------+------------+
| Variable_name      | Value      |
+--------------------+------------+
| max_allowed_packet | 1073741824 |
+--------------------+------------+
1 row in set (0.00 sec)
```
