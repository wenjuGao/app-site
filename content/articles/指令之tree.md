---
layout: article
title: window指令之tree
description: tree 命令显示当前文件夹的目录结构，这是一个非常有用的命令，可以帮我们迅速了解当前目录的结构
img: app-site/img/action-scope.jpg
header: site/img/action-scope-header.jpg
date: 2023-04-01 12:12:12
banner: true
category: 工具
tags:
  - tree
  - 工具
---


```
PS D:\****> tree /?
以图形显示驱动器或路径的文件夹结构。

TREE [drive:][path] [/F] [/A]

   /F   显示每个文件夹中文件的名称。
   /A   使用 ASCII 字符，而不使用扩展字符。
```

tree [drive:][path] [/F][/a]

### 参数

- drive 盘符
- path 文件路径
- /F 递归列出所有文件
- /A 只查看文件夹, 忽略文件

```
D:\**********>tree
卷 **** 的文件夹 PATH 列表
卷序列号为 *****
D:.
├─.vscode
├─chart
│  └─D3
├─flutter
├─img
│  ├─css
│  ├─d3
│  │  └─vue-d3
│  ├─leetcode
│  └─web
├─javascript
├─svg
├─template
│  ├─vue2-ant
│  ├─vue2-d3
│  ├─vue2-element
│  └─vue3-ant
├─vue
├─webpack
├─window
```

### tree /F > tree.txt

生成的文件目录树形结构写入到 tree.txt

### tree /A > tree.txt

查看文件夹,忽略文件

### 路径

tree D:/a > D:/b/tree.txt
把 D 盘下 a 的目录机构接到 D 盘下 b 文件的 tree.txt 文件中
如果指定的目录中已经存在该文件则覆盖

以上是 window 中 tree，给我提供的方法了，但是很多时候，这指令似乎有些不公用，比如：
我们在生成目录是希望忽略包文件的目录，
有时我们要不并不是所有目录机构

我们可以借助 node 的一些包辅助我们完成上面的需求：

1. [tree-node-cli](https://www.npmjs.com/package/tree-node-cli)
2. [tree-cli](https://www.npmjs.com/package/tree-cli)

### tree-node-cli

为了避免和系统的 tree 命令冲突,需要用 treee 代替 tree
安装 npm install -g tree-node-cli 或者 yarn add global tree-node-cli ​ 

```
PS D:\******> treee -h
Usage: tree [options]

Options:
  -V, --version             output the version number
  -a, --all-files           All files, include hidden files, are printed.
  --dirs-first              List directories before files.
  -d, --dirs-only           List directories only.
  -I, --exclude [patterns]  Exclude files that match the pattern. | separates alternate patterns. Wrap your entire pattern in double quotes. E.g. `"node_modules|coverage".
  -L, --max-depth <n>       Max display depth of the directory tree.
  -r, --reverse             Sort the output in reverse alphabetic order.
  -F, --trailing-slash      Append a '/' for directories.
  -h, --help                display help for command
```

```
-V, --version 输出版本号
-a, --all-files 打印所有文件，包括隐藏文件
--dirs-first 目录在前，文件在后
-d, --dirs-only 仅列出目录
-I, --exclude [patterns] 排除与模式匹配的文件。用 | 隔开,用双引号包裹。 例如 “node_modules|.git”
-L, --max-depth <n> 目录树的最大显示深度
-r, --reverse 按反向字母顺序对输出进行排序
-F, --trailing-slash 为目录添加'/'
-h, --help 输出用法信息
```

#### tree -L 2

L 表示 level，表示的是目录的层级，n 表示目录的第几个层级

#### tree -d -L 1

d 表示 directory，只显示目录名，不显示文件名

#### tree -I 'node_modules'

I 表示 ignore，忽略指定的文件或者文件夹

### tree-cli

为了避免和系统的 tree 命令冲突,需要用 treee 代替 tree
安装 npm install -g tree-cli 或者 yarn add global tree-cli

```
PS D:\******> treee -h

  OPTIONS:

  --help, -h
    outputs a verbose usage listing.
  --version
    outputs the version of tree-cli.
  --debug
    show debug info.
  --ignore
    ignores directory or file you specify.
  --base
    specify a root directory. Relative path from cwd root and absolute path are both acceptable.
  --fullpath
    prints the full path prefix for each file.
  --noreport
    omits printing of the file and directory report at the
    end of the tree listing and omits printing the tree on
    console.
  -a
    all files are printed. By default tree does not print
    hidden files (those beginning with a dot '.'). In no
    event does tree print the file system constructs '.'
    (current directory) and '..' (previous directory).
  -d
    list directories only.
  --directoryFirst
    list directories first.
  -f
    append a '/' for directories, a '=' for socket files
    and a '|' for FIFOs
  -i
    makes tree not print the indentation lines, useful
    when used in conjunction with the -f option.
  -l
    max display depth of the directory tree.
  -o
    send output to filename.

```

```
  --help, -h 输出用法信息
  --version 输出版本号
  --debug debug信息
  --ignore 忽略文件或者文件夹
  --base 指定根目录,支持相对路径或者绝对路径
  --fullpath 每个文件均打印全路径
  --noreport 不打印文件及文件夹的总数
  -a 默认是不打印以'.'或者'..'开头的文件或者文件夹，-a则打印所有包括'.'或者'..'开头的
  -d 只打印文件夹
  --directoryFirst 只打印顶级文件夹
  -f  为目录追加一个“/”，为套接字文件追加一个“=”和一个“|”表示FIFOs
  -i 不打印缩进线，一般与-f选项一起使用时生成平级目录
  -l 目录树的最大显示深度
  -o 打印内容导成文件

```

博客: [小书童博客](http://gaowenju.com/)(http://gaowenju.com/)

公号: 坑人的小书童
![坑人的小书童](qrcode.jpg)
