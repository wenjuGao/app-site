import { d as defineEventHandler, r as readBody, c as createError } from '../../nitro/nitro.mjs';
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
const qiniuFile = defineEventHandler(async (event) => {
  const { key = "" } = await readBody(event);
  const deadline = parseInt(Date.now() / 1e3) + 3600;
  const file = /jpg|jpeg|png/.test(key) && !/watermark/.test(key) ? `${key}-watermark` : key;
  if (key) {
    return {
      url: bucket.privateDownloadUrl(baseUrl, file, deadline)
    };
  } else {
    return createError({
      statusCode: 400,
      statusMessage: "\u56FE\u5E8Asdk\u8BF7\u6C42\u9519\u8BEF\u274E"
    });
  }
});

export { qiniuFile as default };
//# sourceMappingURL=qiniu-file.mjs.map
