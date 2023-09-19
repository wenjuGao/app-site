import { defineComponent, toRefs, computed, watch, useSlots, useSSRContext, h } from 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+vue@3.3.4/node_modules/vue/index.mjs';
import { u as useAsyncData } from './asyncData-ddf0e9e2.mjs';
import { hash } from 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+ohash@1.1.3/node_modules/ohash/dist/index.mjs';
import { q as queryContent } from '../server.mjs';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+ofetch@1.3.3/node_modules/ofetch/dist/node.mjs';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+hookable@5.5.3/node_modules/hookable/dist/index.mjs';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+unctx@2.3.1/node_modules/unctx/dist/index.mjs';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+vue-router@4.2.4_vue@3.3.4/node_modules/vue-router/dist/vue-router.node.mjs';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+h3@1.8.1/node_modules/h3/dist/index.mjs';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+ufo@1.2.0/node_modules/ufo/dist/index.mjs';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+destr@2.0.1/node_modules/destr/dist/index.mjs';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+@unhead+ssr@1.3.7/node_modules/@unhead/ssr/dist/index.mjs';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+unhead@1.3.7/node_modules/unhead/dist/index.mjs';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+@unhead+shared@1.3.7/node_modules/@unhead/shared/dist/index.mjs';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+cookie-es@1.0.0/node_modules/cookie-es/dist/index.mjs';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+dayjs@1.11.9/node_modules/dayjs/dayjs.min.js';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+dayjs@1.11.9/node_modules/dayjs/plugin/weekday.js';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+dayjs@1.11.9/node_modules/dayjs/plugin/advancedFormat.js';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+dayjs@1.11.9/node_modules/dayjs/plugin/timezone.js';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+dayjs@1.11.9/node_modules/dayjs/plugin/relativeTime.js';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+dayjs@1.11.9/node_modules/dayjs/plugin/utc.js';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+vue@3.3.4/node_modules/vue/server-renderer/index.mjs';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+defu@6.1.2/node_modules/defu/dist/defu.mjs';
import '../../nitro/nitro-prerenderer.mjs';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+node-fetch-native@1.4.0/node_modules/node-fetch-native/dist/polyfill.mjs';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+unenv@1.7.3/node_modules/unenv/runtime/fetch/index.mjs';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+scule@1.0.0/node_modules/scule/dist/index.mjs';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+klona@2.0.6/node_modules/klona/dist/index.mjs';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+unstorage@1.9.0/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+unstorage@1.9.0/node_modules/unstorage/drivers/fs.mjs';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+unstorage@1.9.0/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+radix3@1.1.0/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+pathe@1.1.1/node_modules/pathe/dist/index.mjs';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+unified@10.1.2/node_modules/unified/index.js';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+mdast-util-to-string@3.2.0/node_modules/mdast-util-to-string/index.js';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+micromark@3.2.0/node_modules/micromark/lib/preprocess.js';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+micromark@3.2.0/node_modules/micromark/lib/postprocess.js';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+unist-util-stringify-position@4.0.0/node_modules/unist-util-stringify-position/index.js';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+micromark-util-character@1.2.0/node_modules/micromark-util-character/index.js';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+micromark-util-chunked@1.1.0/node_modules/micromark-util-chunked/index.js';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+micromark-util-resolve-all@1.1.0/node_modules/micromark-util-resolve-all/index.js';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+remark-emoji@3.1.2/node_modules/remark-emoji/index.js';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+rehype-slug@5.1.0/node_modules/rehype-slug/index.js';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+remark-squeeze-paragraphs@5.0.1/node_modules/remark-squeeze-paragraphs/index.js';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+rehype-external-links@2.1.0/node_modules/rehype-external-links/index.js';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+remark-gfm@3.0.1/node_modules/remark-gfm/index.js';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+rehype-sort-attribute-values@4.0.0/node_modules/rehype-sort-attribute-values/index.js';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+rehype-sort-attributes@4.0.0/node_modules/rehype-sort-attributes/index.js';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+rehype-raw@6.1.1/node_modules/rehype-raw/index.js';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+remark-mdc@1.1.3/node_modules/remark-mdc/dist/index.mjs';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+remark-parse@10.0.2/node_modules/remark-parse/index.js';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+remark-rehype@10.1.0/node_modules/remark-rehype/index.js';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+mdast-util-to-hast@12.3.0/node_modules/mdast-util-to-hast/index.js';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+detab@3.0.2/node_modules/detab/index.js';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+unist-builder@4.0.0/node_modules/unist-builder/index.js';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+mdurl@1.0.1/node_modules/mdurl/index.js';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+slugify@1.6.6/node_modules/slugify/slugify.js';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+unist-util-position@5.0.0/node_modules/unist-util-position/index.js';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+unist-util-visit@5.0.0/node_modules/unist-util-visit/index.js';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+shiki-es@0.14.0/node_modules/shiki-es/dist/shiki.node.mjs';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+unenv@1.7.3/node_modules/unenv/runtime/npm/consola.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  name: "ContentQuery",
  props: {
    /**
     * The path of the content to load from content source.
     */
    path: {
      type: String,
      required: false,
      default: void 0
    },
    /**
     * Select a subset of fields
     */
    only: {
      type: Array,
      required: false,
      default: void 0
    },
    /**
     * Remove a subset of fields
     */
    without: {
      type: Array,
      required: false,
      default: void 0
    },
    /**
     * Filter results
     */
    where: {
      type: Object,
      required: false,
      default: void 0
    },
    /**
     * Sort results
     */
    sort: {
      type: Object,
      required: false,
      default: void 0
    },
    /**
     * Limit number of results
     */
    limit: {
      type: Number,
      required: false,
      default: void 0
    },
    /**
     * Skip number of results
     */
    skip: {
      type: Number,
      required: false,
      default: void 0
    },
    /**
     * Filter contents based on locale
     */
    locale: {
      type: String,
      required: false,
      default: void 0
    },
    /**
     * A type of query to be made.
     */
    find: {
      type: String,
      required: false,
      default: void 0
    }
  },
  async setup(props) {
    const {
      path,
      only,
      without,
      where,
      sort,
      limit,
      skip,
      locale,
      find
    } = toRefs(props);
    const isPartial = computed(() => {
      var _a;
      return (_a = path.value) == null ? void 0 : _a.includes("/_");
    });
    watch(() => props, () => refresh(), { deep: true });
    const { data, refresh } = await useAsyncData(
      `content-query-${hash(props)}`,
      () => {
        let queryBuilder;
        if (path.value) {
          queryBuilder = queryContent(path.value);
        } else {
          queryBuilder = queryContent();
        }
        if (only.value) {
          queryBuilder = queryBuilder.only(only.value);
        }
        if (without.value) {
          queryBuilder = queryBuilder.without(without.value);
        }
        if (where.value) {
          queryBuilder = queryBuilder.where(where.value);
        }
        if (sort.value) {
          queryBuilder = queryBuilder.sort(sort.value);
        }
        if (limit.value) {
          queryBuilder = queryBuilder.limit(limit.value);
        }
        if (skip.value) {
          queryBuilder = queryBuilder.skip(skip.value);
        }
        if (locale.value) {
          queryBuilder = queryBuilder.where({ _locale: locale.value });
        }
        if (find.value === "one") {
          return queryBuilder.findOne();
        }
        if (find.value === "surround") {
          if (!path.value) {
            console.warn("[Content] Surround queries requires `path` prop to be set.");
            console.warn("[Content] Query without `path` will return regular `find()` results.");
            return queryBuilder.find();
          }
          return queryBuilder.findSurround(path.value);
        }
        return queryBuilder.find();
      }
    );
    return {
      isPartial,
      data,
      refresh
    };
  },
  /**
   * Content not found fallback
   * @slot not-found
   */
  render(ctx) {
    var _a;
    const slots = useSlots();
    const {
      // Setup
      data,
      refresh,
      isPartial,
      // Props
      path,
      only,
      without,
      where,
      sort,
      limit,
      skip,
      locale,
      find
    } = ctx;
    const props = {
      path,
      only,
      without,
      where,
      sort,
      limit,
      skip,
      locale,
      find
    };
    if (props.find === "one") {
      if (!data && (slots == null ? void 0 : slots["not-found"])) {
        return slots["not-found"]({ props, ...this.$attrs });
      }
      if ((slots == null ? void 0 : slots.empty) && (data == null ? void 0 : data._type) === "markdown" && !((_a = data == null ? void 0 : data.body) == null ? void 0 : _a.children.length)) {
        return slots.empty({ props, ...this.$attrs });
      }
    } else if (!data || !data.length) {
      if (slots == null ? void 0 : slots["not-found"]) {
        return slots["not-found"]({ props, ...this.$attrs });
      }
    }
    if (slots == null ? void 0 : slots.default) {
      return slots.default({ data, refresh, isPartial, props, ...this.$attrs });
    }
    const emptyNode = (slot, data2) => h("pre", null, JSON.stringify({ message: "You should use slots with <ContentQuery>!", slot, data: data2 }, null, 2));
    return emptyNode("default", { data, props, isPartial });
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/.pnpm/registry.npmjs.org+@nuxt+content@2.7.2_rollup@3.28.1/node_modules/@nuxt/content/dist/runtime/components/ContentQuery.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=ContentQuery-dd125a19.mjs.map
