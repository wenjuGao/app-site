import { d as defineEventHandler, g as getQuery, s as sendRedirect, c as createError } from '../../nitro/nitro.mjs';
import qiniu from 'qiniu';
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
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';

const baseUrl = process.env.NUXT_QINIU_BASE_URL || "";
const accessKey = process.env.NUXT_QINIU_ACCESS_KEY;
const secretKey = process.env.NUXT_QINIU_SECRET_KEY;
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
const config = new qiniu.conf.Config();
config.zone = qiniu.zone.Zone_z0;
const bucket = new qiniu.rs.BucketManager(mac, config);
const img_get = defineEventHandler(async (event) => {
  const key = decodeURIComponent(getQuery(event).key + "") || "";
  const deadline = parseInt(Date.now() / 1e3) + 3600;
  const file = /jpg|jpeg|png/.test(key) && !/watermark/.test(key) ? `${key}-watermark` : key;
  if (file && file !== undefined) {
    await sendRedirect(event, bucket.privateDownloadUrl(baseUrl, file, deadline), 302);
  } else {
    return createError({
      statusCode: 400,
      statusMessage: "\u56FE\u5E8Asdk\u8BF7\u6C42\u9519\u8BEF\u274E"
    });
  }
});

export { img_get as default };
//# sourceMappingURL=img.get.mjs.map
