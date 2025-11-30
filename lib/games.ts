// lib/games.ts
export type Game = {
  slug: string
  name: string
  shortName?: string
  description: string
  genre: string
  coverImage?: string
}

export const GAMES: Game[] = [
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
    description: 'Hardcore MOBA from Valve with deep mechanics and high skill ceiling.',
    genre: 'MOBA',
    coverImage: '/images/games/dota-2.jpg',
  },
  {
    slug: 'counter-strike-2',
    name: 'Counter-Strike 2',
    shortName: 'CS2',
    description: 'Tactical FPS with bomb defusal and competitive matchmaking.',
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
      'Hero-based battle royale with fast movement and team-focused gameplay.',
    genre: 'Battle Royale',
    coverImage: '/images/games/apex-legends.jpg',
  },
  {
    slug: 'fortnite',
    name: 'Fortnite',
    description:
      'Battle royale and creative sandbox with frequent events and collabs.',
    genre: 'Battle Royale',
    coverImage: '/images/games/fortnite.jpg',
  },
  {
    slug: 'escape-from-tarkov',
    name: 'Escape from Tarkov',
    description:
      'Hardcore extraction shooter with realistic gunplay and complex economy.',
    genre: 'Extraction Shooter',
    coverImage: '/images/games/escape-from-tarkov.jpg',
  },
  {
    slug: 'destiny-2',
    name: 'Destiny 2',
    description:
      'Online looter-shooter with raids, dungeons, and seasonal content.',
    genre: 'Looter Shooter / MMO-Lite',
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
      'Tactical 5v5 shooter with destructible environments and operators.',
    genre: 'Tactical Shooter',
    coverImage: '/images/games/rainbow-six-siege.jpg',
  },
]

export function getGameBySlug(slug: string): Game | undefined {
  return GAMES.find((g) => g.slug === slug)
}
