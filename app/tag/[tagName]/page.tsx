import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts } from '@/lib/posts'
import { formatDate } from '@/lib/utils'
import { getGameBySlug } from '@/lib/games'

type Props = {
  params: {
    tagName: string
  }
}

// 和文章详情页完全一致的 slug 规则
function toTagSlug(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // 空格 -> -
    .replace(/[^a-z0-9-]/g, '') // 去掉非英文字母数字和短横线
}

// 预生成所有已经存在的标签路径，例如：
// "Escape from Tarkov" -> { tagName: "escape-from-tarkov" }
export async function generateStaticParams() {
  const posts = await getAllPosts()
  const tagSlugSet = new Set<string>()

  posts.forEach((post) => {
    post.tags?.forEach((t) => {
      const slug = toTagSlug(t)
      if (slug) {
        tagSlugSet.add(slug)
      }
    })
  })

  return Array.from(tagSlugSet).map((slug) => ({
    tagName: slug,
  }))
}

export default async function TagPage({ params }: Props) {
  const slugFromUrl = params.tagName.toLowerCase()

  const allPosts = await getAllPosts()
  const filteredPosts = allPosts.filter((post) =>
    post.tags?.some((t) => toTagSlug(t) === slugFromUrl)
  )

  // 为了在页面上显示人类可读的标签文字，我们从第一篇文章里反推原始 tag 文案
  const displayTag =
    filteredPosts[0]?.tags?.find((t) => toTagSlug(t) === slugFromUrl) ??
    slugFromUrl

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
        Tag: {displayTag}
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Articles tagged with <span className="font-semibold">{displayTag}</span>.
      </p>

      {filteredPosts.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">
          No articles found for this tag yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {filteredPosts.map((post) => {
            const gameInfo = post.game ? getGameBySlug(post.game) : undefined
            const gameLabel = gameInfo?.shortName || gameInfo?.name

            return (
              <Link key={post.slug} href={`/${post.slug}`}>
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
                    {/* 顶部：游戏 + 文章类型 + 阅读时间 */}
                    <div className="flex flex-wrap items-center gap-2 mb-3 text-xs">
                      {gameLabel && (
                        <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 font-medium">
                          {gameLabel}
                        </span>
                      )}
                      {post.type && (
                        <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium">
                          {post.type}
                        </span>
                      )}
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
