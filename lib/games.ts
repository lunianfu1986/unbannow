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

// 读取所有游戏
export function getAllGames(): Game[] {
  // 如果还没创建 content/games 目录，就返回空数组，避免报错
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

      // 如果 frontmatter 里没有写 slug，就用文件名做兜底
      const fallbackSlug = fileName.replace(/\.(mdx?|ya?ml)$/, '')

      return {
        slug: (data.slug as string) || fallbackSlug,
        name: (data.title as string) || fallbackSlug,
        shortName: data.shortName as string | undefined,
        description: data.description as string | undefined,
        genre: data.genre as string | undefined,
        coverImage: data.coverImage as string | undefined,
      }
    })

  // 按名称排序，防止顺序乱
  return games.sort((a, b) => a.name.localeCompare(b.name))
}

// 根据 slug 获取单个游戏
export function getGameBySlug(slug: string): Game | undefined {
  const games = getAllGames()
  return games.find((g) => g.slug === slug)
}
