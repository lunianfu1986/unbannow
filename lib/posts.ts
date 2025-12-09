import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'content/posts')

// 👇 1. 在这里给 TypeScript 增加类型定义
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
  seoTitle?: string        // 新增：SEO 标题
  seoDescription?: string  // 新增：SEO 描述
}

// 计算阅读时间
function calculateReadTime(content: string): string {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return `${minutes} min read`
}

// 把 frontmatter 里的 date 统一转成字符串
function normalizeDate(raw: unknown): string {
  if (raw instanceof Date) {
    return raw.toISOString()
  }
  if (typeof raw === 'string') {
    return raw
  }
  return new Date().toISOString()
}

// 获取所有文章
export async function getAllPosts(): Promise<Post[]> {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, '')
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        const { data, content } = matter(fileContents)

        const processedContent = await remark().use(html).process(content)
        const contentHtml = processedContent.toString()

        const date = normalizeDate(data.date)

        // 👇 2. 在这里读取 Markdown 文件里的数据
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
          seoTitle: data.seoTitle,             // 读取 SEO 标题
          seoDescription: data.seoDescription, // 读取 SEO 描述
        } as Post
      })
  )

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
}

// 根据 slug 获取单篇文章
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const { data, content } = matter(fileContents)

    const processedContent = await remark().use(html).process(content)
    const contentHtml = processedContent.toString()

    const date = normalizeDate(data.date)

    // 👇 3. 在这里也加上读取逻辑
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
      seoTitle: data.seoTitle,             // 读取 SEO 标题
      seoDescription: data.seoDescription, // 读取 SEO 描述
    }
  } catch (error) {
    return null
  }
}

// 根据分类获取文章
export async function getPostsByCategory(category: string): Promise<Post[]> {
  const allPosts = await getAllPosts()
  return allPosts.filter(
    (post) => post.category?.toLowerCase() === category.toLowerCase()
  )
}

// 根据标签获取文章
export async function getPostsByTag(tag: string): Promise<Post[]> {
  const allPosts = await getAllPosts()
  return allPosts.filter((post) =>
    post.tags?.some((t) => t.toLowerCase() === tag.toLowerCase())
  )
}
