export default {
  // Navigation
  nav: {
    home: 'Home',
    blog: 'Blog',
    tags: 'Tags',
    projects: 'Projects',
    about: 'About',
  },

  // Home page
  home: {
    latest: 'Latest',
    noPosts: 'No posts found.',
    readMore: 'Read more',
    allPosts: 'All posts',
    publishedAt: 'Published on',
  },

  // Blog
  blog: {
    title: 'Blog',
    allPosts: 'All posts',
    readMore: 'Read more',
    publishedAt: 'Published on',
    tags: 'Tags',
    noPosts: 'No posts found.',
  },

  // Tags
  tags: {
    title: 'Tags',
    allTags: 'All tags',
    postsWithTag: 'Posts tagged with "{tag}"',
    noPosts: 'No posts found.',
  },

  // Projects
  projects: {
    title: 'Projects',
    viewProject: 'View project',
    viewSource: 'View source',
  },

  // About
  about: {
    title: 'About',
  },

  // Common
  common: {
    loading: 'Loading...',
    error: 'Error',
    notFound: 'Page not found',
    backToHome: 'Back to home',
  },

  // Search
  search: {
    placeholder: 'Search posts...',
    noResults: 'No results found',
  },

  // Theme
  theme: {
    light: 'Light',
    dark: 'Dark',
    system: 'System',
  },

  // Footer
  footer: {
    poweredBy: 'Powered by',
    madeWith: 'Made with',
    and: 'and',
    built: 'Built with',
  },
} as const
