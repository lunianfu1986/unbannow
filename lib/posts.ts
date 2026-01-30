import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'content/posts')

/**
 * 🔒 Slug 自动规范化（核心）
 * 统一为：a-z 0-9 -
 */
export function normalizeSlug(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[’‘“”"'`]/g, '')      // 去掉智能引号
    .replace(/&/g, 'and')           // & → and
    .replace(/[^a-z0-9]+/g, '-')    // 非法字符 → -
    .replace(/-+/g, '-')            // 合并多个 -
    .replace(/^-|-$/g, '')          // 去首尾 -
}

// 👇 类型定义（你原有的，完整保留）
export interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  coverImage: string
  author: string
  category?: string
  tags?: string[]
  readTime?: string
  game?: string
  type?: string
  seoTitle?: string
  seoDescription?: string
}

// 计算阅读时间
function calculateReadTime(content: string): string {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return `${minutes} min read`
}

// 统一 date
function normalizeDate(raw: unknown): string {
  if (raw instanceof Date) return raw.toISOString()
  if (typeof raw === 'string') return raw
  return new Date().toISOString()
}

// ✅ 获取所有文章（首页 / 列表）
export async function getAllPosts(): Promise<Post[]> {
  if (!fs.existsSync(postsDirectory)) return []

  const fileNames = fs.readdirSync(postsDirectory)

  const allPostsData = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map(async (fileName) => {
        const rawSlug = fileName.replace(/\.md$/, '')
        const slug = normalizeSlug(rawSlug) // ⭐ 关键

        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)

        const processedContent = await remark().use(html).process(content)
        const contentHtml = processedContent.toString()
        const date = normalizeDate(data.date)

        return {
          slug,
          title: data.title || '',
          date,
          excerpt: data.excerpt || '',
          content: contentHtml,
          coverImage:
            data.coverImage ||
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
          author: data.author || 'Samantha',
          category: data.category,
          tags: data.tags || [],
          readTime: data.readTime || calculateReadTime(content),
          game: data.game,
          type: data.type,
          seoTitle: data.seoTitle,
          seoDescription: data.seoDescription,
        } as Post
      })
  )

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
}

// ✅ 根据 slug 获取单篇文章（彻底防 404）
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const normalizedSlug = normalizeSlug(slug)

    // 👉 不再直接拼路径，而是从列表里找
    const allPosts = await getAllPosts()
    const post = allPosts.find((p) => p.slug === normalizedSlug)

    return post || null
  } catch {
    return null
  }
}

// 分类过滤
export async function getPostsByCategory(category: string): Promise<Post[]> {
  const allPosts = await getAllPosts()
  return allPosts.filter(
    (post) => post.category?.toLowerCase() === category.toLowerCase()
  )
}

// 标签过滤
export async function getPostsByTag(tag: string): Promise<Post[]> {
  const allPosts = await getAllPosts()
  return allPosts.filter((post) =>
    post.tags?.some((t) => t.toLowerCase() === tag.toLowerCase())
  )
}
