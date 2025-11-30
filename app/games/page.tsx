import Link from 'next/link'
import Image from 'next/image'
import { GAMES } from '@/lib/games'
import type { Metadata } from 'next'
import { siteConfig } from '@/lib/siteConfig'

export const metadata: Metadata = {
  title: `Games | ${siteConfig.name}`,
  description:
    'Browse all supported games on UnbanNow and access ban appeal guides, account recovery tips, and policy explanations for each title.',
}

export default function GamesPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Games
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-10">
        Choose a game to see dedicated ban appeal guides, account recovery tips,
        and common issues players face.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {GAMES.map((game) => (
          <Link key={game.slug} href={`/games/${game.slug}`}>
            <article className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="relative h-40">
                {game.coverImage ? (
                  <Image
                    src={game.coverImage}
                    alt={game.coverImageAlt || game.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-300 text-sm">
                    {game.name}
                  </div>
                )}
              </div>
              <div className="p-5">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {game.name}
                </h2>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-2">
                  {game.genre}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                  {game.description}
                </p>
                <span className="inline-flex items-center mt-4 text-sm font-medium text-blue-600 dark:text-blue-400">
                  View ban appeal guides →
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  )
}
