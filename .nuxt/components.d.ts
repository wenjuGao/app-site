
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T extends DefineComponent> = T & DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>>
type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = (T & DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }>)
interface _GlobalComponents {
      'Auto': typeof import("../components/content/Auto.vue")['default']
    'BasicShape': typeof import("../components/content/BasicShape.vue")['default']
    'EchartChart': typeof import("../components/content/EchartChart.vue")['default']
    'FillRule': typeof import("../components/content/FillRule.vue")['default']
    'FirstChild': typeof import("../components/content/FirstChild.vue")['default']
    'G6Chart': typeof import("../components/content/G6Chart.vue")['default']
    'Length': typeof import("../components/content/Length.vue")['default']
    'Mermaid': typeof import("../components/content/Mermaid.vue")['default']
    'Percentage': typeof import("../components/content/Percentage.vue")['default']
    'ProseA': typeof import("../components/content/ProseA.vue")['default']
    'ProseBlockquote': typeof import("../components/content/ProseBlockquote.vue")['default']
    'ProseCode': typeof import("../components/content/ProseCode.vue")['default']
    'ProseEm': typeof import("../components/content/ProseEm.vue")['default']
    'ProseH1': typeof import("../components/content/ProseH1.vue")['default']
    'ProseH2': typeof import("../components/content/ProseH2.vue")['default']
    'ProseH3': typeof import("../components/content/ProseH3.vue")['default']
    'ProseH4': typeof import("../components/content/ProseH4.vue")['default']
    'ProseH5': typeof import("../components/content/ProseH5.vue")['default']
    'ProseH6': typeof import("../components/content/ProseH6.vue")['default']
    'ProseHr': typeof import("../components/content/ProseHr.vue")['default']
    'ProseImg': typeof import("../components/content/ProseImg.vue")['default']
    'ProseLi': typeof import("../components/content/ProseLi.vue")['default']
    'ProseOl': typeof import("../components/content/ProseOl.vue")['default']
    'ProseP': typeof import("../components/content/ProseP.vue")['default']
    'ProsePre': typeof import("../components/content/ProsePre.vue")['default']
    'ProseScript': typeof import("../components/content/ProseScript.vue")['default']
    'ProseStrong': typeof import("../components/content/ProseStrong.vue")['default']
    'ProseTable': typeof import("../components/content/ProseTable.vue")['default']
    'ProseTbody': typeof import("../components/content/ProseTbody.vue")['default']
    'ProseTd': typeof import("../components/content/ProseTd.vue")['default']
    'ProseTh': typeof import("../components/content/ProseTh.vue")['default']
    'ProseThead': typeof import("../components/content/ProseThead.vue")['default']
    'ProseTr': typeof import("../components/content/ProseTr.vue")['default']
    'ProseUl': typeof import("../components/content/ProseUl.vue")['default']
    'Tip': typeof import("../components/content/Tip.vue")['default']
    'Translate': typeof import("../components/content/Translate.vue")['default']
    'HomeSide': typeof import("../components/home-side.vue")['default']
    'LaboratoryCustomClock': typeof import("../components/laboratory/custom-clock.vue")['default']
    'LaboratoryInterestRate': typeof import("../components/laboratory/interest-rate.vue")['default']
    'PageBanner': typeof import("../components/page-banner.vue")['default']
    'PageCategory': typeof import("../components/page-category.vue")['default']
    'PageFooter': typeof import("../components/page-footer.vue")['default']
    'PageHeader': typeof import("../components/page-header.vue")['default']
    'ScollTop': typeof import("../components/scoll-top.vue")['default']
    'ToolsCardItem': typeof import("../components/tools/card-item.vue")['default']
    'ToolsCategoryChart': typeof import("../components/tools/category-chart.vue")['default']
    'ToolsCustomCount': typeof import("../components/tools/custom-count.vue")['default']
    'ToolsEmptyCard': typeof import("../components/tools/empty-card.vue")['default']
    'ToolsListItem': typeof import("../components/tools/list-item.vue")['default']
    'ToolsLoadingCard': typeof import("../components/tools/loading-card.vue")['default']
    'ToolsMenuList': typeof import("../components/tools/menu-list.vue")['default']
    'ToolsMenuSwap': typeof import("../components/tools/menu-swap.vue")['default']
    'ToolsMyCard': typeof import("../components/tools/my-card.vue")['default']
    'ToolsTagsChart': typeof import("../components/tools/tags-chart.vue")['default']
    'ToolsThemeSwap': typeof import("../components/tools/theme-swap.vue")['default']
    'ToolsTocMenu': typeof import("../components/tools/toc-menu.vue")['default']
    'ToolsWeChat': typeof import("../components/tools/we-chat.vue")['default']
    'TwikooComment': typeof import("../components/twikoo-comment.vue")['default']
    'ContentDoc': typeof import("../node_modules/@nuxt/content/dist/runtime/components/ContentDoc.vue")['default']
    'ContentList': typeof import("../node_modules/@nuxt/content/dist/runtime/components/ContentList.vue")['default']
    'ContentNavigation': typeof import("../node_modules/@nuxt/content/dist/runtime/components/ContentNavigation.vue")['default']
    'ContentQuery': typeof import("../node_modules/@nuxt/content/dist/runtime/components/ContentQuery.vue")['default']
    'ContentRenderer': typeof import("../node_modules/@nuxt/content/dist/runtime/components/ContentRenderer.vue")['default']
    'ContentRendererMarkdown': typeof import("../node_modules/@nuxt/content/dist/runtime/components/ContentRendererMarkdown.vue")['default']
    'ContentSlot': typeof import("../node_modules/@nuxt/content/dist/runtime/components/ContentSlot.vue")['default']
    'DocumentDrivenEmpty': typeof import("../node_modules/@nuxt/content/dist/runtime/components/DocumentDrivenEmpty.vue")['default']
    'DocumentDrivenNotFound': typeof import("../node_modules/@nuxt/content/dist/runtime/components/DocumentDrivenNotFound.vue")['default']
    'Markdown': typeof import("../node_modules/@nuxt/content/dist/runtime/components/Markdown.vue")['default']
    'ProseCodeInline': typeof import("../node_modules/@nuxt/content/dist/runtime/components/Prose/ProseCodeInline.vue")['default']
    'NuxtWelcome': typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
    'NuxtLayout': typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
    'NuxtErrorBoundary': typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
    'ClientOnly': typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
    'DevOnly': typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
    'ServerPlaceholder': typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
    'NuxtLink': typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
    'NuxtLoadingIndicator': typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
    'NuxtTime': typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
    'NuxtRouteAnnouncer': typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
    'NuxtImg': typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
    'NuxtPicture': typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
    'MDC': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/MDC.vue")['default']
    'MDCRenderer': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/MDCRenderer.vue")['default']
    'MDCSlot': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/MDCSlot.vue")['default']
    'ColorScheme': typeof import("../node_modules/@nuxtjs/color-mode/dist/runtime/component.vue3.vue")['default']
    'NuxtPage': typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
    'NoScript': typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
    'Link': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
    'Base': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
    'Title': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
    'Meta': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
    'Style': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
    'Head': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
    'Html': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
    'Body': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
    'NuxtIsland': typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
    'NuxtRouteAnnouncer': IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
      'LazyAuto': LazyComponent<typeof import("../components/content/Auto.vue")['default']>
    'LazyBasicShape': LazyComponent<typeof import("../components/content/BasicShape.vue")['default']>
    'LazyEchartChart': LazyComponent<typeof import("../components/content/EchartChart.vue")['default']>
    'LazyFillRule': LazyComponent<typeof import("../components/content/FillRule.vue")['default']>
    'LazyFirstChild': LazyComponent<typeof import("../components/content/FirstChild.vue")['default']>
    'LazyG6Chart': LazyComponent<typeof import("../components/content/G6Chart.vue")['default']>
    'LazyLength': LazyComponent<typeof import("../components/content/Length.vue")['default']>
    'LazyMermaid': LazyComponent<typeof import("../components/content/Mermaid.vue")['default']>
    'LazyPercentage': LazyComponent<typeof import("../components/content/Percentage.vue")['default']>
    'LazyProseA': LazyComponent<typeof import("../components/content/ProseA.vue")['default']>
    'LazyProseBlockquote': LazyComponent<typeof import("../components/content/ProseBlockquote.vue")['default']>
    'LazyProseCode': LazyComponent<typeof import("../components/content/ProseCode.vue")['default']>
    'LazyProseEm': LazyComponent<typeof import("../components/content/ProseEm.vue")['default']>
    'LazyProseH1': LazyComponent<typeof import("../components/content/ProseH1.vue")['default']>
    'LazyProseH2': LazyComponent<typeof import("../components/content/ProseH2.vue")['default']>
    'LazyProseH3': LazyComponent<typeof import("../components/content/ProseH3.vue")['default']>
    'LazyProseH4': LazyComponent<typeof import("../components/content/ProseH4.vue")['default']>
    'LazyProseH5': LazyComponent<typeof import("../components/content/ProseH5.vue")['default']>
    'LazyProseH6': LazyComponent<typeof import("../components/content/ProseH6.vue")['default']>
    'LazyProseHr': LazyComponent<typeof import("../components/content/ProseHr.vue")['default']>
    'LazyProseImg': LazyComponent<typeof import("../components/content/ProseImg.vue")['default']>
    'LazyProseLi': LazyComponent<typeof import("../components/content/ProseLi.vue")['default']>
    'LazyProseOl': LazyComponent<typeof import("../components/content/ProseOl.vue")['default']>
    'LazyProseP': LazyComponent<typeof import("../components/content/ProseP.vue")['default']>
    'LazyProsePre': LazyComponent<typeof import("../components/content/ProsePre.vue")['default']>
    'LazyProseScript': LazyComponent<typeof import("../components/content/ProseScript.vue")['default']>
    'LazyProseStrong': LazyComponent<typeof import("../components/content/ProseStrong.vue")['default']>
    'LazyProseTable': LazyComponent<typeof import("../components/content/ProseTable.vue")['default']>
    'LazyProseTbody': LazyComponent<typeof import("../components/content/ProseTbody.vue")['default']>
    'LazyProseTd': LazyComponent<typeof import("../components/content/ProseTd.vue")['default']>
    'LazyProseTh': LazyComponent<typeof import("../components/content/ProseTh.vue")['default']>
    'LazyProseThead': LazyComponent<typeof import("../components/content/ProseThead.vue")['default']>
    'LazyProseTr': LazyComponent<typeof import("../components/content/ProseTr.vue")['default']>
    'LazyProseUl': LazyComponent<typeof import("../components/content/ProseUl.vue")['default']>
    'LazyTip': LazyComponent<typeof import("../components/content/Tip.vue")['default']>
    'LazyTranslate': LazyComponent<typeof import("../components/content/Translate.vue")['default']>
    'LazyHomeSide': LazyComponent<typeof import("../components/home-side.vue")['default']>
    'LazyLaboratoryCustomClock': LazyComponent<typeof import("../components/laboratory/custom-clock.vue")['default']>
    'LazyLaboratoryInterestRate': LazyComponent<typeof import("../components/laboratory/interest-rate.vue")['default']>
    'LazyPageBanner': LazyComponent<typeof import("../components/page-banner.vue")['default']>
    'LazyPageCategory': LazyComponent<typeof import("../components/page-category.vue")['default']>
    'LazyPageFooter': LazyComponent<typeof import("../components/page-footer.vue")['default']>
    'LazyPageHeader': LazyComponent<typeof import("../components/page-header.vue")['default']>
    'LazyScollTop': LazyComponent<typeof import("../components/scoll-top.vue")['default']>
    'LazyToolsCardItem': LazyComponent<typeof import("../components/tools/card-item.vue")['default']>
    'LazyToolsCategoryChart': LazyComponent<typeof import("../components/tools/category-chart.vue")['default']>
    'LazyToolsCustomCount': LazyComponent<typeof import("../components/tools/custom-count.vue")['default']>
    'LazyToolsEmptyCard': LazyComponent<typeof import("../components/tools/empty-card.vue")['default']>
    'LazyToolsListItem': LazyComponent<typeof import("../components/tools/list-item.vue")['default']>
    'LazyToolsLoadingCard': LazyComponent<typeof import("../components/tools/loading-card.vue")['default']>
    'LazyToolsMenuList': LazyComponent<typeof import("../components/tools/menu-list.vue")['default']>
    'LazyToolsMenuSwap': LazyComponent<typeof import("../components/tools/menu-swap.vue")['default']>
    'LazyToolsMyCard': LazyComponent<typeof import("../components/tools/my-card.vue")['default']>
    'LazyToolsTagsChart': LazyComponent<typeof import("../components/tools/tags-chart.vue")['default']>
    'LazyToolsThemeSwap': LazyComponent<typeof import("../components/tools/theme-swap.vue")['default']>
    'LazyToolsTocMenu': LazyComponent<typeof import("../components/tools/toc-menu.vue")['default']>
    'LazyToolsWeChat': LazyComponent<typeof import("../components/tools/we-chat.vue")['default']>
    'LazyTwikooComment': LazyComponent<typeof import("../components/twikoo-comment.vue")['default']>
    'LazyContentDoc': LazyComponent<typeof import("../node_modules/@nuxt/content/dist/runtime/components/ContentDoc.vue")['default']>
    'LazyContentList': LazyComponent<typeof import("../node_modules/@nuxt/content/dist/runtime/components/ContentList.vue")['default']>
    'LazyContentNavigation': LazyComponent<typeof import("../node_modules/@nuxt/content/dist/runtime/components/ContentNavigation.vue")['default']>
    'LazyContentQuery': LazyComponent<typeof import("../node_modules/@nuxt/content/dist/runtime/components/ContentQuery.vue")['default']>
    'LazyContentRenderer': LazyComponent<typeof import("../node_modules/@nuxt/content/dist/runtime/components/ContentRenderer.vue")['default']>
    'LazyContentRendererMarkdown': LazyComponent<typeof import("../node_modules/@nuxt/content/dist/runtime/components/ContentRendererMarkdown.vue")['default']>
    'LazyContentSlot': LazyComponent<typeof import("../node_modules/@nuxt/content/dist/runtime/components/ContentSlot.vue")['default']>
    'LazyDocumentDrivenEmpty': LazyComponent<typeof import("../node_modules/@nuxt/content/dist/runtime/components/DocumentDrivenEmpty.vue")['default']>
    'LazyDocumentDrivenNotFound': LazyComponent<typeof import("../node_modules/@nuxt/content/dist/runtime/components/DocumentDrivenNotFound.vue")['default']>
    'LazyMarkdown': LazyComponent<typeof import("../node_modules/@nuxt/content/dist/runtime/components/Markdown.vue")['default']>
    'LazyProseCodeInline': LazyComponent<typeof import("../node_modules/@nuxt/content/dist/runtime/components/Prose/ProseCodeInline.vue")['default']>
    'LazyNuxtWelcome': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
    'LazyNuxtLayout': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
    'LazyNuxtErrorBoundary': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
    'LazyClientOnly': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
    'LazyDevOnly': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
    'LazyServerPlaceholder': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
    'LazyNuxtLink': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
    'LazyNuxtLoadingIndicator': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
    'LazyNuxtTime': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
    'LazyNuxtImg': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
    'LazyNuxtPicture': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
    'LazyMDC': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/MDC.vue")['default']>
    'LazyMDCRenderer': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/MDCRenderer.vue")['default']>
    'LazyMDCSlot': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/MDCSlot.vue")['default']>
    'LazyColorScheme': LazyComponent<typeof import("../node_modules/@nuxtjs/color-mode/dist/runtime/component.vue3.vue")['default']>
    'LazyNuxtPage': LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
    'LazyNoScript': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
    'LazyLink': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
    'LazyBase': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
    'LazyTitle': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
    'LazyMeta': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
    'LazyStyle': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
    'LazyHead': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
    'LazyHtml': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
    'LazyBody': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
    'LazyNuxtIsland': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export const Auto: typeof import("../components/content/Auto.vue")['default']
export const BasicShape: typeof import("../components/content/BasicShape.vue")['default']
export const EchartChart: typeof import("../components/content/EchartChart.vue")['default']
export const FillRule: typeof import("../components/content/FillRule.vue")['default']
export const FirstChild: typeof import("../components/content/FirstChild.vue")['default']
export const G6Chart: typeof import("../components/content/G6Chart.vue")['default']
export const Length: typeof import("../components/content/Length.vue")['default']
export const Mermaid: typeof import("../components/content/Mermaid.vue")['default']
export const Percentage: typeof import("../components/content/Percentage.vue")['default']
export const ProseA: typeof import("../components/content/ProseA.vue")['default']
export const ProseBlockquote: typeof import("../components/content/ProseBlockquote.vue")['default']
export const ProseCode: typeof import("../components/content/ProseCode.vue")['default']
export const ProseEm: typeof import("../components/content/ProseEm.vue")['default']
export const ProseH1: typeof import("../components/content/ProseH1.vue")['default']
export const ProseH2: typeof import("../components/content/ProseH2.vue")['default']
export const ProseH3: typeof import("../components/content/ProseH3.vue")['default']
export const ProseH4: typeof import("../components/content/ProseH4.vue")['default']
export const ProseH5: typeof import("../components/content/ProseH5.vue")['default']
export const ProseH6: typeof import("../components/content/ProseH6.vue")['default']
export const ProseHr: typeof import("../components/content/ProseHr.vue")['default']
export const ProseImg: typeof import("../components/content/ProseImg.vue")['default']
export const ProseLi: typeof import("../components/content/ProseLi.vue")['default']
export const ProseOl: typeof import("../components/content/ProseOl.vue")['default']
export const ProseP: typeof import("../components/content/ProseP.vue")['default']
export const ProsePre: typeof import("../components/content/ProsePre.vue")['default']
export const ProseScript: typeof import("../components/content/ProseScript.vue")['default']
export const ProseStrong: typeof import("../components/content/ProseStrong.vue")['default']
export const ProseTable: typeof import("../components/content/ProseTable.vue")['default']
export const ProseTbody: typeof import("../components/content/ProseTbody.vue")['default']
export const ProseTd: typeof import("../components/content/ProseTd.vue")['default']
export const ProseTh: typeof import("../components/content/ProseTh.vue")['default']
export const ProseThead: typeof import("../components/content/ProseThead.vue")['default']
export const ProseTr: typeof import("../components/content/ProseTr.vue")['default']
export const ProseUl: typeof import("../components/content/ProseUl.vue")['default']
export const Tip: typeof import("../components/content/Tip.vue")['default']
export const Translate: typeof import("../components/content/Translate.vue")['default']
export const HomeSide: typeof import("../components/home-side.vue")['default']
export const LaboratoryCustomClock: typeof import("../components/laboratory/custom-clock.vue")['default']
export const LaboratoryInterestRate: typeof import("../components/laboratory/interest-rate.vue")['default']
export const PageBanner: typeof import("../components/page-banner.vue")['default']
export const PageCategory: typeof import("../components/page-category.vue")['default']
export const PageFooter: typeof import("../components/page-footer.vue")['default']
export const PageHeader: typeof import("../components/page-header.vue")['default']
export const ScollTop: typeof import("../components/scoll-top.vue")['default']
export const ToolsCardItem: typeof import("../components/tools/card-item.vue")['default']
export const ToolsCategoryChart: typeof import("../components/tools/category-chart.vue")['default']
export const ToolsCustomCount: typeof import("../components/tools/custom-count.vue")['default']
export const ToolsEmptyCard: typeof import("../components/tools/empty-card.vue")['default']
export const ToolsListItem: typeof import("../components/tools/list-item.vue")['default']
export const ToolsLoadingCard: typeof import("../components/tools/loading-card.vue")['default']
export const ToolsMenuList: typeof import("../components/tools/menu-list.vue")['default']
export const ToolsMenuSwap: typeof import("../components/tools/menu-swap.vue")['default']
export const ToolsMyCard: typeof import("../components/tools/my-card.vue")['default']
export const ToolsTagsChart: typeof import("../components/tools/tags-chart.vue")['default']
export const ToolsThemeSwap: typeof import("../components/tools/theme-swap.vue")['default']
export const ToolsTocMenu: typeof import("../components/tools/toc-menu.vue")['default']
export const ToolsWeChat: typeof import("../components/tools/we-chat.vue")['default']
export const TwikooComment: typeof import("../components/twikoo-comment.vue")['default']
export const ContentDoc: typeof import("../node_modules/@nuxt/content/dist/runtime/components/ContentDoc.vue")['default']
export const ContentList: typeof import("../node_modules/@nuxt/content/dist/runtime/components/ContentList.vue")['default']
export const ContentNavigation: typeof import("../node_modules/@nuxt/content/dist/runtime/components/ContentNavigation.vue")['default']
export const ContentQuery: typeof import("../node_modules/@nuxt/content/dist/runtime/components/ContentQuery.vue")['default']
export const ContentRenderer: typeof import("../node_modules/@nuxt/content/dist/runtime/components/ContentRenderer.vue")['default']
export const ContentRendererMarkdown: typeof import("../node_modules/@nuxt/content/dist/runtime/components/ContentRendererMarkdown.vue")['default']
export const ContentSlot: typeof import("../node_modules/@nuxt/content/dist/runtime/components/ContentSlot.vue")['default']
export const DocumentDrivenEmpty: typeof import("../node_modules/@nuxt/content/dist/runtime/components/DocumentDrivenEmpty.vue")['default']
export const DocumentDrivenNotFound: typeof import("../node_modules/@nuxt/content/dist/runtime/components/DocumentDrivenNotFound.vue")['default']
export const Markdown: typeof import("../node_modules/@nuxt/content/dist/runtime/components/Markdown.vue")['default']
export const ProseCodeInline: typeof import("../node_modules/@nuxt/content/dist/runtime/components/Prose/ProseCodeInline.vue")['default']
export const NuxtWelcome: typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
export const ClientOnly: typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtTime: typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtImg: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
export const NuxtPicture: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
export const MDC: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/MDC.vue")['default']
export const MDCRenderer: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/MDCRenderer.vue")['default']
export const MDCSlot: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/MDCSlot.vue")['default']
export const ColorScheme: typeof import("../node_modules/@nuxtjs/color-mode/dist/runtime/component.vue3.vue")['default']
export const NuxtPage: typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
export const NoScript: typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
export const NuxtIsland: typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const NuxtRouteAnnouncer: IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyAuto: LazyComponent<typeof import("../components/content/Auto.vue")['default']>
export const LazyBasicShape: LazyComponent<typeof import("../components/content/BasicShape.vue")['default']>
export const LazyEchartChart: LazyComponent<typeof import("../components/content/EchartChart.vue")['default']>
export const LazyFillRule: LazyComponent<typeof import("../components/content/FillRule.vue")['default']>
export const LazyFirstChild: LazyComponent<typeof import("../components/content/FirstChild.vue")['default']>
export const LazyG6Chart: LazyComponent<typeof import("../components/content/G6Chart.vue")['default']>
export const LazyLength: LazyComponent<typeof import("../components/content/Length.vue")['default']>
export const LazyMermaid: LazyComponent<typeof import("../components/content/Mermaid.vue")['default']>
export const LazyPercentage: LazyComponent<typeof import("../components/content/Percentage.vue")['default']>
export const LazyProseA: LazyComponent<typeof import("../components/content/ProseA.vue")['default']>
export const LazyProseBlockquote: LazyComponent<typeof import("../components/content/ProseBlockquote.vue")['default']>
export const LazyProseCode: LazyComponent<typeof import("../components/content/ProseCode.vue")['default']>
export const LazyProseEm: LazyComponent<typeof import("../components/content/ProseEm.vue")['default']>
export const LazyProseH1: LazyComponent<typeof import("../components/content/ProseH1.vue")['default']>
export const LazyProseH2: LazyComponent<typeof import("../components/content/ProseH2.vue")['default']>
export const LazyProseH3: LazyComponent<typeof import("../components/content/ProseH3.vue")['default']>
export const LazyProseH4: LazyComponent<typeof import("../components/content/ProseH4.vue")['default']>
export const LazyProseH5: LazyComponent<typeof import("../components/content/ProseH5.vue")['default']>
export const LazyProseH6: LazyComponent<typeof import("../components/content/ProseH6.vue")['default']>
export const LazyProseHr: LazyComponent<typeof import("../components/content/ProseHr.vue")['default']>
export const LazyProseImg: LazyComponent<typeof import("../components/content/ProseImg.vue")['default']>
export const LazyProseLi: LazyComponent<typeof import("../components/content/ProseLi.vue")['default']>
export const LazyProseOl: LazyComponent<typeof import("../components/content/ProseOl.vue")['default']>
export const LazyProseP: LazyComponent<typeof import("../components/content/ProseP.vue")['default']>
export const LazyProsePre: LazyComponent<typeof import("../components/content/ProsePre.vue")['default']>
export const LazyProseScript: LazyComponent<typeof import("../components/content/ProseScript.vue")['default']>
export const LazyProseStrong: LazyComponent<typeof import("../components/content/ProseStrong.vue")['default']>
export const LazyProseTable: LazyComponent<typeof import("../components/content/ProseTable.vue")['default']>
export const LazyProseTbody: LazyComponent<typeof import("../components/content/ProseTbody.vue")['default']>
export const LazyProseTd: LazyComponent<typeof import("../components/content/ProseTd.vue")['default']>
export const LazyProseTh: LazyComponent<typeof import("../components/content/ProseTh.vue")['default']>
export const LazyProseThead: LazyComponent<typeof import("../components/content/ProseThead.vue")['default']>
export const LazyProseTr: LazyComponent<typeof import("../components/content/ProseTr.vue")['default']>
export const LazyProseUl: LazyComponent<typeof import("../components/content/ProseUl.vue")['default']>
export const LazyTip: LazyComponent<typeof import("../components/content/Tip.vue")['default']>
export const LazyTranslate: LazyComponent<typeof import("../components/content/Translate.vue")['default']>
export const LazyHomeSide: LazyComponent<typeof import("../components/home-side.vue")['default']>
export const LazyLaboratoryCustomClock: LazyComponent<typeof import("../components/laboratory/custom-clock.vue")['default']>
export const LazyLaboratoryInterestRate: LazyComponent<typeof import("../components/laboratory/interest-rate.vue")['default']>
export const LazyPageBanner: LazyComponent<typeof import("../components/page-banner.vue")['default']>
export const LazyPageCategory: LazyComponent<typeof import("../components/page-category.vue")['default']>
export const LazyPageFooter: LazyComponent<typeof import("../components/page-footer.vue")['default']>
export const LazyPageHeader: LazyComponent<typeof import("../components/page-header.vue")['default']>
export const LazyScollTop: LazyComponent<typeof import("../components/scoll-top.vue")['default']>
export const LazyToolsCardItem: LazyComponent<typeof import("../components/tools/card-item.vue")['default']>
export const LazyToolsCategoryChart: LazyComponent<typeof import("../components/tools/category-chart.vue")['default']>
export const LazyToolsCustomCount: LazyComponent<typeof import("../components/tools/custom-count.vue")['default']>
export const LazyToolsEmptyCard: LazyComponent<typeof import("../components/tools/empty-card.vue")['default']>
export const LazyToolsListItem: LazyComponent<typeof import("../components/tools/list-item.vue")['default']>
export const LazyToolsLoadingCard: LazyComponent<typeof import("../components/tools/loading-card.vue")['default']>
export const LazyToolsMenuList: LazyComponent<typeof import("../components/tools/menu-list.vue")['default']>
export const LazyToolsMenuSwap: LazyComponent<typeof import("../components/tools/menu-swap.vue")['default']>
export const LazyToolsMyCard: LazyComponent<typeof import("../components/tools/my-card.vue")['default']>
export const LazyToolsTagsChart: LazyComponent<typeof import("../components/tools/tags-chart.vue")['default']>
export const LazyToolsThemeSwap: LazyComponent<typeof import("../components/tools/theme-swap.vue")['default']>
export const LazyToolsTocMenu: LazyComponent<typeof import("../components/tools/toc-menu.vue")['default']>
export const LazyToolsWeChat: LazyComponent<typeof import("../components/tools/we-chat.vue")['default']>
export const LazyTwikooComment: LazyComponent<typeof import("../components/twikoo-comment.vue")['default']>
export const LazyContentDoc: LazyComponent<typeof import("../node_modules/@nuxt/content/dist/runtime/components/ContentDoc.vue")['default']>
export const LazyContentList: LazyComponent<typeof import("../node_modules/@nuxt/content/dist/runtime/components/ContentList.vue")['default']>
export const LazyContentNavigation: LazyComponent<typeof import("../node_modules/@nuxt/content/dist/runtime/components/ContentNavigation.vue")['default']>
export const LazyContentQuery: LazyComponent<typeof import("../node_modules/@nuxt/content/dist/runtime/components/ContentQuery.vue")['default']>
export const LazyContentRenderer: LazyComponent<typeof import("../node_modules/@nuxt/content/dist/runtime/components/ContentRenderer.vue")['default']>
export const LazyContentRendererMarkdown: LazyComponent<typeof import("../node_modules/@nuxt/content/dist/runtime/components/ContentRendererMarkdown.vue")['default']>
export const LazyContentSlot: LazyComponent<typeof import("../node_modules/@nuxt/content/dist/runtime/components/ContentSlot.vue")['default']>
export const LazyDocumentDrivenEmpty: LazyComponent<typeof import("../node_modules/@nuxt/content/dist/runtime/components/DocumentDrivenEmpty.vue")['default']>
export const LazyDocumentDrivenNotFound: LazyComponent<typeof import("../node_modules/@nuxt/content/dist/runtime/components/DocumentDrivenNotFound.vue")['default']>
export const LazyMarkdown: LazyComponent<typeof import("../node_modules/@nuxt/content/dist/runtime/components/Markdown.vue")['default']>
export const LazyProseCodeInline: LazyComponent<typeof import("../node_modules/@nuxt/content/dist/runtime/components/Prose/ProseCodeInline.vue")['default']>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
export const LazyNuxtTime: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
export const LazyMDC: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/MDC.vue")['default']>
export const LazyMDCRenderer: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/MDCRenderer.vue")['default']>
export const LazyMDCSlot: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/MDCSlot.vue")['default']>
export const LazyColorScheme: LazyComponent<typeof import("../node_modules/@nuxtjs/color-mode/dist/runtime/component.vue3.vue")['default']>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>>

export const componentNames: string[]
