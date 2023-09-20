---
layout: article
title: vue和react的区别
description: 
img: https://qiniu.gaowenju.com/app-site/img/action-scope.jpg-watermark
header: https://qiniu.gaowenju.com/app-site/img/action-scope-header.jpg-watermark
date: 2023-04-01 12:12:12
category: 面试
tags:
  - 面试
  - vue
  - React
---


1. 监听数据变化的实现原理不同
- Vue: 通过defineProperty(2.*)或者Proxy的getter/setter以及数的劫持监听数据变化
- React: 默认是通过比较引用的方式（diff）进行的，如果不优化可能导致大量不必要的VDOM的重新渲染。

为什么React不精确监听数据变化呢？
这是因为Vue和React设计理念上的区别，Vue使用的是可变数据，而React更强调数据的不可变，两者没有好坏之分，Vue更加简单，而React构建大型应用的时候更加方便。

2. 数据流的不同
- vue: v-mode双向绑定
- React: 不支持双向绑定，提倡的是单向数据流

3. HoC(高阶组件-高阶函数)和mixins
- vue: mixins混合功能
- React: 高阶组件本质就是高阶函数，复用功能就是复用函数

4. 组件通信的区别
- vue: 父子：Props\Event(emit)、跨层：Provide\Inject，事件
- React: 父子：Props\Callback()、跨层：context，回调

5. 模板渲染方式的不同
- Vue: JS代码与模板分离，通过指令来实现常见语法
- React: 在组件JS代码中，通过原生JS实现模板中的常见语法，比如插值，条件，循环等，都是通过JS语法实现的，更加纯粹更加原生

举个例子，说明React的好处：react中render函数是支持闭包特性的，所以我们import的组件在render中可以直接调用。
但是在Vue中，由于模板中使用的数据都必须挂在 this 上进行一次中转，所以我们import 一个组件完了之后，还需要在 components 中再声明下，这样显然是很奇怪但又不得不这样的做法。


6. 渲染过程不同
- Vue: 它在渲染过程中跟踪每一个组件的依赖关系更新时不需要重新渲染整个组件树
- React: 应用的状态被改变时，全部子组件都会重新渲染，通过shouldComponentUpdate这个生命周期方法可以进行控制

7. Vuex和Redux的区别
- Vuex: $store被直接注入到了组件实例中，因此可以比较灵活的使用：使用dispatch、commit提交更新，通过mapState或者直接通过this.$store来读取数据
		数据是可变的，直接修改state
- Redux: 每一个组件都需要显示的用connect把需要的props和dispatch连接起来,只能通过dispatch修改
		不可变数据，每次都是用新state替换旧state
