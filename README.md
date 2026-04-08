# 🐼 大熊猫简介网站 — Vue/Nuxt 全栈 Monorepo

## 技术栈

| 层 | 技术 |
|---|---|
| 前台展示 | **Nuxt 3** + Vue 3 + Tailwind CSS (SSR) |
| 后台管理 | **Vue 3** + Vite + Element Plus (SPA) |
| API 服务 | Nuxt 3 Server Routes (H3) |
| 数据库   | **MongoDB** |
| ORM      | **Prisma 5** (MongoDB connector) |
| 包管理   | **pnpm workspace** (Monorepo) |
| 认证     | JWT (jose) |
| SEO      | nuxt-schema-org + nuxt-simple-sitemap + OG/Twitter Card |

---

## 项目结构

```
panda-site/
├── apps/
│   ├── web/        # Nuxt 3 前台 + Server API
│   └── admin/      # Vue 3 后台管理 SPA
├── packages/
│   └── prisma/     # 共享 Prisma schema + 种子数据
├── .env.example
└── pnpm-workspace.yaml
```

---

## 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 配置环境变量

```bash
cp .env.example .env
# 编辑 .env，配置 DATABASE_URL 和 JWT_SECRET
```

### 3. 初始化数据库

```bash
# 推送 Schema 到 MongoDB
pnpm db:push

# 导入种子数据（包含管理员账号 + 初始内容）
pnpm db:seed
```

### 4. 启动开发服务

```bash
# 前台 Nuxt (http://localhost:3000)
pnpm dev:web

# 后台管理 Vue (http://localhost:5173)
pnpm dev:admin
```

---

## 管理员账号

| 字段 | 值 |
|------|-----|
| 邮箱 | admin@panda-site.com |
| 密码 | admin123456 |

---

## 前台页面路由

| 路由 | 页面 | SEO 重点 |
|------|------|----------|
| `/` | 首页 | 综合关键词 |
| `/habitat` | 栖息地 | 四川/秦岭竹林 |
| `/diet` | 饮食习惯 | 竹子/伪拇指 |
| `/lifecycle` | 生命周期 | 繁殖/延迟着床 |
| `/conservation` | 保护现状 | IUCN/保护区 |
| `/gallery` | 画廊 | 图片类 |
| `/facts` | 趣味知识 | 长尾关键词 |
| `/articles` | 文章列表 | — |
| `/articles/:slug` | 文章详情 | 每篇独立 SEO |

---

## API 路由

| 方法 | 路径 | 描述 |
|------|------|------|
| POST | `/api/auth/login` | 登录获取 JWT |
| GET  | `/api/auth/me` | 获取当前用户 |
| GET  | `/api/sections` | 获取所有板块 |
| GET/PUT | `/api/sections/:slug` | 板块详情/更新 |
| GET  | `/api/articles` | 文章列表（支持分页/筛选） |
| POST | `/api/articles` | 创建文章 |
| GET/PUT/DELETE | `/api/articles/:slug` | 文章操作 |
| GET  | `/api/media` | 媒体文件列表 |
| POST | `/api/media/upload` | 上传图片 |
| DELETE | `/api/media/:id` | 删除媒体 |
| GET  | `/api/stats/overview` | 访问统计看板 |
| GET/PUT | `/api/seo/config` | SEO 全站配置 |
| GET  | `/api/users` | 用户列表 |
| POST | `/api/users` | 创建用户 |
| PATCH | `/api/users/:id` | 更新用户角色/状态 |

---

## SEO 特性

- ✅ **SSR 服务端渲染** — Nuxt 3 默认 SSR，爬虫可直接读取完整 HTML
- ✅ **动态 Meta** — 每页独立 `<title>`, `<meta description>`, `canonical`
- ✅ **Open Graph** — `og:title`, `og:description`, `og:image` 支持社交分享
- ✅ **Twitter Card** — `twitter:card: summary_large_image`
- ✅ **Sitemap** — `/sitemap.xml` 自动生成，包含所有已发布文章
- ✅ **JSON-LD Schema.org** — 使用 `nuxt-schema-org` 生成结构化数据
- ✅ **Canonical URL** — 每页自动注入 `<link rel="canonical">`
- ✅ **SEO 后台管理** — 可视化配置全站 SEO 参数、搜索引擎验证码

---

## 后台管理功能

| 模块 | 功能 |
|------|------|
| 📊 数据看板 | 今日/月度 PV、文章数量、热门页面 TOP10、近7天趋势图 |
| 📄 板块内容 | 编辑网站各板块（概览/栖息地/饮食等）内容与 SEO |
| 📰 文章管理 | CRUD 文章、分类标签、SEO 设置、草稿/发布切换 |
| 🖼️ 媒体库   | 图片上传、预览、复制 URL、删除 |
| 👤 用户权限 | 创建用户、角色管理（ADMIN/EDITOR）、启用/禁用 |
| 🔍 SEO 设置 | 全站默认标题/描述/关键词、OG图片、GA ID、验证码 |

---

## 部署

```bash
# 构建前台
pnpm build:web

# 构建后台
pnpm build:admin
```

> 生产环境建议将 `apps/admin/dist` 部署到 Nginx 静态服务，`apps/web` 使用 `node .output/server/index.mjs` 运行。
