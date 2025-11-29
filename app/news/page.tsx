import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts } from '@/lib/posts'
import { formatDate } from '@/lib/utils'
import { getGameBySlug } from '@/lib/games'
import type { Metadata } from 'next'
import { siteConfig } from '@/lib/siteConfig'

const PAGE_TYPE = 'News'

export const metadata: Metadata = {
  title: `News | ${siteConfig.name}`,
  description:
    'Latest policy changes, anti-cheat updates, and official announcements that may affect game bans and account suspensions.',
}

export default async function NewsPage() {
  const posts = await getAllPosts()
  const filteredPosts = posts.filter(
    (post) => post.type?.toLowerCase() === PAGE_TYPE.toLowerCase()
  )

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
        News
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Updates on anti-cheat systems, ban waves, and support policies across
        major online games.
      </p>

      {filteredPosts.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">
          No news articles yet. Check back soon!
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {filteredPosts.map((post) => {
            const gameInfo = post.game ? getGameBySlug(post.game) : undefined
            const gameLabel = gameInfo?.shortName || gameInfo?.name

            return (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <article className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className="relative h-48">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3 text-xs">
                      {gameLabel && (
                        <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 font-medium">
                          {gameLabel}
                        </span>
                      )}
                      <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium">
                        {PAGE_TYPE}
                      </span>
                      {post.readTime && (
                        <span className="text-gray-400 dark:text-gray-500">
                          {post.readTime}
                        </span>
                      )}
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {post.title}
                    </h2>

                    <p className="text-gray-600 dark:text-gray-300 line-clamp-2 mb-4">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">
                        {formatDate(post.date)}
                      </span>
                      <span className="text-blue-600 dark:text-blue-400 font-medium">
                        Read →
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
