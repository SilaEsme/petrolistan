import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/akaryakit/karsilastirma/',
    },
    sitemap: 'https://petrolistan.com/sitemap.xml',
  }
}
