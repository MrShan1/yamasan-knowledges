# 个人知识总结静态站点

基于 [VitePress](https://vitepress.dev/) 构建的个人知识笔记站点，支持 Markdown 阅读、本地搜索、主题切换，并自动部署到 GitHub Pages。

## 功能

- 顶部菜单：搜索、导航、主题切换、GitHub 链接
- 侧边栏：快速切换各文档
- GitHub Pages 自动部署

## 本地开发

需要 [pnpm](https://pnpm.io/)（推荐 v11+）。

```bash
pnpm install
pnpm docs:dev
```

浏览器访问终端输出的本地地址（通常为 `http://localhost:5173/yamasan-knowledges/`）。

## 构建与预览

```bash
pnpm docs:build
pnpm docs:preview
```

## 目录结构

```
docs/
├── .vitepress/config.ts   # 站点配置
├── index.md               # 首页
├── note-1.md              # 示例文档
├── note-2.md
└── note-3.md
```

新增文档：在 `docs/` 下创建 `.md` 文件，并在 `docs/.vitepress/config.ts` 的 `sidebar` 中添加入口。

## 部署到 GitHub Pages

1. 将代码推送到 GitHub 仓库的 `main` 分支
2. 仓库 Settings → Pages → Source 选择 **GitHub Actions**
3. 推送后 `.github/workflows/deploy.yml` 会自动构建并部署

### 首次部署前需修改

在 `docs/.vitepress/config.ts` 中：

- 将 `YOUR_USERNAME` 替换为你的 GitHub 用户名
- 确认 `base` 路径：子路径部署（`username.github.io/repo-name`）保持 `/yamasan-knowledges/`；根站点或自定义域名改为 `/`

部署地址示例：`https://YOUR_USERNAME.github.io/yamasan-knowledges/`
