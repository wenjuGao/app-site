import { defineComponent, ref, unref, useSSRContext } from 'vue';
import { ssrRenderSlot, ssrRenderStyle } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Translate",
  __ssrInlineRender: true,
  setup(__props) {
    const show = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><figure class="content">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</figure><figure class="translate py-1 mb-2 ease-in" style="${ssrRenderStyle(unref(show) ? null : { display: "none" })}">`);
      ssrRenderSlot(_ctx.$slots, "translate", {}, null, _push, _parent);
      _push(`</figure><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/content/Translate.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as default };
//# sourceMappingURL=Translate-B0A8AWQ3.mjs.map
