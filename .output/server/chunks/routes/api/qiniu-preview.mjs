import { d as defineEventHandler, b as bucketManager, a as baseUrl, c as createError } from '../../nitro/nitro.mjs';
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

const qiniuPreview = defineEventHandler(async () => {
  const bucket = bucketManager();
  return new Promise((resolve, reject) => {
    bucket.listPrefix("wenju-site", {
      limit: 10,
      prefix: "site/"
    }, function(err, respBody, respInfo) {
      if (err || respInfo.statusCode != 200) {
        reject(err);
      } else {
        resolve(respBody);
      }
    });
  }).then((resp) => {
    return resp.items.filter((i) => i.fsize > 0).map((i) => {
      const deadline = parseInt(Date.now() / 1e3) + 300;
      return {
        ...i,
        url: bucket.privateDownloadUrl(baseUrl || "", `${i.key}-preview`, deadline)
      };
    });
  }).catch(() => {
    return createError({
      statusCode: 400,
      statusMessage: "\u56FE\u5E8Asdk\u8BF7\u6C42\u9519\u8BEF\u274E"
    });
  });
});

export { qiniuPreview as default };
//# sourceMappingURL=qiniu-preview.mjs.map
