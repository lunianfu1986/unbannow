// app/games/[slug]/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import { notFound, redirect } from 'next/navigation'
import { getAllPosts } from '@/lib/posts'
import { getAllGames } from '@/lib/games'
import { formatDate } from '@/lib/utils'

type Props = {
  params: {
    slug: string
  }
}

function normalizeSlug(str: string): string {
  return (str || '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

export async function generateStaticParams() {
  const games = getAllGames()
  // 这里返回 “更靠谱的 slug”：用游戏 title 生成（避免你 content/games 里 slug 写成 {{slug}}）
  return games.map((g) => ({ slug: normalizeSlug(g.name) }))
}

export default async function GameDetailPage({ params }: Props) {
  const reqSlug = normalizeSlug(params.slug)

  const games = getAllGames()

  // ✅ 兼容：既能用 game.slug 找到，也能用 “title 生成的 slug” 找到
  const game =
    games.find((g) => normalizeSlug(g.slug) === reqSlug) ||
    games.find((g) => normalizeSlug(g.name) === reqSlug)

  if (!game) return notFound()

  // ✅ 统一规范 URL：永远用 title 生成的 slug（escape-from-tarkov 这种）
  const canonicalSlug = normalizeSlug(game.name)

  // 如果用户访问了旧的 /games/slug 或其他非规范 slug，自动跳到规范地址
  if (reqSlug !== canonicalSlug) {
    redirect(`/games/${canonicalSlug}`)
  }

  const allPosts = await getAllPosts()

  // ✅ 文章匹配兜底：不管 post.game 是 "{{slug}}"、"Escape from tarkov"、"escape-from-tarkov"，都尽量匹配上
  const acceptable = new Set<string>([
    canonicalSlug,
    normalizeSlug(game.slug),
    normalizeSlug(game.name),
  ])

  const postsForGame = allPosts.filter((post) => {
    const g = normalizeSlug(post.game || '')
    if (acceptable.has(g)) return true

    // 再兜一层：如果文章 slug 里包含游戏 slug（很多文章标题都会带游戏名）
    if ((post.slug || '').includes(canonicalSlug)) return true

    return false
  })

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <Link
        href="/games"
        className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-8"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Games
      </Link>

      {/* 游戏介绍 */}
      <section className="mb-10">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="relative w-full md:w-64 h-40 md:h-40 rounded-2xl overflow-hidden shadow-lg">
            {game.coverImage ? (
              <Image
                src={game.coverImage}
                alt={game.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-300 text-sm">
                {game.name}
              </div>
            )}
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {game.name}
            </h1>

            {game.genre && (
              <p className="text-blue-600 dark:text-blue-400 text-sm font-medium mb-3">
                {game.genre}
              </p>
            )}

            {game.description && (
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {game.description}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* 文章列表 */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Latest articles for {game.name}
        </h2>

        {postsForGame.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">
            No articles for this game yet. Check back soon!
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {postsForGame.map((post) => (
              <Link key={post.slug} href={`/${post.slug}`}>
                <article className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className="relative h-40">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3 text-xs text-gray-500 dark:text-gray-400">
                      {post.type && (
                        <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-[11px] font-medium">
                          {post.type}
                        </span>
                      )}
                      <span>{formatDate(post.date)}</span>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      Read →
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
