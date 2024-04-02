---
layout: article
title: pyhon简介及解释器
description: 
img: app-site/img/action-scope.jpg
header: app-site/img/action-scope-header.jpg
date: 2023-04-01 12:12:12
category: pyhon
tags:
  - pyhon
---

> > Python 是一种跨平台的计算机程序设计语言，最初被设计用于编写自动化脚本(shell)。
> > 是完全面向对象的语言。函数、模块、数字、字符串都是对象。
> > 并且完全支持继承、重载、派生、多继承，有益于增强源代码的复用性。除此之外 python 本身被设计为可扩充的，并非所有的特性和功能都集成到语言核心。
> > Python 提供了丰富的 API 和工具，以便程序员能够轻松地使用 C 语言、C++、Cython 来编写扩充模块。Python 编译器本身也可以被集成到其它需要脚本语言的程序内。

### Python 解释器种类

- CPython：C 语⾔开发的解释器，应⽤⼴泛的解释器。
- IPython，基于 CPython 的⼀种交互式解释器。
- PyPy，基于 Python 语⾔开发的解释器。
- Jython，运⾏在 Java 平台的解释器，直接把 Python 代码编译成 Java 字节码执⾏。
- IronPython，运⾏在微软.Net 平台上的 Python 解释器，可以直接把 Python 代码编译
  成.Net 的字节码。

### 下载安装

#### Windows 下的安装：

- <a href="https://www.python.org/downloads/" target="_blank">下载地址</a>
- 安装注意事项
  - 勾选添加到环境变量（add python3.X to path）
  - 路径不要使用中文及空格
- 测试安装成功：cmd python 退出：exit()

#### linux 下开发环境搭建

- 一般云服务器默认会帮安装 Python
  ![python](python/python-02.png 'python')
- linux 上安装多个 python 版本
  - 上传解压安装包：tar xf Python-3.X.X.tar.xz
  - 移动文件夹：mv Python-3.X.X /usr/local/python3
  - 安装依赖：yum install gcc gcc-c++ make zlib\* -y
  - yum install libffi-devel -y
  - 配置前缀：./configure --prefix=/usr/local/python3
  - make
  - make install
  - cd /usr/bin
  - 移除 python 默认连接：mv /usr/bin/python /usr/bin/pythonbak
  - 配置软连接 ln -fs /usr/local/python3/bin/python3 /usr/bin/python3
    ![python](python/python-03.png 'python')

### 执行

- Python 在执行时，首先会将.py 文件中的源代码编译成 Python 的 byte code（字节码），然后再由 Python Virtual Machine（Python 虚拟机）来执行这些编译好的 byte code。
- 这种机制的基本思想跟 Java，.NET 是一致的。然而，Python Virtual Machine 与 Java 或.NET 的 Virtual Machine 不同的，Python 的 Virtual Machine 是一种更高级的 Virtual Machine。这里的高级并不是通常意义上的高级，不是说 Python 的 Virtual Machine 比 Java 或.NET 的功能更强大，而是说和 Java 或.NET 相比，Python 的 Virtual Machine 距离真实机器的距离更远。或者可以这么说，Python 的 Virtual Machine 是一种抽象层次更高的 Virtual Machine。基于 C 的 Python 编译出的字节码文件，通常是.pyc 格式。除此之外，Python 还可以以交互模式运行，比如主流操作系统 Unix/Linux、Mac、Windows 都可以直接在命令模式下直接运行 Python 交互环境。直接下达操作指令即可实现交互操作。

### 编译性语言和解释型语言对比

    编译型语言在程序执行之前，先会通过编译器对程序执行一个编译的过程，把程序转换为机器语言。运

行时就不需要翻译，而直接执行就可以了。最典型的例子就是 C 语言。
解释型语言就是没有这个编译的过程，而是在程序运行的时候，通过编译器对程序做出解释，然后直接
运行，最典型的例子就是 ruby。
由此可知，编译型语言在程序执行之前就已经对程序做出了翻译，所以在运行时就少掉了“翻译”的过
程，所以效率比较高。但是我们不能一概而论，一些解释型语言也可以通过解释器的优化来在对程序做
出翻译时对整个程序做出优化，从而在效率上超过编译型语言。

### Python 保留字符

| and      | exec         | not    |
| :------- | :----------- | :----- |
| assert   | finally      | or     |
| break    | for          | pass   |
| class    | from         | print  |
| continue | global raise |
| def      | if           | return |
| del      | import       | try    |
| elif     | in           | while  |
| else     | is           | with   |
| except   | lambda       | yield  |

### Python 注释

- 单行注释 #
- 多行注释
  - ‘’‘ ‘’’
  - “”“ “””

### Python 定义变量

#### 标识符命名规则

- 由数字、字⺟、下划线组成
- 不能数字开头
- 不能使⽤内置关键字
- 严格区分⼤⼩写

### 数据类型

| 类型                       | 描述                                           | 例子                                                   | 备注                                        |
| :------------------------- | :--------------------------------------------- | :----------------------------------------------------- | :------------------------------------------ |
| str（string/字符串）       | 一个由字符组成的不可更改的有序串行。           | 'a' "b" ""                                             | 在 Python 3.x 里，字符串由 Unicode 字符组成 |
| bytes（字节）              | 一个由字节组成的不可更改的有序串行。           | b'Some ASCII'                                          | 在 Python 2.x 里，bytes 为 str 的一种       |
| list（列表）               | 可以包含多种类型的可改变的有序串行             | [4.0, 'string', True]                                  |                                             |
| tuple（元组）              | 可以包含多种类型的不可改变的有序串行           | (4.0, 'string', True)                                  |                                             |
| set, frozenset             | 与数学中集合的概念类似。无序的、每个元素唯一。 | {4.0, 'string', True}                                  | frozenset([4.0, 'string', True])            |  |
| dict（字典）               | 一个可改变的由键值对组成的无序串行。           | {'key1': 1.0, 3: False}                                |                                             |
| int（整数）                | 精度不限的整数                                 | 42                                                     |                                             |
| float（浮点数）            | 浮点数。精度与系统相关。                       | 3.1415927                                              |                                             |
| complex                    | 复数                                           | 3+2.7j                                                 |                                             |
| bool                       | 逻辑值。只有两个值：真、假                     | True False                                             |                                             |
| builtin_function_or_method | 自带的函数，不可更改也不可增加                 | print input                                            |                                             |
| type（类型）               | 显示某个值的类型，用 type(x)获得               | type(1) -> <class 'int'> type(‘1’) -> <class 'str'>    |                                             |
| range                      | 按顺序排列的数                                 | range(10) ......list(range(10))->[0,1,2,3,4,5,6,7,8,9] |                                             |

![python](python/python-01.png 'python')
