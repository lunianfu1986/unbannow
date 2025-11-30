import Link from 'next/link'
import Image from 'next/image'
import { getPostsByCategory, getAllPosts } from '@/lib/posts'
import { formatDate } from '@/lib/utils'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ category: string }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  const categories = new Set<string>()
  
  posts.forEach(post => {
    if (post.category) categories.add(post.category.toLowerCase())
  })
  
  return Array.from(categories).map((category) => ({
    category: category,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  
  return {
    title: `${category} | Travel with Samantha`,
    description: `Articles in ${category} category`,
  }
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params
  const posts = await getPostsByCategory(category)

  if (!posts || posts.length === 0) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors"
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
        Back to Home
      </Link>

      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 capitalize">
          {category}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {posts.length} {posts.length === 1 ? 'article' : 'articles'}
        </p>
      </div>

      {/* Posts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
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
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-medium">
                    {post.category}
                  </span>
                  <span className="text-gray-400 dark:text-gray-500 text-sm">
                    {post.readTime}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {post.title}
                </h3>
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
        ))}
      </div>
    </div>
  )
}
