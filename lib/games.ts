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

// 标准化 Slug
function normalizeSlug(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
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
  
  // Keystatic 上传的格式：uploads/game-name/image.png
  // 需要添加前导斜杠：/uploads/game-name/image.png
  return `/${imagePath}`
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

      const fallbackSlug = fileName.replace(/\.(mdx?|ya?ml)$/, '')
      const rawSlug = (data.slug as string) || fallbackSlug

      return {
        slug: normalizeSlug(rawSlug),
        name: (data.title as string) || fallbackSlug,
        shortName: data.shortName as string | undefined,
        description: data.description as string | undefined,
        genre: data.genre as string | undefined,
        // 🔧 修复：标准化图片路径
        coverImage: normalizeImagePath(data.coverImage as string | undefined),
      }
    })

  return games.sort((a, b) => a.name.localeCompare(b.name))
}

export function getGameBySlug(slug: string): Game | undefined {
  const games = getAllGames()
  const targetSlug = normalizeSlug(slug)
  return games.find((g) => g.slug === targetSlug)
}
