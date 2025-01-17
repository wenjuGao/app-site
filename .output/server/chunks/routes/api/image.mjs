import { d as defineEventHandler, r as readBody, b as bucketManager, a as baseUrl, c as createError } from '../../nitro/nitro.mjs';
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

const image = defineEventHandler(async (event) => {
  const { key = "" } = await readBody(event);
  const bucket = bucketManager();
  const deadline = parseInt(Date.now() / 1e3) + 300;
  if (key) {
    return bucket.privateDownloadUrl(baseUrl, `${key}-header`, deadline);
  } else {
    return createError({
      statusCode: 400,
      statusMessage: "\u56FE\u5E8Asdk\u8BF7\u6C42\u9519\u8BEF\u274E"
    });
  }
});

export { image as default };
//# sourceMappingURL=image.mjs.map
