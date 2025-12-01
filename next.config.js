/** @type {import('next').NextConfig} */
const nextConfig = {
  // 允许 Next Image 加载 Unsplash 图片
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  // 让 /admin 自动跳转到 /admin/index.html
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/index.html',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/blog/:slug',
        destination: '/:slug',
        permanent: true, // 301
      },
    ]
  },
}

module.exports = nextConfig
