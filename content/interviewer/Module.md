---
layout: article
title: 模块化
description: 
img: app-site/img/action-scope.jpg
header: app-site/img/action-scope-header.jpg
date: 2023-04-01 12:12:12
category: 面试
tags:
  - 面试
  - 模块化
---

### 直接定义依赖

- 通过全局方法定义、引用模块


### 闭包模块化模式

- 用闭包方式解决了变量污染问题，闭包内返回模块对象，只需对外暴露一个全局变量

### 模版依赖定义

- 通过后端语法聚合 js 文件，从而实现依赖加载

### 注释依赖定义

- 以文件为单位定义模块了，通过 lazyjs 加载文件，同时读取文件注释，继续递归加载剩下的文件

### 外部依赖定义

- 将依赖抽出单独文件定义（cocos2d-js）

### Sandbox模式

- 所有模块塞到一个 sanbox 变量中
- 无法解决明明冲突问题


### 依赖注入
- 实践angularjs

### CommonJS && AMD

- CommonJS规范概述了同步声明依赖的模块定义
- 使用一个特定的全局模块名来把一些私有变量和方法包起来，然后通过闭包来创建一个私有的命名空间。
- 无法管理不同模块之间的依赖关系

- CommonJS：node实现参照的标准
- 未在浏览器中实现
- 不适合tree-sharking：tree-shaking 只能在静态modules下工作，在ES6之前我们使用CommonJS规范引入模块，具体采用require()的方式动态引入模块
- 将模块文件中的代码放置到一个函数环境中执行(导出的是指的浅拷贝):

1. 一个Js文件就是一个模块；
1. 一个模块需要暴露一些数据或者功能，需要用module.exports = xxx 导出
1. 一个模块需要使用另一个模块导出的内容，需要使用requir("模块路径")
1. require函数返回的是模块导出的内容；
1. 模块具有缓存， 第一次导入模块时会缓存模块的导出， 之后再导入同一个模块，直接使用之前缓存的结果。

```javascript
function(module){
     module.exports = { };
     var exports = module.exports;
    // 模块中的代码。
    return module.exports;
} 
```

### AMD
- RequireJS
- AMD偏向于依赖前置
- 异步模块定义
- 不适合tree-sharking：tree-shaking 只能在静态modules下工作，在ES6之前我们使用CommonJS规范引入模块，具体采用require()的方式动态引入模块

### CMD

- Sea.js
- CMD偏向于用到时才运行的思路


```javascript
// CMD
define(function (require) {
    var a = require('./a'); // <- 运行到此处才开始加载并运行模块a
    var b = require('./b'); // <- 运行到此处才开始加载并运行模块b
    // more code ..
})
// AMD
define(
    ['./a', './b'], // <- 前置声明，也就是在主体运行前就已经加载并运行了模块a和模块b
    function (a, b) {
        // more code ..
    }
)
```

CMD是最贴近CommonJS的异步模块化方案



### Umd

- 兼容了 CommonJS 与 Amd，其核心思想是，如果在 commonjs 环境（存在 module.exports，不存在 define），将函数执行结果交给 module.exports 实现 Commonjs，否则用 Amd 环境的 define，实现 Amd。
- 先判断是否支持Node.js模块格式（exports是否存在），存在则使用Node.js模块格式。
- 再判断是否支持AMD（define是否存在），存在则使用AMD方式加载模块
- 前两个都不存在，则将模块公开到全局（window或global）

```javascript
// if the module has no dependencies, the above pattern can be simplified to
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.returnExports = factory();
  }
}(this, function () {

    // Just return a value to define the module export.
    // This example returns an object, but the module
    // can return a function as the exported value.
    return {};
}));
```



### ES2015 Modules

- 导出的是值的引用
- import()引入模块的方式采用静态导入，可以采用一次导入所以的依赖包再根据条件判断的方式，获取不需要的包，然后执行删除操作。



#### Tree-shaking的实现原理

##### 利用ES6模块特性：

1. 只能作为模块顶层的语句出现
1. import的模块名只能是字符串常量
1. import binding 是 immutable的，引入的模块不能再进行修改

##### 代码删除：
1. uglify：判断程序流，判断变量是否被使用和引用，进而删除代码

##### 实现原理可以简单的概况：

- S6 Module引入进行静态分析，故而编译的时候正确判断到底加载了那些模块
- 静态分析程序流，判断那些模块和变量未被使用或者引用，进而删除对应代码


### 参考文章
[javascript模块化演进及原理浅析](https://www.mdeditor.tw/pl/ggzM)
[前端模块化演进之路](https://zhuanlan.zhihu.com/p/115135287)
[CommonJS、AMD、CMD、ES6 模块规范讲解](https://juejin.cn/post/6844904175034187784#heading-11)