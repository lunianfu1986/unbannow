import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'content/posts')

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
  // 如果你有 game / type 字段，也可以在这里补上：
  game?: string
  type?: string
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
  // 确保目录存在
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

        // 转换 markdown 为 HTML
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
        } as Post
      })
  )

  // 按日期排序
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
}

// 根据 slug 获取单篇文章
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const { data, content } = matter(fileContents)

    // 转换 markdown 为 HTML
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
