---
layout: article
title: javascript中的位运算符
description: javascript 中的位运算符
img: /img/action-scope.jpg
header: /img/operator.png
banner: true
date: 2023-04-01 12:12:12
category: javascript
tags:
  - 位运算
  - javascript
---


| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |


- 位与（&）、位或（|）、位异或（^）、非位（~）
- 左移（<<）、右移（>>）、无符号右移（>>>）

### &（位与）

- “&”运算符（位与）用于对两个二进制操作数，逐位取与

| 第一个数的位值 | 第二个数的位值 | 运算结果 |
| -------------- | -------------- | -------- |
| 1              | 1              | 1        |
| 1              | 0              | 0        |
| 0              | 1              | 0        |
| 0              | 0              | 0        |

### |（位或）

- “|”运算符（位或）用于对两个二进制操作数，逐位取或

| 第一个数的位值 | 第二个数的位值 | 运算结果 |
| -------------- | -------------- | -------- |
| 1              | 1              | 1        |
| 1              | 0              | 1        |
| 0              | 1              | 1        |
| 0              | 0              | 0        |

### ^（位异或）

- “^”运算符（位异或）用于对两个二进制操作数，逐位取异或
- 位数据相同得 0，不同得 false
- 两个相同的数取异或的 0

| 第一个数的位值 | 第二个数的位值 | 运算结果 |
| -------------- | -------------- | -------- |
| 1              | 1              | 0        |
| 1              | 0              | 1        |
| 0              | 1              | 1        |
| 0              | 0              | 0        |

### ~（位非）

- “~”运算符（位非）用于对一个二进制操作数，逐位取非
  第 1 步：把运算数转换为 32 位的二进制整数。
  第 2 步：逐位进行取反操作。
  第 3 步：把二进制反码转换为十进制浮点数

- 位非运算实际上就是对数字进行取负运算，再减 1
  例如 ~5 等价于 -5-1 结果都是-6

### <<（左移位）

“<<”运算符执行左移位运算

- 在移位运算过程中，符号位始终保持不变
- 如果右侧空出位置，则自动填充为 0；超出 32 位的值，则自动丢弃

```javascript
console.log(5 << 1) // 10
//  .... 00 0101   ->  5
//  向右移动1位
//  .... 00 1010   ->  10
```

### >>（右移位）

“>>”运算符执行有符号右移位运算

- 把数字中的所有有效位整体右移，再使用符号位的值填充空位
- 移动过程中超出的值将被丢弃

```javascript
console.log(10 >> 1) // 5
//  .... 00 1010   ->  10
//  向左移动1位
//  .... 00 0101   ->  5
```

### >>>（无符号右移位）

“>>>”运算符执行五符号右移位运算

- 它把无符号的 32 位整数所有数位整体右移
- 对于无符号数或正数右移运算，无符号右移与有符号右移运算的结果是相同的
- 对于负数来说，无符号右移将使用 0 来填充所有的空位，同时会把负数作为正数来处理

```javascript
console.log(5 >>> 1) // 2
//  .... 00 0101   ->  5
//  向左移动1位
//  .... 00 0010   ->  2

console.log(-5 >>> 1) // 2147483645
//  100... 00 0101   ->  5
//  向左移动1位
//  010... 00 0010   ->  2147483645
```

### 组合位运算

- ^=
  a^=b 等价 a = a^b

- ~~
  ~~a 等价 ~(~a) 等价 a


