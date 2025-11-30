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
  coverImageAlt?: string
}

const gamesDirectory = path.join(process.cwd(), 'content/games')

// 读取所有游戏
export function getAllGames(): Game[] {
  if (!fs.existsSync(gamesDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(gamesDirectory)

  const games: Game[] = fileNames
    .filter(
      (file) =>
        file.endsWith('.md') ||
        file.endsWith('.mdx') ||
        file.endsWith('.yml') ||
        file.endsWith('.yaml')
    )
    .map((fileName) => {
      const fullPath = path.join(gamesDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)

      const fallbackSlug = fileName.replace(/\.(md|mdx|ya?ml)$/, '')

      const title = (data.title as string) || fallbackSlug

      return {
        slug: (data.slug as string) || fallbackSlug,
        name: title,
        shortName: data.shortName as string | undefined,
        description: data.description as string | undefined,
        genre: data.genre as string | undefined,
        coverImage: (data.coverImage as string) || '',
        coverImageAlt:
          (data.coverImageAlt as string | undefined) || title,
      }
    })

  return games.sort((a, b) => a.name.localeCompare(b.name))
}

// 根据 slug 获取单个游戏
export function getGameBySlug(slug: string): Game | null {
  const all = getAllGames()
  const game = all.find((g) => g.slug === slug)
  return game || null
}
