# 📖 文档索引

欢迎！这里是所有文档的快速导航。

## 🎯 我应该看哪个文档？

### 如果你是...

**🆕 完全新手，第一次使用**
→ 从 [START_HERE.md](../START_HERE.md) 开始

**🏃 想快速上手**
→ 看 [QUICKSTART.md](QUICKSTART.md) (5分钟)

**📚 想详细了解**
→ 看 [TUTORIAL.md](../TUTORIAL.md) (完整教程)

**🔍 查找特定信息**
→ 看 [README.md](README.md) (完整文档)

**🚀 准备部署上线**
→ 看 [DEPLOYMENT.md](DEPLOYMENT.md) (部署指南)

**✅ 部署前检查**
→ 看 [CHECKLIST.md](../CHECKLIST.md) (检查清单)

## 📚 所有文档列表

### 核心文档（在项目根目录）

| 文档 | 用途 | 适合 | 时长 |
|------|------|------|------|
| **START_HERE.md** | 项目介绍和导航 | 所有人 | 3分钟 |
| **README.md** | 完整使用文档 | 深入了解 | 15分钟 |
| **QUICKSTART.md** | 快速开始指南 | 快速上手 | 5分钟 |
| **TUTORIAL.md** | 分步详细教程 | 学习使用 | 1小时 |
| **DEPLOYMENT.md** | 部署到 Vercel | 准备上线 | 20分钟 |
| **CHECKLIST.md** | 上线检查清单 | 上线前 | 10分钟 |
| **PROJECT_INFO.md** | 项目总体说明 | 了解项目 | 5分钟 |

### 代码文档（在项目内）

| 文件 | 说明 |
|------|------|
| `package.json` | 依赖和脚本配置 |
| `next.config.js` | Next.js 配置 |
| `tailwind.config.js` | Tailwind CSS 配置 |
| `tsconfig.json` | TypeScript 配置 |

## 🎯 按任务查找

### 开始使用
- **首次安装** → [QUICKSTART.md](QUICKSTART.md) § 安装和运行
- **项目介绍** → [START_HERE.md](../START_HERE.md)
- **了解结构** → [README.md](README.md) § 项目结构

### 内容管理
- **添加文章** → [QUICKSTART.md](QUICKSTART.md) § 添加第一篇文章
- **Markdown 语法** → [TUTORIAL.md](../TUTORIAL.md) § Markdown 参考
- **管理文章** → [TUTORIAL.md](../TUTORIAL.md) § 管理文章

### 自定义
- **修改标题** → [TUTORIAL.md](../TUTORIAL.md) § 修改网站标题
- **修改分类** → [TUTORIAL.md](../TUTORIAL.md) § 修改导航分类
- **修改样式** → [TUTORIAL.md](../TUTORIAL.md) § 更改主题色

### 部署
- **部署到 Vercel** → [DEPLOYMENT.md](DEPLOYMENT.md)
- **配置域名** → [DEPLOYMENT.md](DEPLOYMENT.md) § 自定义域名
- **上线前检查** → [CHECKLIST.md](../CHECKLIST.md)

### 故障排除
- **常见问题** → [TUTORIAL.md](../TUTORIAL.md) § 故障排除
- **错误解决** → [README.md](README.md) § 常见问题

## 📖 阅读建议

### 第一天：入门
1. 阅读 [START_HERE.md](../START_HERE.md)
2. 跟随 [QUICKSTART.md](QUICKSTART.md) 运行项目
3. 添加一篇测试文章

### 第二天：自定义
1. 阅读 [TUTORIAL.md](../TUTORIAL.md) 的相关部分
2. 修改网站信息
3. 自定义分类

### 第三天：内容
1. 删除示例文章
2. 添加自己的文章
3. 测试各项功能

### 第四天：准备上线
1. 阅读 [DEPLOYMENT.md](DEPLOYMENT.md)
2. 完成 [CHECKLIST.md](../CHECKLIST.md)
3. 部署到 Vercel

### 第五天：上线
1. 测试线上功能
2. 分享你的博客
3. 开始定期更新！

## 🔍 快速查找

### 命令参考

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建生产版本
npm run build

# 运行生产版本
npm start

# 代码检查
npm run lint
```

### 重要文件位置

```
content/posts/          # 文章存放位置
app/layout.tsx          # 网站标题和描述
components/header.tsx   # 导航栏分类
components/footer.tsx   # 页脚信息
app/globals.css         # 全局样式
```

### 关键配置

```typescript
// 修改网站标题
app/layout.tsx → metadata

// 修改导航分类
components/header.tsx → categories

// 添加图片域名
next.config.js → images.domains
```

## 💡 提示

- 📱 **边做边学**：不要一次读完所有文档
- 🔖 **标记重要页**：收藏常用的文档
- 🎯 **按需查阅**：遇到问题时再查相关文档
- ⭐ **从示例学**：查看示例文章了解格式

## 🆘 需要帮助？

### 问题解决流程

1. **查文档** → 搜索本索引找到相关文档
2. **看示例** → 参考示例文章
3. **搜索错误** → Google 错误信息
4. **查官方文档** → Next.js/Tailwind 官方文档

### 推荐资源

- [Next.js 文档](https://nextjs.org/docs)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [Markdown 指南](https://www.markdownguide.org/)
- [TypeScript 手册](https://www.typescriptlang.org/docs/)

## 📝 文档更新

这些文档会随着项目更新。建议：

- ⭐ 收藏这个索引页面
- 📌 遇到问题先来这里查找
- 🔄 定期查看是否有更新

## ✨ 开始吧！

现在你知道该看哪个文档了！选择一个开始：

- 🌟 [START_HERE.md](../START_HERE.md) - 如果完全是新手
- ⚡ [QUICKSTART.md](QUICKSTART.md) - 如果想快速开始
- 📚 [TUTORIAL.md](../TUTORIAL.md) - 如果想系统学习

祝你使用愉快！🎉

---

_提示：可以用 Ctrl+F (Cmd+F) 搜索关键词_
