---
layout: article
title: git-hooks
description: 通过git-hooks钩子，在commit是触发eslint或者prettier来规范提交的代码
img: https://qiniu.gaowenju.com/app-site/img/action-scope.jpg-watermark
header: https://qiniu.gaowenju.com/app-site/img/action-scope-header.jpg-watermark
date: 2023-04-01 12:12:12
category: 工具
tags:
  - git
  - 工具
---


```json
{
	"gitHooks": {
    	"pre-commit": "lint-staged"
  	},
  	"lint-staged": {
    	"*.{js,jsx,less,md,json}": [
      		"prettier --write"
    	],
		"*.ts?(x)": [
		"prettier --parser=typescript --write"
		]
  	}
}
```