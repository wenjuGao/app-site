---
layout: article
title: 二叉树遍历
description: 
img: https://qiniu.gaowenju.com/app-site/img/action-scope.jpg-watermark
header: https://qiniu.gaowenju.com/app-site/img/action-scope-header.jpg-watermark
banner: true
date: 2023-04-01 12:12:12
category: 面试
tags:
  - 面试
  - 算法
  - 二叉树
---


```js
/**
 * 递归法前序遍历
 */
function dfsPreorderByRcs(tree) {
  const output = [];
  const visitLoop = (node) => {
    if (node) {
      // 先搜索出根节点的值，push进结果列表
      output.push(node.data);
      // 访问左子节点树，左子节点开始作为根节点进行下一轮递归
      visitLoop(node.left);
      // 同上述，递归遍历右子节点
      visitLoop(node.right);
    }
  }
  visitLoop(tree);
  return output;
}
```


```js
/**
 * 非递归法前序遍历
 * 由于遍历过程是先进后出，所以使用栈结构
 */
function dfsPreorderNonRcs(tree) {
  const stack = new Stack();
  const output = [];
  stack.push(tree);
  while (!stack.isEmpty) {
    const pop = stack.pop();
    if (pop) {
      output.push(pop.data);
      if (pop.right) {
        stack.push(pop.right);
      }
      if (pop.left) {
        stack.push(pop.left);
      }
    }
  }
  return output;
}
```