---
layout: article
title: Vue@3
description: 
img: https://qiniu.gaowenju.com/app-site/img/seal.jpg-watermark
header: https://qiniu.gaowenju.com/app-site/img/seal-header.jpg-watermark
banner: true
date: 2023-04-01 12:12:12
category: javascript
tags:
  - vue
  - javascript
---


### Vue3 的使用

#### Vue3 带来的主要改变：

1. Composition API + setup
   使用 setup 语法糖，可以让代码更换解耦，独立的逻辑集中完成，不在收模板和生命周期的限制，书写更灵活。
2. TypeScript
   Vue3 使用 ts 编写，提供了完整的 API type 等更好的兼容 ts 项目
3. Treeshaking
   主要 API 独立暴露，都能更好的减少运行时 Vue 包的大小

---

#### Vue3-API


## 主要 API 使用

### 1. ref & reactive

    将数据处理为响应式数据

```javascript
const foo = ref({ a: '111' })
const bar = reactive({ a: '222' })

// 读取：
console.log(foo.value.a, bar.a)
```

:::warning
通过结构读取响应式数据会让数据丢失响应式
:::

ref 内部虽然已经是响应式的了，单也支持 ref 嵌套：

```javascript
const foo = ref({ a: '111' })
const newFoo = ref(foo)

console.log(foo.value === newFoo.value) // true
//  == >
// const newFoo = ref(isRef(foo)?unRef(foo):foo)
```

### 2. props & emit

1. setup 函数

```html
<script>
    export default defineComponent({
        setup(props, context) {
            // props   => 传入的props值
            // context => 组件上下文
            //  $attrs
            console.log(context.attrs)
            // $slots
            console.log(context.slots)
            // $emit
            console.log(context.emit)
            // 暴露
            console.log(context.expose)
        },
    })
</script>
```

2. Composition API

```html
<script setup>
    const foo = ref('')
    const props = defineProps({
        data: Number,
    })
    const emits = defineEmits(['fn-1', 'fn-2'])
    // 提供给外部组件访问
    defineExpose({
        foo,
    })
</script>
```

### 生命周期

[生命周期](../assets/images/img/vue-1.png)

[官方文档](https://v3.cn.vuejs.org/guide/composition-api-lifecycle-hooks.html)

### provide、inject

Vue 提供了 readonly 来控制被嵌套(子-孙组件)来修改注入的值

```javascript
// 注入值
const provideInfo = ref({ text: 'provide', value: '123' })

provide('provideInfoReadonly', readonly(provideInfo))
provide('provideInfo', provideInfo)

// 接收值
const provideInfo = inject('provideInfo')
const provideInfoReadonly = inject('provideInfoReadonly')
```

---

### vue-router

1. Composition API 中我们不在使用 this 来指代 Vue 是实例，当然也提供了 getCurrentInstance 来获得当前实例，但是感觉更换的方式是通过独立引入 API 的试下来实现路由的功能。如果觉得代码会繁琐的话可以使用(mixin)[https://v3.cn.vuejs.org/guide/mixins.html]来优化进入的代码。

```javascript
const router = useRouter()
const route = useRoute()
onBeforeRouteLeave((to, from) => {
    if (flag.number > 1) {
        return true
    } else {
        flag.number += 1
        return false
    }
})

onBeforeRouteUpdate(async (to, from) => {
    console.log('onBeforeRouteUpdate', to, from)
})

const handleChangeRouter = () => {
    router.push({
        path: route.path,
        query: {
            ...route.query,
            flag: flag.number,
        },
    })
}
```

---

## style

```
<style scoped lang="scss">
.dome {
	text-algin: center;
}
</style>
```

scoped添加后会限制成局部样式，不会渗透到子组件中，当需要改变子组件样式时，写法：

1. /deep/
```
.dome {
	text-algin: center;
	/deep/ .el-label {
		text-algin: center;
	}
}
```

1. \>\>\>
sass不支持
```
.dome {
	text-algin: center;
	>>> .el-label {
		text-algin: center;
	}
}
```

1. ::v-deep
```
.dome {
	text-algin: center;
	::v-deep .el-label {
		text-algin: center;
	}
}
```

1. :deep
```
.dome {
	text-algin: center;
	:deep(.el-label) {
		text-algin: center;
	}
}
```

那么问题来了，scoped 是谁的属性，是通过什么限制样式的，不同的修改子组件样式的写法有什么不同？

vue3

```
::v-slotted(.slot-class) {
    background-color: #000;
}
```

```
::v-global(.my-class) {
    background-color: #000;
}
```


【参考】
- [vue-loader/deep-selectors](https://vue-loader.vuejs.org/guide/scoped-css.html#deep-selectors)