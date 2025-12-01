// lib/games.ts

export type Game = {
  slug: string
  name: string
  shortName?: string
  description: string
  genre: string
  coverImage?: string
}

/**
 * 把任意字符串转成 URL 安全的 slug：
 *  - 全小写
 *  - 去掉首尾空格
 *  - 空格变成 -
 *  - 去掉非字母数字和 -
 */
function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // 连续空格 -> 一个 -
    .replace(/[^a-z0-9-]/g, '') // 只保留字母数字和 -
}

/**
 * 原始游戏列表：
 *  - 以后新增游戏，只要在这里加一条即可
 *  - slug 可以不写，省略时会自动根据 name 生成
 */
const RAW_GAMES: (Omit<Game, 'slug'> & { slug?: string })[] = [
  {
    slug: 'league-of-legends',
    name: 'League of Legends',
    shortName: 'LoL',
    description:
      'MOBA by Riot Games, 5v5 competitive matches with champions and objectives.',
    genre: 'MOBA',
    coverImage: '/images/games/league-of-legends.jpg',
  },
  {
    slug: 'dota-2',
    name: 'Dota 2',
    description:
      'Hardcore MOBA from Valve with deep mechanics and a high skill ceiling.',
    genre: 'MOBA',
    coverImage: '/images/games/dota-2.jpg',
  },
  {
    slug: 'counter-strike-2',
    name: 'Counter-Strike 2',
    shortName: 'CS2',
    description:
      'Tactical FPS with bomb defusal, competitive matchmaking, and skin economy.',
    genre: 'FPS & Tactical Shooter',
    coverImage: '/images/games/counter-strike-2.jpg',
  },
  {
    slug: 'valorant',
    name: 'Valorant',
    description:
      'Hero-based tactical shooter by Riot Games with unique agent abilities.',
    genre: 'Hero Shooter / Tactical FPS',
    coverImage: '/images/games/valorant.jpg',
  },
  {
    slug: 'apex-legends',
    name: 'Apex Legends',
    description:
      'Hero-based battle royale with fast movement and squad-focused gameplay.',
    genre: 'Battle Royale',
    coverImage: '/images/games/apex-legends.jpg',
  },
  {
    slug: 'fortnite',
    name: 'Fortnite',
    description:
      'Battle royale and creative sandbox with frequent events and collaborations.',
    genre: 'Battle Royale',
    coverImage: '/images/games/fortnite.jpg',
  },
  {
    slug: 'escape-from-tarkov',
    name: 'Escape from Tarkov',
    description:
      'Hardcore extraction shooter with realistic gunplay, complex healing and economy.',
    genre: 'Extraction Shooter',
    coverImage: '/images/games/escape-from-tarkov.jpg',
  },
  {
    slug: 'destiny-2',
    name: 'Destiny 2',
    description:
      'Online looter-shooter with raids, dungeons, and seasonal live service content.',
    genre: 'Looter Shooter / MMO-lite',
    coverImage: '/images/games/destiny-2.jpg',
  },
  {
    slug: 'genshin-impact',
    name: 'Genshin Impact',
    description: 'Open-world ARPG gacha game by HoYoverse.',
    genre: 'Action RPG / Gacha',
    coverImage: '/images/games/genshin-impact.jpg',
  },
  {
    slug: 'honkai-star-rail',
    name: 'Honkai: Star Rail',
    description: 'Turn-based space fantasy RPG by HoYoverse.',
    genre: 'Turn-based RPG / Gacha',
    coverImage: '/images/games/honkai-star-rail.jpg',
  },
  {
    slug: 'fc-25',
    name: 'EA SPORTS FC 25',
    description: 'Football / soccer simulation game from EA Sports.',
    genre: 'Sports',
    coverImage: '/images/games/fc-25.jpg',
  },
  {
    slug: 'war-thunder',
    name: 'War Thunder',
    description:
      'Combined arms military MMO with air, ground, and naval battles.',
    genre: 'Vehicular Combat / Simulation',
    coverImage: '/images/games/war-thunder.jpg',
  },
  {
    slug: 'rainbow-six-siege',
    name: 'Rainbow Six Siege',
    description:
      'Tactical 5v5 shooter with destructible environments and unique operators.',
    genre: 'Tactical Shooter',
    coverImage: '/images/games/rainbow-six-siege.jpg',
  },
]

/**
 * 统一导出的游戏列表：
 *  - 自动修正 slug（不管你在 RAW_GAMES 里写没写对，都会规范成合法 URL）
 */
export const GAMES: Game[] = RAW_GAMES.map((game) => ({
  ...game,
  slug: slugify(game.slug ?? game.name),
}))

/**
 * 供页面使用的“获取全部游戏”方法
 *  - /app/games/page.tsx
 *  - /app/games/[slug]/page.tsx 里 import { getAllGames }
 */
export function getAllGames(): Game[] {
  return GAMES
}

/**
 * 根据 slug 获取单个游戏
 *  - 传进来的 slug 也会做一次 slugify，避免大小写 / 空格导致 404
 */
export function getGameBySlug(slug: string): Game | undefined {
  const normalized = slugify(slug)
  return GAMES.find((g) => g.slug === normalized)
}
