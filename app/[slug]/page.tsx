import { ShareButtons } from '@/components/share-buttons'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getPostBySlug, getAllPosts } from '@/lib/posts'
import { formatDate } from '@/lib/utils'
import type { Metadata } from 'next'
import { siteConfig } from '@/lib/siteConfig'

function toTagSlug(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    // ✅ 已确认：只显示文章标题，不带任何后缀
    // 如果你想显示自定义的 SEO 标题（frontmatter 里的 seoTitle），优先使用它
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt || siteConfig.description,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt || siteConfig.description,
      type: 'article',
      publishedTime: post.date,
      url: `${siteConfig.url}/${post.slug}`,
      siteName: siteConfig.name,
      images: [post.coverImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt || siteConfig.description,
      images: [post.coverImage],
    },
  }
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
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

      <div className="flex items-center gap-3 mb-6">
        {post.category && (
          <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-4 py-1.5 rounded-full text-sm font-medium">
            {post.category}
          </span>
        )}
        <span className="text-gray-500 dark:text-gray-400 text-sm">
          {formatDate(post.date)}
        </span>
        <span className="text-gray-500 dark:text-gray-400 text-sm">
          • {post.readTime}
        </span>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
        {post.title}
      </h1>

      <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
          S
        </div>
        <div>
          <div className="font-medium text-gray-900 dark:text-white">
            {post.author}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Ban Appeal & Account Recovery Writer
          </div>
        </div>
      </div>

      <div className="relative h-96 mb-12 rounded-2xl overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div
        className="prose prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {post.tags && post.tags.length > 0 && (
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tag/${toTagSlug(tag)}`}
                className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      )}

      <ShareButtons title={post.title} />
    </article>
  )
}
