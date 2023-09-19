import { p as publicAssetsURL } from '../../renderer.mjs';
import { b as useRouter, q as queryContent, d as useArticleStore$1 } from '../server.mjs';
import { useSSRContext, defineComponent, withAsyncContext, mergeProps, unref, ref, reactive, onUnmounted, nextTick } from 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+vue@3.3.4/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrRenderStyle, ssrRenderComponent } from 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+vue@3.3.4/node_modules/vue/server-renderer/index.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';
import { u as useAppConfig } from './config-749a8cc6.mjs';
import { u as useDayjs } from './dayjs-3b727b6b.mjs';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+vue-bundle-renderer@1.0.3/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+h3@1.8.1/node_modules/h3/dist/index.mjs';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+devalue@4.3.2/node_modules/devalue/index.js';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+ufo@1.2.0/node_modules/ufo/dist/index.mjs';
import '../../nitro/nitro-prerenderer.mjs';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+node-fetch-native@1.4.0/node_modules/node-fetch-native/dist/polyfill.mjs';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+ofetch@1.3.3/node_modules/ofetch/dist/node.mjs';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+destr@2.0.1/node_modules/destr/dist/index.mjs';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+unenv@1.7.3/node_modules/unenv/runtime/fetch/index.mjs';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+hookable@5.5.3/node_modules/hookable/dist/index.mjs';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+scule@1.0.0/node_modules/scule/dist/index.mjs';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+klona@2.0.6/node_modules/klona/dist/index.mjs';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+defu@6.1.2/node_modules/defu/dist/defu.mjs';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+ohash@1.1.3/node_modules/ohash/dist/index.mjs';
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
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+unctx@2.3.1/node_modules/unctx/dist/index.mjs';
import 'file:///Users/gaowenju/my-job/app-site/node_modules/.pnpm/registry.npmjs.org+vue-router@4.2.4_vue@3.3.4/node_modules/vue-router/dist/vue-router.node.mjs';
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

