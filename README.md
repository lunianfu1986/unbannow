# Travel Blog - Wisp Clone

一个完全复制 Wisp 博客模板风格的 Next.js 博客，使用本地 Markdown 文件管理内容。

## 特性

✨ **现代化设计**
- 简洁清爽的 UI 设计
- 完全响应式布局
- 深色/浅色主题切换

📝 **Markdown 支持**
- 使用本地 Markdown 文件管理文章
- 支持 frontmatter 元数据
- 自动生成阅读时间

🎨 **功能完整**
- 文章分类系统
- 标签系统
- SEO 优化
- Open Graph 支持
- 响应式图片

🚀
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Remark (Markdown 处理)
- Gray Matter (Frontmatter 解析)

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 运行开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

### 3. 构建生产版本

```bash
npm run build
npm start
```

## 添加新文章

在 `content/posts` 目录下创建新的 `.md` 文件：

```markdown
---
title: "你的文章标题"
date: "2024-11-28"
excerpt: "文章摘要"
coverImage: "https://images.unsplash.com/photo-xxx"
author: "作者名"
category: "分类"
tags: ["标签1", "标签2"]
---

# 文章内容

在这里写你的文章内容...
```

### Frontmatter 字段说明

- `title`: 文章标题（必需）
- `date`: 发布日期，格式 YYYY-MM-DD（必需）
- `excerpt`: 文章摘要（必需）
- `coverImage`: 封面图片 URL（必需）
- `author`: 作者名（可选，默认 "Samantha"）
- `category`: 分类（可选）
- `tags`: 标签数组（可选）
- `readTime`: 阅读时间（可选，会自动计算）

## 自定义配置

### 修改网站信息

编辑 `app/layout.tsx` 中的 metadata：

```typescript
export const metadata: Metadata = {
  title: '你的博客标题',
  description: '你的博客描述',
  // ...
}
```

### 修改分类

编辑 `components/header.tsx` 中的 categories 数组：

```typescript
const categories = [
  { name: 'All', href: '/' },
  { name: '你的分类', href: '/category/your-category' },
  // ...
]
```

### 修改样式

主题颜色在 `app/globals.css` 中定义：

```css
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  --border: 0 0% 89.8%;
}
```

## 部署到 Vercel

### 方法一：通过 GitHub

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. Vercel 会自动检测 Next.js 并配置

### 方法二：通过 Vercel CLI

```bash
npm install -g vercel
vercel
```

## SEO 优化

博客已内置以下 SEO 优化：

- ✅ 自动生成页面元数据
- ✅ Open Graph 标签
- ✅ Twitter Card 支持
- ✅ 语义化 HTML 结构
- ✅ 响应式图片优化

### 建议额外添加：

1. 在 `public` 目录添加 `robots.txt`
2. 在 `public` 目录添加 `sitemap.xml`
3. 添加 Google Analytics
4. 配置 favicon

## 图片管理

### 使用 Unsplash

文章中使用的封面图片来自 Unsplash：

```
https://images.unsplash.com/photo-[photo-id]?w=1200
```

### 使用本地图片

1. 将图片放在 `public/images` 目录
2. 在 Markdown 中引用：

```markdown
![描述](/images/your-image.jpg)
```

## 文件结构

```
wisp-clone-blog/
├── app/
│   ├── blog/[slug]/
│   │   └── page.tsx       # 博客文章页面
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 首页
├── components/
│   ├── footer.tsx         # 页脚组件
│   ├── header.tsx         # 页头组件
│   ├── theme-provider.tsx # 主题提供者
│   └── theme-toggle.tsx   # 主题切换
├── content/
│   └── posts/             # Markdown 文章
├── lib/
│   ├── posts.ts           # 文章处理逻辑
│   └── utils.ts           # 工具函数
├── next.config.js
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## 常见问题

### 如何修改每页显示的文章数量？

编辑 `app/page.tsx`：

```typescript
const recentPosts = posts.slice(1, 7) // 修改数字
```

### 如何添加新的分类页面？

1. 创建 `app/category/[category]/page.tsx`
2. 使用 `getPostsByCategory()` 函数

### 如何更改主题颜色？

修改 `tailwind.config.js` 或直接在组件中使用 Tailwind 类名。

## 技术支持

如有问题，请查看：

- [Next.js 文档](https://nextjs.org/docs)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [Markdown 指南](https://www.markdownguide.org/)

## License

MIT

---

享受你的博客之旅！ 🚀
