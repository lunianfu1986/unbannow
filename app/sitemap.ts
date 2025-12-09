import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'
import { getAllGames } from '@/lib/games'
import { siteConfig } from '@/lib/siteConfig'

// 辅助函数：与你项目中其他页面使用的 Tag Slug 转换逻辑保持一致
// 来源参考：app/[slug]/page.tsx
function toSlug(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url

  // 1. 获取所有数据
  const posts = await getAllPosts()
  const games = getAllGames()

  // 2. 提取所有唯一的分类 (Categories)
  const categories = new Set<string>()
  posts.forEach((post) => {
    if (post.category) {
      categories.add(post.category)
    }
  })

  // 3. 提取所有唯一的标签 (Tags)
  const tags = new Set<string>()
  posts.forEach((post) => {
    if (post.tags) {
      post.tags.forEach((tag) => tags.add(tag))
    }
  })

  // 4. 定义静态页面路由
  // priority: 1.0 (首页), 0.8 (主要栏目), 0.5 (其他)
  const staticRoutes = [
    '',
    '/news',
    '/guides',
    '/reviews',
    '/esports',
    '/games',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }))

  // 5. 生成文章路由 (Posts)
  // 根据 app/[slug]/page.tsx，文章路径是根目录 /slug
  const postRoutes = posts.map((post) => ({
    url: `${baseUrl}/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.9, // 文章是核心内容，权重设高
  }))

  // 6. 生成游戏详情路由 (Games)
  // 根据 app/games/[slug]/page.tsx，路径是 /games/slug
  const gameRoutes = games.map((game) => ({
    url: `${baseUrl}/games/${game.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // 7. 生成分类页面路由 (Categories)
  // 根据 app/category/[category]/page.tsx
  const categoryRoutes = Array.from(categories).map((category) => ({
    url: `${baseUrl}/category/${category.toLowerCase()}`, // 分类 URL 通常转小写
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // 8. 生成标签页面路由 (Tags)
  // 根据 app/tag/[tagName]/page.tsx
  const tagRoutes = Array.from(tags).map((tag) => ({
    url: `${baseUrl}/tag/${toSlug(tag)}`, // 使用辅助函数确保 Slug 一致
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  // 9. 合并所有路由并返回
  return [
    ...staticRoutes,
    ...postRoutes,
    ...gameRoutes,
    ...categoryRoutes,
    ...tagRoutes,
  ]
}
