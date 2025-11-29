# 部署指南

本指南将帮助你将博客部署到 Vercel。

## 准备工作

1. 确保你有一个 [GitHub](https://github.com) 账号
2. 注册一个 [Vercel](https://vercel.com) 账号（可以用 GitHub 登录）

## 步骤 1：上传代码到 GitHub

### 方法 A：使用 Git 命令行

```bash
# 在项目根目录执行
git init
git add .
git commit -m "Initial commit"

# 在 GitHub 创建新仓库后
git remote add origin https://github.com/你的用户名/你的仓库名.git
git branch -M main
git push -u origin main
```

### 方法 B：使用 GitHub Desktop

1. 打开 GitHub Desktop
2. File → Add Local Repository
3. 选择你的项目文件夹
4. 点击 "Publish repository"

## 步骤 2：连接 Vercel

1. 访问 [vercel.com](https://vercel.com)
2. 点击 "Add New Project"
3. 选择 "Import Git Repository"
4. 从列表中选择你的 GitHub 仓库
5. 点击 "Import"

## 步骤 3：配置项目

Vercel 会自动检测到这是一个 Next.js 项目。

### 环境变量（可选）

如果需要，可以在 Vercel 中添加环境变量：

1. 进入项目设置
2. 点击 "Environment Variables"
3. 添加变量：
   - `NEXT_PUBLIC_SITE_URL`: 你的网站 URL
   - `NEXT_PUBLIC_SITE_NAME`: 网站名称

### 构建设置

Vercel 会自动使用以下设置：
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

## 步骤 4：部署

点击 "Deploy" 按钮，Vercel 将：

1. 安装依赖
2. 构建项目
3. 部署到全球 CDN

部署通常需要 1-2 分钟。

## 步骤 5：配置自定义域名（可选）

### 添加域名

1. 进入项目设置
2. 点击 "Domains"
3. 输入你的域名
4. 按照提示配置 DNS 记录

### DNS 配置

在你的域名提供商处添加：

**A 记录**：
- Name: `@`
- Value: `76.76.21.21`

**CNAME 记录**：
- Name: `www`
- Value: `cname.vercel-dns.com`

## 自动部署

配置完成后，每次你推送代码到 GitHub：

1. Vercel 会自动检测更改
2. 触发新的构建
3. 自动部署到生产环境

## 预览部署

- 每个 Pull Request 都会创建预览部署
- 可以在合并前测试更改
- 预览 URL 格式：`项目名-分支名-你的用户名.vercel.app`

## 查看部署日志

如果部署失败：

1. 在 Vercel 控制台查看 "Deployments"
2. 点击失败的部署
3. 查看构建日志找出问题

## 常见问题

### 构建失败

**原因**：依赖安装错误
**解决**：检查 `package.json` 中的依赖版本

### 图片不显示

**原因**：外部图片域名未配置
**解决**：在 `next.config.js` 添加：

```javascript
images: {
  domains: ['images.unsplash.com', 'your-domain.com'],
}
```

### 环境变量未生效

**原因**：环境变量未在 Vercel 中设置
**解决**：在 Vercel 项目设置中添加环境变量，然后重新部署

## 性能优化

### 1. 启用 Edge Runtime（可选）

在页面中添加：

```typescript
export const runtime = 'edge'
```

### 2. 启用 ISR（增量静态再生成）

在页面中添加：

```typescript
export const revalidate = 3600 // 1小时重新生成
```

### 3. 图片优化

使用 Next.js Image 组件自动优化图片。

## 监控和分析

### Vercel Analytics

1. 在项目设置中启用 "Analytics"
2. 查看页面访问统计
3. 监控性能指标

### 自定义分析

可以集成：
- Google Analytics
- Plausible
- Umami

## 回滚部署

如果新版本有问题：

1. 进入 "Deployments"
2. 找到之前的成功部署
3. 点击 "Promote to Production"

## 删除项目

在 Vercel 中：

1. 进入项目设置
2. 滚动到底部
3. 点击 "Delete Project"

---

## 下一步

✅ 部署成功后：
- 添加自定义域名
- 配置 SEO
- 添加 Google Analytics
- 开始写文章！

有问题？查看 [Vercel 文档](https://vercel.com/docs) 或 [Next.js 文档](https://nextjs.org/docs)。
