---
layout: article
title: Single-spa
description: 
img: /img/action-scope.jpg
header: /img/action-scope-header.jpg
date: 2023-04-01 12:12:12
category: 工具
tags:
  - git
  - 微应用
---


引用Single-spa文档的描述：

Single-spa 是一个将多个单页面应用聚合为一个整体应用的 javascript 微前端框架。 使用 single-spa 进行前端架构设计可以带来很多好处，例如:

在同一页面上使用多个前端框架 而不用刷新页面 (React, AngularJS, Angular, Ember, 你正在使用的框架)
独立部署每一个单页面应用
新功能使用新框架，旧的单页应用不用重写可以共存
改善初始加载时间，延迟加载代码


## 开始使用Single-spa搭建项目

1. 基座应用（Vue）
2. 子应用react-app（react17）
3. 子应用vue2-app（vue2）
4. 子应用vue3-app（vue3）

**以上应该局可以通过cli工具搭建（vue-cli、create-react-app）**


### 基座应用

#### 1. 添加依赖
```
npm i single-spa
```
引入systemjs（用于加载依赖及子应用js）
```html
<!-- index.html -->
      <script src="https://cdn.jsdelivr.net/npm/systemjs@6.8.3/dist/system.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/systemjs@6.8.3/dist/extras/amd.js"></script>
      <script type="systemjs-importmap">
          {
            "imports": {
                 "@single-spa/react-app": "http://localhost:8080/react-app-react-app.js",
                  "@single-spa/vue3-app": "http://localhost:8001/js/app.js",
                  "@single-spa/vue2-app": "http://localhost:8002/js/app.js",
                  "react": "https://cdn.jsdelivr.net/npm/react@17.0.2/umd/react.production.min.js",
                  "react-dom": "https://cdn.jsdelivr.net/npm/react-dom@17.0.2/umd/react-dom.production.min.js"
            }
          }
       </script>
```



#### 2. 注册子应用（react）

- 主应用配置

采用全局注册，路由匹配形式

```javascript
// main.js
import {
	registerApplication,
	start
} from 'single-spa'

registerApplication(
	'react-app',
	// eslint-disable-next-line no-undef
	() => System.import("@single-spa/react-app"),
	location => location.hash.startsWith('#/react-app'),
	{
		domElementGetter: function () {
			// 此处用于异步返回挂在街节点，如果不返回默认在body下新增节点挂载
			return document.getElementById('react-app')
		}
	}
)
start({ urlRerouteOnly: true, })
```

```vue
<template>
<!-- 在组件内指定挂载节点 -->
	<div id="react-app"></div>
</template>
```


- 子应用（microapps/react-app）配置

修改打包配置指定输出文件名
```javascript
// webpack.config.js
const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "react-app",
    projectName: "react-app",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
  });
};
```

初始化子应用

```javascript
import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import Root from "./root.component";

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
```

------

#### 3. 注册子应用（vue2）

采用parcel形式接入

- 主应用

```vue
<template>
	<Parcel @parcelMounted="parcelMounted"
		@parcelUpdated="parcelUpdated"
		@parcelUnmount="parcelUnMounted"
		:config="parcelConfig"
		:mountParcel="mountRootParcel"
		wrapWith="div"
		wrapClass="vue-child-app-load"
		:parcelProps="getParcelProps()" />
</template>

<script setup>
	import Parcel from 'single-spa-vue/parcel'
	import { mountRootParcel } from 'single-spa'
	import { computed } from 'vue'
	// eslint-disable-next-line no-undef
	const parcelConfig = computed(() => System.import("@single-spa/vue2-app"))
	const getParcelProps = () => {
		// props some context to child app
		return {
			foo: { token: 'some thing' }
		}
	}
	const parcelMounted = () => {
		console.log("parcel mounted");
	}
	const parcelUpdated = () => {
		console.log("parcel updated");
	};
	const parcelUnMounted = () => {
		console.log("parcel parcelUnMounted");
	};
</script>
```

因为在主应用中引入了systemjs，且使用importmap映射了依赖名称，则可以使用window下的System直接通过map名称加载文件。这也是single-spa实现依赖共享的主要形式。

- 子应用（microapps/vue2-app），修改打包配置指定输出文件名

```javascript
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    output: {
      libraryTarget: "system",
      filename: "js/app.js",
    },
  },
  devServer: {
    port: 8002
  }
})
```

初始化生命周期
```javascript
const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    render(h) {
      return h(App, {
        props: {
          // single-spa props are available on the "this" object. Forward them to your component as needed.
          // https://single-spa.js.org/docs/building-applications#lifecycle-props
          // if you uncomment these, remember to add matching prop definitions for them in your App.vue file.
          /*
          name: this.name,
          mountParcel: this.mountParcel,
          singleSpa: this.singleSpa,
          */
        },
      });
    },
  },
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;

```


------

#### 4. 注册子应用（vue3）

(microapps/vue3-app)

因为该子应用和主应用使用相同技术栈，除了上面vue2-app的引入形式，其实可以采用通过alias、或者link（npm、yarn）的形式在编译阶段就接入

```js
// vue.config.js
module.exports = defineConfig({
configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "microapps": path.resolve(__dirname, "microapps"),
      }
    }
  }
})
```

挂载时机既可以使用single-spa-vue/parcel形式挂载
```vue
<template>
	<Parcel @parcelMounted="parcelMounted"
		@parcelUpdated="parcelUpdated"
		@parcelUnmount="parcelUnMounted"
		:config="parcelConfig"
		:mountParcel="mountRootParcel"
		wrapWith="div"
		wrapClass="vue-child-app-load"
		:parcelProps="getParcelProps()" />
</template>

<script setup>
	import Parcel from 'single-spa-vue/parcel'
	import { mountRootParcel } from 'single-spa'
	import { computed } from 'vue'
	const parcelConfig = computed(() => import('microapps/vue3-app/src/singleSpaApp'))
	const getParcelProps = () => {
		// props some context to child app
		return {
			foo: { token: 'some thing' }
		}
	}
	const parcelMounted = () => {
		console.log("parcel mounted");
	}
	const parcelUpdated = () => {
		console.log("parcel updated");
	};
	const parcelUnMounted = () => {
		console.log("parcel parcelUnMounted");
	};
</script>
```

也可以使用import直接引入使用：
```vue
<template>
	<App />
</template>

<script setup>
	import App from "microapps/vue3-app/src/App"
</script>
```

详细代码见[github](https://github.com/wenjuGao/microapp-examples)