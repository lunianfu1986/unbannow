/** @type {import('next').NextConfig} */
const nextConfig = {
  // 允许使用 Unsplash 图片
  images: {
    domains: ['images.unsplash.com'],
  },

  // 301 重定向：老地址 /blog/slug -> 新地址 /slug
  async redirects() {
    return [
      {
        source: '/blog/:slug',
        destination: '/:slug',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
