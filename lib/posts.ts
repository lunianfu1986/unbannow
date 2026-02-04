import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'content/posts')

/**
 * 🔒 Slug 自动规范化（核心）
 */
export function normalizeSlug(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[''"""'`]/g, '')
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

// 🔧 新增：标准化图片路径（支持 Keystatic 上传的格式）
function normalizeImagePath(imagePath?: string): string | undefined {
  if (!imagePath) return undefined
  
  // 如果已经是完整的 URL，直接返回
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath
  }
  
  // 如果已经以 / 开头，直接返回
  if (imagePath.startsWith('/')) {
    return imagePath
  }
  
  // Keystatic 上传的格式：uploads/post-slug/image.png
  // 需要添加前导斜杠：/uploads/post-slug/image.png
  return `/${imagePath}`
}

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

// ✅ 获取所有文章
export async function getAllPosts(): Promise<Post[]> {
  if (!fs.existsSync(postsDirectory)) return []

  const fileNames = fs.readdirSync(postsDirectory)

  const allPostsData = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map(async (fileName) => {
        const rawSlug = fileName.replace(/\.md$/, '')
        const slug = normalizeSlug(rawSlug)

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
          // 🔧 修复：标准化图片路径
          coverImage: normalizeImagePath(data.coverImage as string | undefined) || '/images/default-cover.jpg',
          author: data.author || 'UnbanNow',
          category: data.category,
          tags: data.tags || [],
          readTime: calculateReadTime(content),
          game: data.game,
          type: data.type,
          seoTitle: data.seoTitle,
          seoDescription: data.seoDescription,
        }
      })
  )

  return allPostsData.sort((a, b) => (a.date > b.date ? -1 : 1))
}

// ✅ 根据 Slug 获取单篇文章
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const normalizedSlug = normalizeSlug(slug)

  if (!fs.existsSync(postsDirectory)) return null

  const fileNames = fs.readdirSync(postsDirectory)
  const matchingFile = fileNames.find((fileName) => {
    const fileSlug = normalizeSlug(fileName.replace(/\.md$/, ''))
    return fileSlug === normalizedSlug
  })

  if (!matchingFile) return null

  const fullPath = path.join(postsDirectory, matchingFile)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const processedContent = await remark().use(html).process(content)
  const contentHtml = processedContent.toString()
  const date = normalizeDate(data.date)

  return {
    slug: normalizedSlug,
    title: data.title || '',
    date,
    excerpt: data.excerpt || '',
    content: contentHtml,
    // 🔧 修复：标准化图片路径
    coverImage: normalizeImagePath(data.coverImage as string | undefined) || '/images/default-cover.jpg',
    author: data.author || 'UnbanNow',
    category: data.category,
    tags: data.tags || [],
    readTime: calculateReadTime(content),
    game: data.game,
    type: data.type,
    seoTitle: data.seoTitle,
    seoDescription: data.seoDescription,
  }
}

// 其他函数保持不变...
export async function getPostsByCategory(category: string): Promise<Post[]> {
  const allPosts = await getAllPosts()
  return allPosts.filter((post) => post.category === category)
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
  const allPosts = await getAllPosts()
  return allPosts.filter((post) => post.tags?.includes(tag))
}

export async function getPostsByGame(game: string): Promise<Post[]> {
  const allPosts = await getAllPosts()
  return allPosts.filter((post) => post.game === game)
}
