import { MetadataRoute } from 'next'

export const dynamic = 'force-dynamic'

const base = 'https://petrolistan.com'

async function fetchNewsSlugs(): Promise<{ slug: string; publishedAt: string }[]> {
  try {
    const res = await fetch(`${base}/api/news/rss`, { next: { revalidate: 3600 } })
    if (!res.ok) return []
    const json = await res.json()
    return (json.data ?? []).map((h: any) => ({
      slug: h.slug ?? '',
      publishedAt: h.publishedAt ?? new Date().toISOString(),
    })).filter((h: any) => h.slug)
  } catch {
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  const newsSlugs = await fetchNewsSlugs()

  const haberler: MetadataRoute.Sitemap = newsSlugs.map((h) => ({
    url: `${base}/haberler/${h.slug}`,
    lastModified: new Date(h.publishedAt),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  // noindex olan 81 il sayfası sitemap'e dahil edilmiyor
  const analizler = [
    'turkiye-benzin-neden-pahali',
    'opec-turkiye-etkisi',
    'motorin-mi-benzin-mi',
    '2026-petrol-fiyat-tahmini',
    'elektrikli-arac-yakit-maliyeti',
  ]

  const analizPages: MetadataRoute.Sitemap = analizler.map((slug) => ({
    url: `${base}/analizler/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    { url: base, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${base}/haberler`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/akaryakit`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/akaryakit/karsilastirma`, lastModified: now, changeFrequency: 'hourly', priority: 0.95 },
    { url: `${base}/ham-petrol`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${base}/dogalgaz`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${base}/analizler`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${base}/gizlilik`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${base}/iletisim`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    ...analizPages,
    ...haberler,
  ]
}
