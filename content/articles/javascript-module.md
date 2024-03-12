---
layout: article
title: javascript模块化
description: 异步加载 JS 文件，按照模块加载方法，通过 define()函数定义，第一个参数是一个数组，里面定义一些需要依赖的包，第二个参数是一个回调函数，通过变量来引用模块里面的方法，最后通过 return 来输出
img: app-site/img/js-module.jpg
header: app-site/img/js-module-header.jpg
date: 2023-04-04 12:12:12
category: javascript
tags:
  - 模块化
  - AMD
  - CMD
  - CommonJs
  - EMS
  - javascript
---


#### 1. AMD — RequireJS：依赖前置、异步定义

AMD 是 RequireJS 在推广过程中对模块定义的规范化产出。
RequireJS：异步加载 JS 文件，按照模块加载方法，通过 define()函数定义，第一个参数是一个数组，里面定义一些需要依赖的包，第二个参数是一个回调函数，通过变量来引用模块里面的方法，最后通过 return 来输出。
AMD 的规范是一个依赖前置，当需要使用别的模块时，在程序前做好引用，在引用成功的回调里面加载需要执行的程序。

```javascript
define(['package/lib'], function(lib) {
  function test() {
    lib.fn()
  }
  return test
})
```

#### 2. CMD — SeaJS：依赖就近、同步定义

CMD 是 SeaJS 在推广过程中对模块定义的规范化产出。
SeaJS：同步模块定义，是淘宝团队提供的一个模块开发的 js 框架（不更新）。define()定义，通过 require 加依赖插件，即用即返。

```javascript
define(function(require, exports, module) {
  var $ = require('jquery')
  exports.test = function() {}
})
```

#### 3. CommonJS 规范

CommonJS 规范是通过 module.exports 定义的，另外浏览器端是不识别 module.exports 的。
CommonJS 输出方式有 2 种：默认输出 module export 和 exports.XX

- Nodejs 端是使用 CommonJS 规范的；
- 前端浏览器一般使用 AMD、CMD、ES6 等定义模块化开发的；

a.js

```javascript
exports.test = function() {}
```

b.js

```javascript
var test = require('a.js')
```

### ES6 模块化

#### export/import

- export default / export
- export default 默认导出一个 ， import xx from xxx
- export 批量导出，导出多个, import { xxx } from xxx
