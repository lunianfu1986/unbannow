import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'
import { getAllGames } from '@/lib/games'
import { siteConfig } from '@/lib/siteConfig'

// 辅助函数：转换 URL Slug
function toSlug(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.unbannow.com' // 强制使用你的正式域名

  // 1. 获取所有文章和游戏数据
  const posts = await getAllPosts()
  const games = getAllGames()

  // 2. 提取分类和标签
  const categories = new Set<string>()
  const tags = new Set<string>()
  
  posts.forEach((post) => {
    if (post.category) categories.add(post.category)
    if (post.tags) post.tags.forEach((tag) => tags.add(tag))
  })

  // 3. 静态页面路由
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

  // 4. 文章路由
  const postRoutes = posts.map((post) => ({
    url: `${baseUrl}/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // 5. 游戏路由
  const gameRoutes = games.map((game) => ({
    url: `${baseUrl}/games/${game.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // 6. 分类路由
  const categoryRoutes = Array.from(categories).map((category) => ({
    url: `${baseUrl}/category/${category.toLowerCase()}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // 7. 标签路由
  const tagRoutes = Array.from(tags).map((tag) => ({
    url: `${baseUrl}/tag/${toSlug(tag)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [
    ...staticRoutes,
    ...postRoutes,
    ...gameRoutes,
    ...categoryRoutes,
    ...tagRoutes,
  ]
}
