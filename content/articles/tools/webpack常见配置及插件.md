---
layout: article
title: webpack常见配置及插件
description: 
img: https://qiniu.gaowenju.com/app-site/img/action-scope.jpg-watermark
header: https://qiniu.gaowenju.com/app-site/img/action-scope-header.jpg-watermark
date: 2023-04-01 12:12:12
category: 工具
tags:
  - webpack
  - 工具
---




### Loader

webpack 可以使用 loader 来预处理文件。这允许你打包除 JavaScript 之外的任何静态资源。你可以使用 Node.js 来很简单地编写自己的 loader。
loader 通过在 require() 语句中使用 loadername! 前缀来激活，或者通过 webpack 配置中的正则表达式来自动应用

#### Loader 配置规则

**webpack.config.js**

```javascript
module.exports = {
  module: {
    rules: [
      { test: /\.css$/, use: 'css-loader' },
      { test: /\.ts$/, use: 'ts-loader' }
    ]
  }
}
```

1. **raw-loader**：加载文件原始内容（utf-8）；
1. **file-loader**：把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件 (处理图片和字体)；
1. **url-loader**：与 file-loader 类似，区别是用户可以设置一个阈值，大于阈值时返回其 publicPath，小于阈值时返回文件 base64 形式编码 (处理图片和字体)；
1. **source-map-loader**：加载额外的 Source Map 文件，以方便断点调试
1. **svg-inline-loader**：将压缩后的 SVG 内容注入代码中
1. **image-loader**：加载并且压缩图片文件
1. **json-loader**：加载 JSON 文件（默认包含）
1. **handlebars-loader**：将 Handlebars 模版编译成函数并返回
1. **babel-loader**：把 ES6 转换成 ES5
1. **ts-loader**：将 TypeScript 转换成 JavaScript
1. **awesome-typescript-loader**：将 TypeScript 转换成 JavaScript，性能优于 ts-loader
1. **sass-loader**：将 SCSS/SASS 代码转换成 CSS
1. **css-loader**：加载 CSS，支持模块化、压缩、文件导入等特性
1. **style-loader**：把 CSS 代码注入到 JavaScript 中，通过 DOM 操作去加载 CSS
1. **postcss-loader**：扩展 CSS 语法，使用下一代 CSS，可以配合 autoprefixer 插件自动补齐 CSS3 前缀
1. **eslint-loader**：通过 ESLint 检查 JavaScript 代码
1. **tslint-loader**：通过 TSLint 检查 TypeScript 代码
1. **mocha-loader**：加载 Mocha 测试用例的代码
1. **coverjs-loader**：计算测试的覆盖率
1. **vue-loader**：加载 Vue.js 单文件组件
1. **i18n-loader**：国际化
1. **cache-loader**：可以在一些性能开销较大的 Loader 之前添加，目的是将结果缓存到磁盘里