const getFullscreenElement = () => {
  const key = ["fullscreenElement", "webkitFullscreenElement"];
  for (const value of key) {
    if (document[value]) {
      return document[value];
    }
  }
  return null;
};
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "page-banner",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useRouter();
    const banerList = ([__temp, __restore] = withAsyncContext(() => queryContent("articles").only(["_path", "banner", "img", "category", "title"]).where({ banner: true }).limit(5).sort({ date: -1 }).find()), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "carousel carousel-center rounded-box mt-3" }, _attrs))} data-v-5f58c885><!--[-->`);
      ssrRenderList(unref(banerList), (item, index2) => {
        _push(`<div class="carousel-item cursor-pointer hover:font-bold" data-v-5f58c885><div class="carousel-item-box max-w-xs" data-v-5f58c885><img${ssrRenderAttr("src", item.img)}${ssrRenderAttr("alt", item.title)} data-v-5f58c885><div class="label h-20 hero-overlay bg-opacity-6 text-neutral-content" data-v-5f58c885><p class="p-2 break-all line-clamp-2" data-v-5f58c885>${ssrInterpolate(item.title)}</p></div></div></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/page-banner.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const pageBanner = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-5f58c885"]]);
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "page-category",
  __ssrInlineRender: true,
  setup(__props) {
    const { categoryMenu } = useAppConfig();
    let list = ref(categoryMenu);
    const { categoryLinkArticle } = useArticleStore$1();
    list.value = categoryMenu.map((item) => {
      let articles = [];
      item.value.forEach((i) => {
        if (categoryLinkArticle) {
          articles = [...articles, ...categoryLinkArticle.get(i) || []];
        }
      });
      return {
        ...item,
        articles,
        count: articles.length
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4 md:grid-cols-2" }, _attrs))}><!--[-->`);
      ssrRenderList(unref(list), (item, index2) => {
        _push(`<div class="${ssrRenderClass(`stats border hover:shadow-xl cursor-pointer transition-all duration-300 shadow  shadow-${item.class} border-${item.class}`)}"><div class="stat"><div class="${ssrRenderClass(`stat-figure  text-${item.class}`)}"><div class="avatar"><div class="w-16 rounded-full"><img${ssrRenderAttr("src", item.img)}></div></div></div><div class="stat-title">${ssrInterpolate(item.label)}</div><div class="${ssrRenderClass(`stat-value countdown text-${item.class}`)}"><span style="${ssrRenderStyle(`--value:${item.count || 0};`)}"></span> ${ssrInterpolate(item.count && +item.count > 99 ? "+" : "")}</div><div class="stat-desc"></div></div></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/page-category.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "list-item",
  __ssrInlineRender: true,
  props: {
    list: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  setup(__props) {
    const props = __props;
    useRouter();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "list-item-container" }, _attrs))}><!--[-->`);
      ssrRenderList(props.list, (item, index2) => {
        _push(`<div class="card mb-3 border-solid cursor-pointer transition-all border md:card-side bg-base-100 shadow hover:shadow-xl"><figure class="w-full md:max-w-[180px] md:min-w-[120px]"><img${ssrRenderAttr("src", item.header)} class="md:h-full h-40 w-full object-cover"${ssrRenderAttr("alt", item.title)}></figure><div class="card-body p-4"><h2 class="card-title line-clamp-1 break-all">${ssrInterpolate(item.title)}</h2><p class="text-gray-700 line-clamp-2 dark:text-gray-300">${ssrInterpolate(item.description)}</p><div class="px-6 card-actions justify-end py-4"><!--[-->`);
        ssrRenderList(item.tags, (tag, key) => {
          _push(`<!--[-->`);
          if (key < 4) {
            _push(`<span class="badge cursor-pointer">#${ssrInterpolate(tag)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--></div></div></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tools/list-item.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "custom-count",
  __ssrInlineRender: true,
  props: {
    count: {
      type: Number,
      default: 0
    },
    customClass: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: `countdown ${props.customClass}`
      }, _attrs))}>`);
      if (props.count && +props.count > 99) {
        _push(`<!--[--> 99+ <!--]-->`);
      } else {
        _push(`<span style="${ssrRenderStyle(`--value:${props.count || 0};`)}"></span>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tools/custom-count.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const customClass = "text-xl font-mono";
const _sfc_main$4 = {
  __name: "my-card",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { myInfo } = useAppConfig();
    const totalInfo = reactive({
      tags: 0,
      categories: 0,
      totals: 0
    });
    const categoryMap = /* @__PURE__ */ new Set(), tagSet = /* @__PURE__ */ new Set();
    const result = ([__temp, __restore] = withAsyncContext(() => queryContent("articles").only(["id", "category", "tags"]).find()), __temp = await __temp, __restore(), __temp);
    totalInfo.totals = result.length;
    result.forEach((i) => {
      if (i.tags && i.tags.length) {
        i.tags.forEach((child) => tagSet.add(child));
      }
      categoryMap.add(i.category);
    });
    nextTick(() => {
      totalInfo.tags = tagSet.size;
      totalInfo.categories = categoryMap.size;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "card bg-base-100 shadow-xl" }, _attrs))}><figure><img${ssrRenderAttr("src", unref(myInfo).bgImg)} class="h-40 object-cover w-full"></figure><div class="card-body card-message"><div class="avatar"><div class="w-24 m-auto rounded-full"><img lass="mask mask-decagon"${ssrRenderAttr("src", unref(myInfo).avatar)}></div></div><h2 class="card-title text-lg justify-center mt-3">${ssrInterpolate(unref(myInfo).name)}</h2><p class="break-all mt-3 chat-footer opacity-50">${ssrInterpolate(unref(myInfo).desc)}</p><div class="flex flex-row justify-between mt-6"><div class="count-item">`);
      _push(ssrRenderComponent(_sfc_main$5, {
        count: unref(totalInfo).categories,
        "custom-class": customClass
      }, null, _parent));
      _push(`<span class="count-item-label">\u5206\u7C7B</span></div><div class="divider m-0 divider-horizontal"></div><div class="count-item">`);
      _push(ssrRenderComponent(_sfc_main$5, {
        count: unref(totalInfo).tags,
        "custom-class": customClass
      }, null, _parent));
      _push(`<span class="count-item-label">\u6807\u7B7E</span></div><div class="divider m-0 divider-horizontal"></div><div class="count-item">`);
      _push(ssrRenderComponent(_sfc_main$5, {
        count: unref(totalInfo).totals,
        "custom-class": customClass
      }, null, _parent));
      _push(`<span class="count-item-label">\u6587\u7AE0</span></div></div>`);
      if (unref(myInfo) && unref(myInfo).links && unref(myInfo).links.length) {
        _push(`<!--[--><div class="divider m-0"></div><div class="flex flex-row justify-between mt-3"><!--[-->`);
        ssrRenderList(unref(myInfo).links, (item, index2) => {
          _push(`<a${ssrRenderAttr("title", item.label)}${ssrRenderAttr("href", item.link)} target="_blank" class="w-7 h-7" rel="noopener noreferrer"><img${ssrRenderAttr("src", item.img)}${ssrRenderAttr("alt", item.label)} class="object-cover w-7 h-7"></a>`);
        });
        _push(`<!--]--></div><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tools/my-card.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const myCard = _sfc_main$4;
const _imports_0 = "" + publicAssetsURL("img/my-wechat.png");
const _sfc_main$3 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "card w-full bg-base-100 shadow-xl" }, _attrs))}><div class="card-body p-4 pt-2"><h4 class="card-title text-lg"><span class="i-mdi-wechat"></span> \u5FAE\u4FE1\u516C\u4F17\u53F7\u53F7 </h4><div class="divider m-0 h-0.5"></div><img${ssrRenderAttr("src", _imports_0)} class="w-full" alt="" srcset=""></div></div>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tools/we-chat.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const weChat = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "custom-clock",
  __ssrInlineRender: true,
  setup(__props) {
    const dayjs = useDayjs();
    const fullScreen = ref(false);
    ref(0);
    const hourRota = ref(0);
    ref(0);
    const minuteRota = ref(0);
    ref(0);
    const secondRota = ref(0);
    const time = reactive({
      year: dayjs().year(),
      month: dayjs().month() + 1,
      day: dayjs().date(),
      hour: dayjs().hour(),
      minute: dayjs().minute(),
      second: 0,
      week: 0,
      solar: ""
    });
    const handleExit = () => {
      fullScreen.value = !!getFullscreenElement();
    };
    const pointerlockchange = () => {
    };
    const pointerlockerror = () => {
      console.log("\u9501\u5B9A\u6307\u9488\u65F6\u51FA\u9519\u3002");
    };
    onUnmounted(() => {
      document.removeEventListener("pointerlockchange", pointerlockchange, false);
      document.removeEventListener("pointerlockerror", pointerlockerror, false);
      document.removeEventListener("fullscreenchange", handleExit, false);
      document.removeEventListener("webkitfullscreenchange", handleExit, false);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "card w-full bg-base-100 shadow-xl" }, _attrs))} data-v-f1ebed2b><div class="card-body p-4 pt-2" data-v-f1ebed2b><h4 class="card-title text-lg relative" data-v-f1ebed2b><span class="i-mdi-clock-time-eight-outline" data-v-f1ebed2b></span> \u65F6\u949F <span class="i-mdi-fit-to-screen-outline absolute right-0 cursor-pointer" data-v-f1ebed2b></span></h4><div class="divider m-0 h-0.5" data-v-f1ebed2b></div><div id="full-screen-clock" class="${ssrRenderClass(`${unref(fullScreen) ? "bg-base-300" : ""} flex-col flex justify-center items-center`)}" data-v-f1ebed2b><div class="${ssrRenderClass(`clock transition-all ${unref(fullScreen) ? "w-72 h-72 bg-base-300" : "w-full h-60"}`)}" data-v-f1ebed2b><div style="${ssrRenderStyle(`transform: rotateZ(${unref(hourRota)}deg);`)}" class="hours-container" data-v-f1ebed2b><div class="hours" data-v-f1ebed2b></div></div><div style="${ssrRenderStyle(`transform: rotateZ(${unref(minuteRota)}deg);`)}" class="minutes-container" data-v-f1ebed2b><div class="minutes" data-v-f1ebed2b></div></div><div style="${ssrRenderStyle(`transform: rotateZ(${unref(secondRota)}deg);`)}" class="seconds-container" data-v-f1ebed2b><div class="seconds" data-v-f1ebed2b></div></div></div>`);
      if (unref(fullScreen)) {
        _push(`<!--[--><div class="grid grid-flow-col gap-5 text-center auto-cols-max mt-10" data-v-f1ebed2b><div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content" data-v-f1ebed2b><span class="countdown font-mono text-5xl" data-v-f1ebed2b><span style="${ssrRenderStyle(`--value: ${unref(time).hour};`)}" data-v-f1ebed2b></span></span> \u65F6 </div><div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content" data-v-f1ebed2b><span class="countdown font-mono text-5xl" data-v-f1ebed2b><span style="${ssrRenderStyle(`--value: ${unref(time).minute};`)}" data-v-f1ebed2b></span></span> \u5206 </div><div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content" data-v-f1ebed2b><span class="countdown font-mono text-5xl" data-v-f1ebed2b><span style="${ssrRenderStyle(`--value: ${unref(time).second};`)}" data-v-f1ebed2b></span></span> \u79D2 </div></div><div class="mt-10 text-center text-2xl" data-v-f1ebed2b>${ssrInterpolate(unref(time).year)}-${ssrInterpolate(unref(time).month)}-${ssrInterpolate(unref(time).day)}</div><div class="mt-10 text-center text-2xl" data-v-f1ebed2b>${ssrInterpolate(unref(time).solar)}</div><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tools/custom-clock.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const customClock = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-f1ebed2b"]]);
const _sfc_main$1 = {
  __name: "home-side",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(myCard, null, null, _parent));
      _push(`<div class="mt-4">`);
      _push(ssrRenderComponent(weChat, null, null, _parent));
      _push(`</div><div class="mt-4">`);
      _push(ssrRenderComponent(customClock, null, null, _parent));
      _push(`</div><!--]-->`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home-side.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const homeSide = _sfc_main$1;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    let list = ([__temp, __restore] = withAsyncContext(() => queryContent("articles").only(["_path", "banner", "date", "description", "header", "tags", "img", "category", "title"]).limit(20).sort({ date: -1 }).find()), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "px-4 xl:w-10/12 m-auto max-w-screen-xl" }, _attrs))} data-v-f0b8fc72>`);
      _push(ssrRenderComponent(pageBanner, null, null, _parent));
      _push(`<div class="divider" data-v-f0b8fc72></div><div class="flex flex-row" data-v-f0b8fc72><div class="flex-1 pb-20" data-v-f0b8fc72>`);
      _push(ssrRenderComponent(_sfc_main$7, null, null, _parent));
      _push(`<div class="divider" data-v-f0b8fc72></div>`);
      _push(ssrRenderComponent(_sfc_main$6, { list: unref(list) }, null, _parent));
      _push(`</div><div class="h-fit hidden md:block w-72 pl-4" data-v-f0b8fc72>`);
      _push(ssrRenderComponent(homeSide, null, null, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f0b8fc72"]]);

export { index as default };
//# sourceMappingURL=index-89cc8535.mjs.map
