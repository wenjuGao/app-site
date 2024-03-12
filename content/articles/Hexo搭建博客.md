---
layout: article
title: 博客搭建之Hexo
description: 快速建站工具（主要适用：博客、文档等静态站点），可以将Markdown编写的文章解析成html页面。生成的站点可以无需服务器一键部署到github、gitlab或者gitee上。
img: app-site/img/action-scope.jpg
header: app-site/img/action-scope-header.jpg
date: 2023-04-01 12:12:12
category: 工具
tags:
  - Hexo
  - 工具
---


### Hexo简介

另外Hexo有许多社区提供的：
- plugins(插件)：支持给生成的站点扩展其他能力（例如：评论、文章分类、内容加密、搜索等）；
- themes(主题)：支持使用开源主题或者自定义主题来定制页面布局、风格等；

### Hexo安装

#### 1. 环境依赖：
- nodejs(>12.0)
- git(部署时需要用到)

#### 2. 安装hexo-cli

安装hexo命令工具到全局环境，安装后可以在shell窗口运行hexo命令。

```sh
npm install -g hexo-cli
# or
yarn global add hexo-cli  
```

### Hexo使用

```sh
hexo init demo-folder # 初始化文件夹
cd demo-folder				# 进入文件夹
npm install						# 安装依赖
```

文件夹的目录：
```sh
├── _config.yml			# 配置信息
├── package.json
├── scaffolds				# 模版
├── source					# 资源
|   ├── _drafts				# 草稿
|   └── _posts				# 文章
└── themes					# 主题
```

### 部署（先跑起来再回头看配置）

### 1. 安装 hexo-deployer-git

```sh
npm install hexo-deployer-git --save
```

### 2. 配置_config.yml

```yml
# 发布后的网址
url: http://krdxst.gitee.io/wenju-blog/
# 首页配置
root: /wenju-blog/
# 部署配置
deploy:
- type: git
  repo: git@github.com:wenjuGao/wenju-blog.git # github
  branch: gh-pages
- type: git
  repo: git@gitee.com:krdxst/wenju-blog.git # gitee
  branch: ge-pages
```

### 3. github配置（访问速度可能会慢）

1. 新建仓库

![新建仓库](site/github-newrepository.png)


2. 设置Pages

![新建仓库](site/github-site-pages.png)

3. 部署

```sh
npm run deploy
```

**注意：**
1. 新建仓库时仓库名需要和用户名保持一致不然可能会发布失败（发布之后可以修改）；
2. root会影响资源加载路径；
3. 该部分推送可以使用ssh（公钥推送）和https协议推送，shh需要配置公钥，https首次推送时需要提供github/gitee账号密码；

### 4. gitee配置

1. 新建仓库

![新建仓库](site/gitee-newrepository.png)


2. 设置Pages

![新建仓库](site/gitee-site-pages.png)

3. 部署

```sh
npm run deploy
```

发布后需要手动回到设置Pages页面点击更新。

----

### Hexo配置

[详细配置见官方文档](https://hexo.io/zh-cn/docs/configuration)

以下枚举下常用配置：

|参数|描述|
|--|--|
|title|网站标题|
|subtitle|网站副标题|
|description|网站描述|
|keywords|网站的关键词。支持多个关键词|
|author|作者名称|
|language|语言（多语言是会使用到）zh-CN|
|url|网址|
|root|网站根目录|
|theme|主题名称（自定义主题时会用到）|
|theme_config|主题配置|
|deploy|部署配置|



### Hexo命令

[详细命令见官方文档](https://hexo.io/zh-cn/docs/configuration)

以下枚举下常用命令：

#### 1. new：创建一个新文章（新建一个markdown文件）
```sh
# hexo new [layout] --path [path] --replace [file] --slug [router-name]  <title>
hexo new page  "我的文章"
hexo new page --path about/me "关于我"
hexo new page --slug me-new "文章内容"
```

|参数|描述|
|--|--|
|-p, --path|自定义新文章的路径|
|-r, --replace|如果存在同名文章，将其替换|
|-s, --slug|文章的 Slug，作为新文章的文件名和发布后的 URL|

#### 2. generate：生成静态文件（将markdown文件生产静态的html文件）

source目录下_posts文件夹之外，开头命名为 _ (下划线)的文件、文件夹和隐藏的文件将会被忽略。Markdown 和 HTML 文件会被解析并放到 public 文件夹，而其他文件(图片、字体等其他资源)会被拷贝过去。

```sh
hexo generate
# or
hexo g
```

|参数|描述|
|--|--|
|-d, --deploy|文件生成后立即部署网站|
|-w, --watch|监视文件变动|
|-f, --force|强制重新生成文件(使用该参数的效果接近 hexo clean && hexo generate)|
|-c, --concurrency|最大同时生成文件的数量，默认无限制|


#### 3. publish：发表草稿

```sh
hexo publish [layout] filename
```

#### 4. server：启动本地服务器（开发）

```sh
hexo server
```

|参数|描述|
|--|--|
|-p, --port|重设端口，默认端口4000|
|-s, --static|只使用静态文件|
|-l, --log|启动日记记录，使用覆盖记录格式|

#### 5. deploy：部署


```sh
hexo deploy
# or
hexo d
```

|参数|描述|
|--|--|
|-g, --generate|部署之前预先生成静态文件|


----


![部署完成](site/hexo-default-pages.png)

网站到此就部署完成喽，后面你就可以在source下创建你自定义的md或者html来展示你的内容喽。

当然，如果你觉得默认的样式和布局不是那么满足你的需求，你可以在[这里](https://hexo.io/themes/)找到不同的主题来丰富你的站点，另外还有[这里](https://hexo.io/plugins/)提供的插件来满足你不同的功能需求。
后续这边，关于Hexo，还会整理关于主题插件的使用，主题插件的开发等知识点，欢迎关注公众号[前端小书童](wechat-new.png)来催更！

