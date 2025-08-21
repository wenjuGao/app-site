export default {
  // 导航
  nav: {
    home: '小书童',
    blog: '博客',
    tags: '标签',
    projects: '项目',
    about: '关于',
  },

  // 首页
  home: {
    latest: '最新文章',
    noPosts: '暂无文章',
    readMore: '查看更多',
    allPosts: '所有内容',
    publishedAt: '发布时间',
  },

  // 博客
  blog: {
    title: '博客',
    allPosts: '所有文章',
    readMore: '阅读更多',
    publishedAt: '发布时间',
    tags: '标签',
    noPosts: '暂无文章',
  },

  // 标签
  tags: {
    title: '标签',
    allTags: '所有标签',
    postsWithTag: '包含标签 "{tag}" 的文章',
    noPosts: '暂无文章',
  },

  // 项目
  projects: {
    title: '项目',
    viewProject: '查看项目',
    viewSource: '查看源码',
  },

  // 关于
  about: {
    title: '关于',
  },

  // 通用
  common: {
    loading: '加载中...',
    error: '出错了',
    notFound: '页面未找到',
    backToHome: '返回首页',
  },

  // 搜索
  search: {
    placeholder: '搜索文章...',
    noResults: '没有找到相关结果',
  },

  // 主题
  theme: {
    light: '浅色',
    dark: '深色',
    system: '系统',
  },

  // 页脚
  footer: {
    poweredBy: '基于',
    madeWith: '使用',
    and: '和',
    built: '构建',
  },
} as const
