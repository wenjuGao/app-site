---
layout: article
title: watch与watchEffect
description: 
img: app-site/img/seal.jpg
header: app-site/img/seal-header.jpg
date: 2023-04-01 12:12:12
category: javascript
tags:
  - vue
  - javascript
---

1. watch

-   监听一个或者多个数据(传入多个数据时可监听多个数据)
-   可设置 deep、immediate 来控制监听时机和程度

```javascript
watch(
    [foo, num],
    ([newFoo, newNum], [oldFoo, oldNum]) => {
        console.log('watch', [newFoo, newNum], [oldFoo, oldNum])
    },
    {
        immediate: true,
        deep: true,
    },
)
```

2. watchEffect

-   接收一个函数等函数内部依赖数据发生改变时重新执行函数
-   返回一个实例方法，用于卸载监听

```javascript
const StopHandle = watchEffect(() => {
    watchEffectValue.value = foo.value + num.value
    console.log('watchEffect')
})
// 卸载监听
StopHandle()
```

4. compented

-   返回一个计算结果
-   计算依赖的数据发生改变时，生成新的结算结果

```javascript
const computedValue = computed(() => foo.value + num.value)
```

5. 区别

可以看出 watchEffect 起始和 compented 更相似，都是监听依赖，如果依赖发生改变时重新执行返回或者计算，这也是为什么说 watchEffect 是异步或者懒监听的。

:::tip
watchEffect、compented、watch 是实现会帮助我们理解 effect(watcher)中 deps 存放的依赖会相互收集的原理：
一个响应式数据发生改变时可以找到其依赖的 effectFn，也能反溯其会依赖它是 effectFn
:::
