import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts } from '@/lib/posts'
import { formatDate } from '@/lib/utils'
import { getGameBySlug } from '@/lib/games'

const POSTS_PER_PAGE = 8

type HomeProps = {
  searchParams?: {
    page?: string
  }
}

export default async function Home({ searchParams }: HomeProps) {
  const pageParam = searchParams?.page ?? '1'
  const pageFromUrl = Number(pageParam)

  // 防止 NaN 或乱填参数
  const currentPageRaw = isNaN(pageFromUrl) || pageFromUrl < 1 ? 1 : pageFromUrl

  const posts = await getAllPosts()
  const totalPosts = posts.length
  const totalPages =
    totalPosts === 0 ? 1 : Math.ceil(totalPosts / POSTS_PER_PAGE)

  const currentPage =
    currentPageRaw > totalPages ? totalPages : currentPageRaw

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const displayedPosts = posts.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE
  )

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Recent Posts Grid */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Recent Posts
        </h2>

        {displayedPosts.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">
            No posts yet. Start by adding some markdown files in
            <code className="mx-1 px-1 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-xs">
              content/posts
            </code>
            .
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {displayedPosts.map((post) => {
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
                      {/* 分类 + 阅读时间 */}
                      <div className="flex items-center gap-2 mb-3 text-xs">
                        {post.category && (
                          <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full font-medium">
                            {post.category}
                          </span>
                        )}
                        {post.readTime && (
                          <span className="text-gray-400 dark:text-gray-500">
                            {post.readTime}
                          </span>
                        )}
                      </div>

                      {/* 标题 */}
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        {post.title}
                      </h3>

                      {/* 游戏 + 文章类型 标签 */}
                      {(gameLabel || post.type) && (
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
                        </div>
                      )}

                      {/* 摘要 */}
                      <p className="text-gray-600 dark:text-gray-300 line-clamp-2 mb-4">
                        {post.excerpt}
                      </p>

                      {/* 日期 + Read → */}
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
      </section>

      {/* Pagination */}
      {totalPosts > 0 && totalPages > 1 && (
        <section className="flex items-center justify-center gap-3 mt-4">
          {/* Previous */}
          {currentPage > 1 ? (
            <Link
              href={currentPage - 1 === 1 ? '/' : `/?page=${currentPage - 1}`}
              className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Previous
            </Link>
          ) : (
            <span className="px-3 py-1 rounded-md border border-gray-200 dark:border-gray-800 text-sm text-gray-400 dark:text-gray-600 cursor-default">
              Previous
            </span>
          )}

          {/* Page Numbers */}
          <div className="flex items-center gap-2">
            {pages.map((page) => {
              const isActive = page === currentPage
              const href = page === 1 ? '/' : `/?page=${page}`

              return (
                <Link
                  key={page}
                  href={href}
                  className={`min-w-8 text-center px-3 py-1 rounded-md text-sm ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {page}
                </Link>
              )
            })}
          </div>

          {/* Next */}
          {currentPage < totalPages ? (
            <Link
              href={`/?page=${currentPage + 1}`}
              className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Next
            </Link>
          ) : (
            <span className="px-3 py-1 rounded-md border border-gray-200 dark:border-gray-800 text-sm text-gray-400 dark:text-gray-600 cursor-default">
              Next
            </span>
          )}
        </section>
      )}
    </div>
  )
}
