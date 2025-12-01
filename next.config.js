/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  // 301 重定向：老地址 /blog/:slug -> 新地址 /:slug
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
