# StoneHub

个人站点，基于 Nuxt 4 + @nuxt/content + Tailwind
v4。包含首页、Projects、Blog、Now、Links，以及命令行模式与 AI 抽屉的占位交互。

## 依赖与环境

- Node >= 18(建议 22+)
- 包管理:pnpm
- 主要模块:@nuxt/content、@nuxt/ui、@nuxt/image、@nuxt/eslint、@nuxt/hints
- Tailwind v4

## 安装

```bash
pnpm install
```

## 开发

```bash
pnpm dev
```

启动后访问 http://localhost:3000

## 内容数据

- 位置:`content/`
  - 博客:`content/blog/*.md`(已示例 `first-post.md`)
  - 项目:`content/projects/*.md`
- 集合配置:`content.config.ts`(定义 blog / projects)
- 调试接口:`/api/debug-blog` 仅开发环境可用，用于查看博客集合读取结果

## Tailwind v4 配置

- 主题在 `app/assets/css/main.css` 中通过 `@theme` 定义色板、字体、阴影

## 页面与组件

- `pages/index.vue`:Hero + 卡片，终端 / AI 状态流
- `pages/projects/index.vue`:项目列表(@nuxt/content)
- `pages/blog/index.vue`:博客列表(@nuxt/content)
- `pages/blog/[slug].vue`:博客详情
- `pages/now.vue`、`pages/links.vue`
- 终端与 AI 抽屉组件:`components/overlay/*`
- UI 基础组件:采用 @nuxt/ui(按钮、卡片、抽屉、表单)，图标使用 `@nuxt/icon`

## 常用命令

- 开发:`pnpm dev`
- 类型检查:`pnpm exec nuxi typecheck`
- 生成类型/准备:`pnpm exec nuxi prepare`
- 生产构建:`pnpm build`
- 预览:`pnpm preview`
