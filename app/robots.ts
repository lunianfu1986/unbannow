import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'], // 不让爬虫抓取 API 和后台
    },
    sitemap: 'https://www.unbannow.com/sitemap.xml',
  }
}
