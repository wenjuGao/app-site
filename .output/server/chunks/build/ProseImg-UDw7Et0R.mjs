import { _ as __nuxt_component_0 } from './client-only-Bwxzq3Sq.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ProseImg",
  __ssrInlineRender: true,
  props: {
    src: {
      type: String,
      default: function() {
        return "";
      }
    },
    class: {
      type: String,
      default: function() {
        return "";
      }
    },
    alt: {
      type: String,
      default: function() {
        return "";
      }
    }
  },
  setup(__props) {
    ref(null);
    ref(true);
    const error = ref(false);
    computed(() => error.value ? "/img/img-error.svg" : imgUrl.value);
    const imgUrl = ref();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0;
      _push(ssrRenderComponent(_component_ClientOnly, mergeProps({ fallbackTag: "span" }, _attrs), {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="skeleton w-full h-full min-h-32"${_scopeId}></div>`);
          } else {
            return [
              createVNode("div", { class: "skeleton w-full h-full min-h-32" })
            ];
          }
        })
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/content/ProseImg.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as default };
//# sourceMappingURL=ProseImg-UDw7Et0R.mjs.map
