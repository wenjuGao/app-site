import { defineComponent, useSlots, h, useSSRContext } from 'vue';
import { X as withTrailingSlash } from '../nitro/nitro.mjs';
import _sfc_main$2 from './ContentRenderer-CCXOBWb1.mjs';
import _sfc_main$1 from './ContentQuery-BxGkejFr.mjs';
import { a as useRuntimeConfig, g as useRoute } from './server.mjs';
import { u as useContentHead } from './head-BM8XcI5v.mjs';
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
import './ContentRendererMarkdown-DMZ1pHoD.mjs';
import 'property-information';
import './node-hwMnPqaI.mjs';
import 'vue/server-renderer';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'dayjs';
import 'dayjs/plugin/weekday.js';
import 'dayjs/plugin/advancedFormat.js';
import 'dayjs/plugin/timezone.js';
import 'dayjs/plugin/updateLocale.js';
import 'dayjs/plugin/utc.js';
import './asyncData-DBtArwV3.mjs';

const ContentDoc = defineComponent({
  name: "ContentDoc",
  props: {
    /**
     * Renderer props
     */
    /**
     * The tag to use for the renderer element if it is used.
     * @default 'div'
     */
    tag: {
      type: String,
      required: false,
      default: "div"
    },
    /**
     * Whether or not to render the excerpt.
     * @default false
     */
    excerpt: {
      type: Boolean,
      default: false
    },
    /**
     * Query props
     */
    /**
     * The path of the content to load from content source.
     * @default useRoute().path
     */
    path: {
      type: String,
      required: false,
      default: undefined
    },
    /**
     * A query builder params object to be passed to <ContentQuery /> component.
     */
    query: {
      type: Object,
      required: false,
      default: undefined
    },
    /**
     * Whether or not to map the document data to the `head` property.
     */
    head: {
      type: Boolean,
      required: false,
      default: undefined
    }
  },
  /**
   * Document empty fallback
   * @slot empty
   */
  /**
   * Document not found fallback
   * @slot not-found
   */
  render(ctx) {
    const { contentHead } = useRuntimeConfig().public.content;
    const slots = useSlots();
    const { tag, excerpt, path, query, head } = ctx;
    const shouldInjectContentHead = head === undefined ? contentHead : head;
    const contentQueryProps = {
      ...query || {},
      path: path || (query == null ? undefined : query.path) || withTrailingSlash(useRoute().path),
      find: "one"
    };
    const emptyNode = (slot, data) => h("pre", null, JSON.stringify({ message: "You should use slots with <ContentDoc>", slot, data }, null, 2));
    return h(
      _sfc_main$1,
      contentQueryProps,
      {
        // Default slot
        default: (slots == null ? undefined : slots.default) ? ({ data, refresh, isPartial }) => {
          var _a;
          if (shouldInjectContentHead) {
            useContentHead(data);
          }
          return (_a = slots.default) == null ? undefined : _a.call(slots, { doc: data, refresh, isPartial, excerpt, ...this.$attrs });
        } : ({ data }) => {
          if (shouldInjectContentHead) {
            useContentHead(data);
          }
          return h(
            _sfc_main$2,
            { value: data, excerpt, tag, ...this.$attrs },
            // Forward local `empty` slots to ContentRenderer if it is used.
            { empty: (bindings) => (slots == null ? undefined : slots.empty) ? slots.empty(bindings) : emptyNode("default", data) }
          );
        },
        // Empty slot
        empty: (bindings) => {
          var _a;
          return ((_a = slots == null ? undefined : slots.empty) == null ? undefined : _a.call(slots, bindings)) || h("p", null, "Document is empty, overwrite this content with #empty slot in <ContentDoc>.");
        },
        // Not Found slot
        "not-found": (bindings) => {
          var _a;
          return ((_a = slots == null ? undefined : slots["not-found"]) == null ? undefined : _a.call(slots, bindings)) || h("p", null, "Document not found, overwrite this content with #not-found slot in <ContentDoc>.");
        }
      }
    );
  }
});
const _sfc_main = ContentDoc;
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/.pnpm/@nuxt+content@2.13.4_nuxt@3.15.2_rollup@3.29.5_vue@3.5.13/node_modules/@nuxt/content/dist/runtime/components/ContentDoc.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as default };
//# sourceMappingURL=ContentDoc-BcKR-xV6.mjs.map
