import { MetadataRoute } from 'next'
import { provinceSlugToCode } from '@/lib/provinces'

export default function robots(): MetadataRoute.Robots {
  const ilDisallow = Object.keys(provinceSlugToCode).map(
    (il) => `/akaryakit/karsilastirma/${il}`
  )

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ilDisallow,
    },
    sitemap: 'https://petrolistan.com/sitemap.xml',
  }
}
