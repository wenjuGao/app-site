---
layout: article
title: markdown基本语法
description: 
img: https://qiniu.gaowenju.com/app-site/img/action-scope.jpg-watermark
header: https://qiniu.gaowenju.com/app-site/img/action-scope-header.jpg-watermark
date: 2023-04-01 12:12:12
category: 工具
tags:
  - markdown
  - 工具
---

> Markdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档。
> Markdown 语言在 2004 由约翰·格鲁伯（英语：John Gruber）创建。
> Markdown 编写的文档可以导出 HTML 、Word、图像、PDF、Epub 等多种格式的文档。
> Markdown 编写的文档后缀为 .md, .markdown

### 标题

- 使用 = 和 - 标记一级和二级标题

  ```
    	我展示的是一级标题
    	=================

    	我展示的是二级标题
    	-----------------
  ```

- 使用 # 号标记
- 表示 1-6 级标题，一级标题对应一个 # 号，二级标题对应两个 # 号，以此类推

### 段落格式

1.  文末使用'enter' 回车 重新开启一个段落
1.  字体

    ```
    	*斜体文本*
    	_斜体文本_
    	**粗体文本**
    	__粗体文本__
    	***粗斜体文本***
    	___粗斜体文本___
    ```

1.  分隔线

    - 一行中用三个以上的星号、减号、底线来建立一个分隔线，行内不能有其他东西,可以在星号或是减号中间插入空格

    ```
    ***
    * * *
    *****
    - - -
    ----------
    ```

1.  删除线

    ```
    	~~删除线~~
    ```

1.  下划线

    ```
    	<u>下划线</u>
    ```

1.  脚注

    ```
    	[^脚注]
    	[^脚注]:脚注内容
    ```

### 列表

- 有序列表 \* + -

- 无序列表 数字.

### 区块

- Markdown 区块引用是在段落开头使用 > 符号 ，然后后面紧跟一个空格符号：

### 代码

