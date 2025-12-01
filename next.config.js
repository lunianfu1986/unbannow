/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // 允许的图片域名（你现在用的是 Unsplash）
    domains: ['images.unsplash.com'],
    // 关闭 next/image 的内置优化，直接原图输出
    unoptimized: true,
  },

  // 301 重定向：老地址 /blog/:slug -> 新地址 /:slug
  async redirects() {
    return [
      {
        source: '/blog/:slug',
        destination: '/:slug',
        permanent: true,
        source: '/admin',
        destination: '/admin/index.html',
        permanent: true, // 开启永久重定向 (308)
      },
    ]
  },
}

module.exports = nextConfig
