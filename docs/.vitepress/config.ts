import { defineConfig } from "vitepress";
import { withMermaid } from "vitepress-plugin-mermaid";

export default withMermaid(
  defineConfig({
    title: "个人知识总结",
    description: "个人知识笔记与总结",
    lang: "zh-CN",
    // base: '/yamasan-knowledges/',
    base: "/",

    themeConfig: {
      nav: [
        { text: "首页", link: "/" },
        {
          text: "前端基础",
          items: [
            { text: "HTML", link: "/HTML高频面试题" },
            { text: "CSS", link: "/CSS高频面试题" },
            { text: "JavaScript", link: "/JavaScript高频面试题" },
          ],
        },
        {
          text: "Vue",
          link: "/Vue高频面试题",
        },
        {
          text: "React",
          link: "/React高频面试题",
        },
        {
          text: "HTTP及浏览器",
          link: "/HTTP及浏览器高频面试题",
        },
        {
          text: "前端工程化",
          items: [
            { text: "前端工程化", link: "/前端工程化高频面试题" },
            { text: "Webpack", link: "/Webpack高频面试题" },
          ],
        },
        {
          text: "其他",
          items: [
            { text: "阿里", link: "/阿里前端高频面试题" },
            { text: "数据结构与算法", link: "/数据结构与算法高频面试题" },
            { text: "数据可视化", link: "/数据可视化高频面试题" },
          ],
        },
      ],

      sidebar: [
        { text: "首页", link: "/" },
        { text: "总纲", link: "/面试题总纲" },
        { text: "HTML", link: "/HTML高频面试题" },
        { text: "CSS", link: "/CSS高频面试题" },
        { text: "JavaScript", link: "/JavaScript高频面试题" },
        { text: "Vue", link: "/Vue高频面试题" },
        { text: "React", link: "/React高频面试题" },
        { text: "HTTP及浏览器", link: "/HTTP及浏览器高频面试题" },
        { text: "前端工程化", link: "/前端工程化高频面试题" },
        { text: "Webpack", link: "/Webpack高频面试题" },
        { text: "阿里", link: "/阿里前端高频面试题" },
        { text: "数据结构与算法", link: "/数据结构与算法高频面试题" },
        { text: "数据可视化", link: "/数据可视化高频面试题" },
      ],

      search: {
        provider: "local",
        // provider: "algolia",
        // options: {
        //   appId: "V8P6SMN9C9",
        //   apiKey: "f735e4926ae39d54403be885711c05b9",
        //   indexName: "dev_knowledges",
        // },
      },

      socialLinks: [
        {
          icon: "github",
          link: "https://github.com/MrShan1/yamasan-knowledges",
        },
      ],
    },

    mermaid: {},
    mermaidPlugin: {
      class: "mermaid my-class",
    },
  }),
);
