import { d as defineEventHandler } from '../../nitro/nitro.mjs';
import { b as banner } from '../../_/banner.mjs';
import 'unified';
import 'remark-parse';
import 'remark-rehype';
import 'remark-mdc';
import 'remark-gfm';
import 'rehype-external-links';
import 'rehype-sort-attribute-values';
import 'rehype-sort-attributes';
import 'rehype-raw';
import 'detab';
import 'micromark-util-sanitize-uri';
import 'hast-util-to-string';
import 'github-slugger';
import 'qiniu';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';

const list$1 = [
	{
		img: "site/img/action-scope.jpg",
		title: "window指令之tree",
		description: "tree 命令显示当前文件夹的目录结构，这是一个非常有用的命令，可以帮我们迅速了解当前目录的结构"
	},
	{
		img: "site/img/action-scope-header.jpg",
		title: "正则表达式语法",
		description: "正则表达式(Regular Expression)是一种文本模式，包括普通字符（例如，a 到 z 之间的字母）和特殊字符（称为'元字符'），来描述、匹配一系列匹配某个句法规则的字符串。"
	},
	{
		img: "site/img/code-header.jpg",
		title: "javascript中的位运算符",
		description: "javascript中的位运算符"
	},
	{
		img: "site/img/forof-header.jpg",
		title: "好用的生僻属性",
		description: "好用的生僻属性"
	},
	{
		img: "site/img/forEach-header.jpg",
		title: "博客搭建之Hexo",
		description: "快速建站工具（主要适用：博客、文档等静态站点），可以将Markdown编写的文章解析成html页面。生成的站点可以无需服务器一键部署到github、gitlab或者gitee上。"
	}
];

const list = defineEventHandler(async (event) => {
  return {
    banner,
    list: list$1
  };
});

export { list as default };
//# sourceMappingURL=list.mjs.map
