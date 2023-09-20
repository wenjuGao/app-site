---
layout: article
title: node节点查询
description: 
img: https://qiniu.gaowenju.com/app-site/img/action-scope.jpg-watermark
header: https://qiniu.gaowenju.com/app-site/img/action-scope-header.jpg-watermark
date: 2023-04-01 12:12:12
category: 面试
tags:
  - 面试
---

### node节点查询

- node.contains(otherNode)：返回的是一个布尔值，来表示传入的节点是否为该节点的后代节点。
- node.hasChildNodes()：返回的是一个布尔值，表明当前节点是否包含有子节点.
- node.childNodes()：返回包含指定节点的子节点的集合，该集合为即时更新的集合，为 NodeList 类型，且为只读
- Node.firstChild：只读属性返回树中节点的第一个子节点，如果节点是无子节点，则返回 null
- Node.lastChild： 是一个只读属性，返回当前节点的最后一个子节点。
					如果父节点为一个元素节点，则子节点通常为一个元素节点，或一个文本节点，或一个注释节点。如果没有子节点，则返回 null
- Node.nextSibling：返回其父节点的 childNodes 列表中紧跟在其后面的节点，如果指定的节点为最后一个节点，则返回 null。
- Node.previousSibling：返回当前节点的前一个兄弟节点,没有则返回null.
- ParentNode.children：返回 一个Node的子elements ，是一个动态更新的 HTMLCollection。


### HTMLCollection

接口表示一个包含了元素（元素顺序为文档流中的顺序）的通用集合（generic collection），还提供了用来从该集合中选择元素的方法和属性。

- HTMLCollection.length
- HTMLCollection.item()
	根据给定的索引（从0开始），返回具体的节点。如果索引超出了范围，则返回 null
- HTMLCollection.namedItem()
	根据 Id 返回指定节点，或者作为备用，根据字符串所表示的 name 属性来匹配。
	根据 name 匹配只能作为最后的依赖，并且只有当被引用的元素支持 name 属性时才能被匹配。如果不存在符合给定 name 的节点，则返回 null。