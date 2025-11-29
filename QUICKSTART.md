# 快速开始指南 🚀

欢迎使用 Wisp 风格博客！这是一个完全复制 Wisp 博客模板的 Next.js 项目，使用本地 Markdown 文件管理内容。

## 📦 你获得了什么

✅ **完整的 Next.js 15 博客项目**
- 干净清爽的 Wisp 风格设计
- 深色/浅色主题切换
- 完全响应式布局
- SEO 优化完整

✅ **Markdown 内容管理**
- 无需 CMS，直接编辑 Markdown 文件
- 支持 frontmatter 元数据
- 自动计算阅读时间

✅ **功能完整**
- 文章分类系统（顶部导航）
- 标签系统
- 精选文章展示
- 社交分享按钮
- Newsletter 订阅表单

✅ **6 篇示例文章**
- 涵盖旅行、美食、生活方式、摄影等分类
- 展示完整的 Markdown 功能

## 🎯 5 分钟快速启动

### 1️⃣ 解压项目

```bash
cd 你的工作目录
tar -xzf wisp-clone-blog.tar.gz
cd wisp-clone-blog
```

或者直接使用 `wisp-clone-blog` 文件夹。

### 2️⃣ 安装依赖

```bash
npm install
```

### 3️⃣ 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 查看你的博客！

## ✏️ 添加你的第一篇文章

在 `content/posts` 目录创建新文件 `my-first-post.md`：

```markdown
---
title: "我的第一篇文章"
date: "2024-11-28"
excerpt: "这是我的第一篇博客文章！"
coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200"
author: "你的名字"
category: "Travel"
tags: ["旅行", "生活"]
---

# 欢迎来到我的博客

这是我的第一篇文章内容...

## 小标题

更多内容...
```

保存后刷新浏览器，你的文章就会出现！

## 🎨 自定义你的博客

### 修改网站标题和描述

编辑 `app/layout.tsx`：

```typescript
export const metadata: Metadata = {
  title: '你的博客名称',
  description: '你的博客描述',
  // ...
}
```

### 修改顶部导航分类

编辑 `components/header.tsx`：

```typescript
const categories = [
  { name: 'All', href: '/' },
  { name: '你的分类1', href: '/category/category1' },
  { name: '你的分类2', href: '/category/category2' },
  // 添加更多分类...
]
```

### 修改作者信息

编辑 `app/blog/[slug]/page.tsx` 的作者部分。

### 更换颜色主题

编辑 `app/globals.css` 中的 CSS 变量，或直接修改组件中的 Tailwind 类名。

## 📁 项目结构说明

```
wisp-clone-blog/
├── app/                    # Next.js App Router
│   ├── blog/[slug]/       # 文章详情页
│   ├── layout.tsx         # 根布局（修改网站标题）
│   └── page.tsx           # 首页
│
├── components/            # React 组件
│   ├── header.tsx        # 顶部导航（修改分类）
│   ├── footer.tsx        # 页脚
│   └── theme-toggle.tsx  # 主题切换
│
├── content/              
│   └── posts/            # 📝 在这里添加 Markdown 文章
│
├── lib/                  # 工具函数
│   ├── posts.ts         # 文章处理逻辑
│   └── utils.ts         # 工具函数
│
├── README.md            # 详细文档
├── DEPLOYMENT.md        # 部署指南
└── package.json         # 依赖配置
```

## 🚀 部署到 Vercel

### 最简单的方式：

1. 将代码推送到 GitHub
2. 访问 [vercel.com](https://vercel.com)
3. 点击 "Import Project"
4. 选择你的 GitHub 仓库
5. 点击 "Deploy"

完成！你的博客将在几分钟内上线。

详细步骤请查看 `DEPLOYMENT.md`。

## 🖼️ 图片建议

### 使用 Unsplash（免费）

```
https://images.unsplash.com/photo-[photo-id]?w=1200
```

在 [unsplash.com](https://unsplash.com) 搜索图片，复制链接。

### 使用本地图片

1. 将图片放在 `public/images/` 目录
2. 在 Markdown 中引用：`![描述](/images/your-image.jpg)`

## 📝 Markdown 语法参考

### 标题

```markdown
# H1 标题
## H2 标题
### H3 标题
```

### 列表

```markdown
- 无序列表项 1
- 无序列表项 2

1. 有序列表项 1
2. 有序列表项 2
```

### 链接和图片

```markdown
[链接文字](https://example.com)
![图片描述](图片URL)
```

### 代码

```markdown
行内 `代码`

​```javascript
// 代码块
const hello = "world"
​```
```

### 引用

```markdown
> 这是一段引用文字
```

## 🎯 SEO 优化

博客已内置 SEO 优化：

✅ 自动生成页面元数据
✅ Open Graph 标签（Facebook 分享）
✅ Twitter Card 支持
✅ 语义化 HTML
✅ 响应式图片

### 建议添加：

1. **Google Analytics**：追踪访问数据
2. **Sitemap**：帮助搜索引擎索引
3. **Robots.txt**：控制爬虫行为

## 🔧 常见问题

### Q: 如何更改首页显示的文章数量？

A: 编辑 `app/page.tsx`：

```typescript
const recentPosts = posts.slice(1, 7) // 改成你想要的数字
```

### Q: 如何修改文章摘要长度？

A: 在文章的 frontmatter 中手动设置 `excerpt` 字段。

### Q: 如何添加更多分类？

A: 编辑 `components/header.tsx` 的 `categories` 数组，然后在文章中使用对应的 category 值。

### Q: 深色模式不工作？

A: 确保安装了 `next-themes` 依赖：`npm install next-themes`

### Q: 图片不显示？

A: 检查 `next.config.js` 中是否添加了图片域名：

```javascript
images: {
  domains: ['images.unsplash.com'],
}
```

## 📚 学习资源

- [Next.js 文档](https://nextjs.org/docs)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [Markdown 指南](https://www.markdownguide.org/)
- [Vercel 部署文档](https://vercel.com/docs)

## 💡 下一步建议

1. ✍️ 删除示例文章，添加你自己的内容
2. 🎨 自定义颜色和样式
3. 📱 测试移动端显示
4. 🚀 部署到 Vercel
5. 📊 添加 Google Analytics
6. 🌐 配置自定义域名

## 🆘 需要帮助？

- 查看 `README.md` 了解详细文档
- 查看 `DEPLOYMENT.md` 了解部署步骤
- 查看示例文章了解 Markdown 用法

---

## 🎉 开始写作吧！

一切都已准备就绪。现在，去 `content/posts` 目录创建你的第一篇文章，分享你的故事吧！

祝你写作愉快！✨
