---
layout: article
title: 'Vue3 api'
description: 'Vue3 api'
img: '/img/1.png'
---

### Vue3 api

```js
{
	createApp,
	h,
	ref,
	toRef,
	toRefs,
	reactive,
	watch,
	computed,
	watchEffect,
	nextTick,
	mergeProps,
	useCssModule,
	getCurrentInstance,
	
	<!-- 生命周期, 在setup中调用 -->
	onBeforeMount,
	onMounted,
	onBeforeUpdate,
	onUpdated,
	onBeforeUnmount,
	onUnmounted,
	onErrorCaptured,
	onRenderTracked,
	onRenderTriggered,
	onActivated,
	onDeactivated,
}

setup(props,context){}

```

**执行 setup 时，组件实例尚未被创建**

props是响应式的，不能使用解构方式取值（会消除响应式）

结构出响应式：
```js
const { title } = toRefs(props)
const { title } = toRef(props)  	// 如果props无title，会创建一个ref

context.attrs 	// Attribute (非响应式对象)
context.slots	// 插槽 (非响应式对象)
context.emit	// 触发事件 (方法) 
getCurrentInstance // 当前页面实例
```



