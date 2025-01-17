import { d as defineEventHandler } from '../../nitro/nitro.mjs';
import { b as banner$1 } from '../../_/banner.mjs';
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

const banner = defineEventHandler(async () => banner$1);

export { banner as default };
//# sourceMappingURL=banner.mjs.map
