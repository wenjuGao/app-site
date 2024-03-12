---
layout: article
title: 时间空间复杂度
description: 
img: app-site/img/action-scope.jpg
header: app-site/img/action-scope-header.jpg
date: 2023-04-01 12:12:12
category: 算法
tags:
  - 算法
  - 复杂度
---

### 时间复杂度（T(n)）

```javascript
for(let i = 0; i< n; i++){f()}
```


### 空间复杂度（S(n)）

```javascript
for(let i = 0; i< n; i++){f()}
```


大O符号表示法：O(n) 

$$T(n)=O(f(n))$$

其中O表示正比例关系（复杂度依次增大）：
- 常数阶 $O(1)$
- 对数阶 $O(log_2n)$
- 线性阶 $O(n)$
- 线性对数阶 $O(nlog_2n)$
- 平方阶 $O(n^2)$
- 立方阶 $O(n^3)$
- K次方阶 $O(n^k)$
- 指数阶 $O(2^n)$
- n阶指数阶 $O(n!)$
