import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '个人知识总结',
  description: '个人知识笔记与总结',
  lang: 'zh-CN',
  // base: '/yamasan-knowledges/',
  base: '/',

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      {
        text: 'GitHub',
        link: 'https://github.com/MrShan1/yamasan-knowledges',
      },
    ],

    sidebar: [
      { text: '首页', link: '/' },
      { text: '笔记一', link: '/note-1' },
      { text: '笔记二', link: '/note-2' },
      { text: '笔记三', link: '/note-3' },
    ],

    search: {
      provider: 'local',
    },

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/MrShan1/yamasan-knowledges',
      },
    ],
  },
})
