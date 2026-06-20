import { MetadataRoute } from 'next'
import { provinceSlugToCode } from '@/lib/provinces'

const base = 'https://petrolistan.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  // İl sayfaları indexleniyor — şehir bazlı akaryakıt sorguları için kritik
  const ilPages: MetadataRoute.Sitemap = Object.keys(provinceSlugToCode).map((slug) => ({
    url: `${base}/akaryakit/karsilastirma/${slug}`,
    lastModified: now,
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }))

  return [
    { url: base, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${base}/haberler`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/akaryakit`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/akaryakit/karsilastirma`, lastModified: now, changeFrequency: 'hourly', priority: 0.95 },
    { url: `${base}/ham-petrol`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${base}/dogalgaz`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${base}/hakkimizda`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${base}/iletisim`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${base}/gizlilik`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${base}/reklam`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    ...ilPages,
  ]
}
