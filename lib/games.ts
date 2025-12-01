// lib/games.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export type Game = {
  slug: string
  name: string
  shortName?: string
  description?: string
  genre?: string
  coverImage?: string
}

const gamesDirectory = path.join(process.cwd(), 'content/games')

// 👇 核心修复：添加标准化函数
function normalizeSlug(str: string): string {
  return str
    .toLowerCase()                 // 转小写
    .trim()                        // 去除首尾空格
    .replace(/\s+/g, '-')          // 把中间的空格变成连字符
    .replace(/[^a-z0-9-]/g, '')    // 去掉特殊字符
}

// 读取所有游戏
export function getAllGames(): Game[] {
  if (!fs.existsSync(gamesDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(gamesDirectory)

  const games: Game[] = fileNames
    .filter((file) =>
      file.endsWith('.md') ||
      file.endsWith('.mdx') ||
      file.endsWith('.yml') ||
      file.endsWith('.yaml')
    )
    .map((fileName) => {
      const fullPath = path.join(gamesDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)

      // 如果 frontmatter 里没有 slug，就用文件名
      const fallbackSlug = fileName.replace(/\.(mdx?|ya?ml)$/, '')
      
      // 读取原始 slug
      const rawSlug = (data.slug as string) || fallbackSlug

      return {
        // 👇 核心修复：在这里强制转换 Slug
        slug: normalizeSlug(rawSlug),
        
        name: (data.title as string) || fallbackSlug,
        shortName: data.shortName as string | undefined,
        description: data.description as string | undefined,
        genre: data.genre as string | undefined,
        coverImage: data.coverImage as string | undefined,
      }
    })

  return games.sort((a, b) => a.name.localeCompare(b.name))
}

export function getGameBySlug(slug: string): Game | undefined {
  const games = getAllGames()
  // 👇 核心修复：比对时也使用标准化后的 slug
  const targetSlug = normalizeSlug(slug)
  return games.find((g) => g.slug === targetSlug)
}
