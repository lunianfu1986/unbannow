/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // 允许的图片域名
    domains: ['images.unsplash.com'],
    // 关闭 next/image 的内置优化
    unoptimized: true,
  },

  // 301/308 重定向配置
  async redirects() {
    return [
      // 规则 1：博客文章重定向
      {
        source: '/blog/:slug',
        destination: '/:slug',
        permanent: true,
      },
      // 规则 2：后台管理重定向 (注意这里是一个新的对象，用逗号分隔)
      {
        source: '/admin',
        destination: '/admin/index.html',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