- 如果是段落上的一个函数或片段的代码可以用反引号把它包起来（`）
- 代码区块使用 4 个空格或者一个制表符（Tab 键）
- 你也可以用 ``` 包裹一段代码，并指定一种语言 <br>
  ![Markdown](https://qiniu.gaowenju.com/markdown/markdown-01.png 'Markdown')

### 链接

```
	[链接名称](链接地址)
	<链接地址>
```

- 高级链接，通过变量来设置一个链接，变量赋值在文档末尾进行：

```
	这个链接用 1 作为网址变量 [gaowenju][1]
	这个链接用 mujinshengwu 作为网址变量 [mujinshengwu][mujinshengwu]
	然后在文档的结尾为变量赋值（网址）

	[1]: http://www.gaowenju.com/
	[mujinshengwu]: http://www.mujinshengwu.com/
```

### 图片

```
	![alt 属性文本](图片地址)
	![alt 属性文本](图片地址 "可选标题")

	[img]

	[img]: https://qiniu.gaowenju.com/markdown/markdown-01.png

```

- Markdown 还可以使用普通的 img 标签

```
	<img src="https://qiniu.gaowenju.com/markdown/markdown-01.png" width="50%">
```

### 表格

1. 使用 | 来分隔不同的单元格，使用 - 来分隔表头和其他行

   ```

   | 表头   | 表头   |
   | ------ | ------ |
   | 单元格 | 单元格 |
   | 单元格 | 单元格 |

   ```

1. 对齐方式

   - -: 设置内容和标题栏居右对齐。
   - :- 设置内容和标题栏居左对齐。
   - :-: 设置内容和标题栏居中对齐。

### 高级技巧

1.  支持的 HTML 元素

    - 不在 Markdown 涵盖范围之内的标签，都可以直接在文档里面用 HTML 撰写 HTML 元素有：

      ```
      <kbd> <b> <i> <em> <sup> <sub> <br> 等
      ```

1.  转义
    - 多特殊符号来表示特定的意义，如果需要显示特定的符号则需要使用转义字符，反斜杠转义特殊字符
    - 支持以下这些符号前面加上反斜杠来帮助插入普通的符号： - \\ 反斜线 - \` 反引号 - \* 星号 - \_ 下划线 - \{\} 花括号 - \[\] 方括号 - \(\) 小括号 - \# 井字号 - \+ 加号 - \- 减号 - \. 英文句点 - \! 感叹号
1.  公式

    - 两个美元符 \$\$ 包裹 TeX 或 LaTeX 格式的数学公式来实现

    ```
    	$$
    	\mathbf{V}_1 \times \mathbf{V}_2 =  \begin{vmatrix}
    	\mathbf{i} & \mathbf{j} & \mathbf{k} \\
    	\frac{\partial X}{\partial u} &  \frac{\partial Y}{\partial u} & 0 \\
    	\frac{\partial X}{\partial v} &  \frac{\partial Y}{\partial v} & 0 \\
    	\end{vmatrix}
    	$$
    ```

    ![数学公式](https://qiniu.gaowenju.com/markdown/markdown-02.png)

1.  画流程图、时序图(顺序图)、甘特图

    - 横向流程图源码格式：

          	```mermaid
          	graph LR
          	A[方形] -->B(圆角)
          		B --> C{条件a}
          		C -->|a=1| D[结果1]
          		C -->|a=2| E[结果2]
          		F[横向流程图]
          	```

![横向流程图](https://qiniu.gaowenju.com/markdown/markdown-10.png)

    - 竖向流程图源码格式：

          	```mermaid
          	graph TD
          	A[方形] --> B(圆角)
          		B --> C{条件a}
          		C --> |a=1| D[结果1]
          		C --> |a=2| E[结果2]
          		F[竖向流程图]
          	```

![竖向流程图](https://qiniu.gaowenju.com/markdown/markdown-09.png)

    - 标准流程图源码格式

          	```flow
          	st=>start: 开始框
          	op=>operation: 处理框
          	cond=>condition: 判断框(是或否?)
          	sub1=>subroutine: 子流程
          	io=>inputoutput: 输入输出框
          	e=>end: 结束框
          	st->op->cond
          	cond(yes)->io->e
          	cond(no)->sub1(right)->op
          	```

![标准流程图源码格式](https://qiniu.gaowenju.com/markdown/markdown-08.png)

    - 标准流程图源码格式（横向）

          	```flow
          	st=>start: 开始框
          	op=>operation: 处理框
          	cond=>condition: 判断框(是或否?)
          	sub1=>subroutine: 子流程
          	io=>inputoutput: 输入输出框
          	e=>end: 结束框
          	st(right)->op(right)->cond
          	cond(yes)->io(bottom)->e
          	cond(no)->sub1(right)->op
          	```

![标准流程图源码格式（横向）](https://qiniu.gaowenju.com/markdown/markdown-07.png)

    - UML 时序图源码样例

          		```sequence
          		对象A->对象B: 对象B你好吗?（请求）
          		Note right of 对象B: 对象B的描述
          		Note left of 对象A: 对象A的描述(提示)
          		对象B-->对象A: 我很好(响应)
          		对象A->对象B: 你真的好吗？
          		```

![时序图源码样例](https://qiniu.gaowenju.com/markdown/markdown-06.png)

    - UML 时序图源码复杂样例

          	```sequence
          	Title: 标题：复杂使用
          	对象A->对象B: 对象B你好吗?（请求）
          	Note right of 对象B: 对象B的描述
          	Note left of 对象A: 对象A的描述(提示)
          	对象B-->对象A: 我很好(响应)
          	对象B->小三: 你好吗
          	小三-->>对象A: 对象B找我了
          	对象A->对象B: 你真的好吗？
          	Note over 小三,对象B: 我们是朋友
          	participant C
          	Note right of C: 没人陪我玩
          	```

![时序图源码复杂样例](https://qiniu.gaowenju.com/markdown/markdown-05.png)

    - UML 标准时序图样例

        ```mermaid
        %% 时序图例子,-> 直线，-->虚线，->>实线箭头
        sequenceDiagram
        	participant 张三
        	participant 李四
        	张三->王五: 王五你好吗？
        	loop 健康检查
        		王五->王五: 与疾病战斗
        	end
        	Note right of 王五: 合理 食物 <br/>看医生...
        	李四-->>张三: 很好!
        	王五->李四: 你怎么样?
        	李四-->王五: 很好!
        ```

![标准时序图样例](https://qiniu.gaowenju.com/markdown/markdown-04.png)

    - 甘特图样例

          	```mermaid
          			gantt
          			dateFormat  YYYY-MM-DD
          			title 软件开发甘特图
          			section 设计
          			需求                      :done,    des1, 2014-01-06,2014-01-08
          			原型                      :active,  des2, 2014-01-09, 3d
          			UI设计                     :         des3, after des2, 5d
          		未来任务                     :         des4, after des3, 5d
          			section 开发
          			学习准备理解需求                      :crit, done, 2014-01-06,24h
          			设计框架                             :crit, done, after des2, 2d
          			开发                                 :crit, active, 3d
          			未来任务                              :crit, 5d
          			耍                                   :2d
          			section 测试
          			功能测试                              :active, a1, after des3, 3d
          			压力测试                               :after a1  , 20h
          			测试报告                               : 48h
          	```

![甘特图样例](https://qiniu.gaowenju.com/markdown/markdown-03.png)


## 数学公式及符号


### 公式
- ```$```标记公式```$公式$```,表示公式不单占一行
- ```$$```单行公式```$公式$```,表示公式单占一行

#### 上下标

- ```^```表示上标，单个上标```^n```，多个上标```^{nm}```
- ```_```表示下标，单个下标```_n```，多个下标```_{nm}```

|代码|显示|
|---|---|
|```$x^m_n$```|$x^m_n$|
|'$x^m_n$'|$x^m_n$00zn0\00
