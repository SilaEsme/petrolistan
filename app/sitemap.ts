import { MetadataRoute } from 'next'
import { provinceSlugToCode } from '@/lib/provinces'

const base = 'https://petrolistan.com'

const fallbackSlugs = [
  'epdk-akaryakit-fiyatlari',
  'turkiye-benzin-neden-pahali',
  'benzin-fiyati-nasil-hesaplanir',
  'dolar-kuru-akaryakit-fiyat-etkisi',
  'turk-lirasi-petrol-fiyatlari-iliskisi',
  'opec-turkiye-etkisi',
  'opec-plus-nedir-nasil-calisir',
  '2026-petrol-fiyat-tahmini',
  'kuzey-irak-petrol-turkiye',
  'turkiye-enerji-ithalati-ekonomik-etkileri',
  'motorin-mi-benzin-mi',
  'lpg-otogaz-avantajlari-dezavantajlari',
  'rafine-petrol-urunleri-neler',
  'akaryakit-tasarrufu-ipuclari',
  'elektrikli-arac-yakit-maliyeti',
  'surdurulebilir-enerji-turkiye-2030',
]

async function fetchPublishedSlugs(): Promise<string[]> {
  try {
    const backendUrl = process.env.GO_BACKEND_URL ?? 'http://localhost:8080'
    const res = await fetch(`${backendUrl}/articles`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(5000),
    })
    if (!res.ok) return fallbackSlugs
    const articles: { slug: string }[] = await res.json()
    return articles.length > 0 ? articles.map((a) => a.slug) : fallbackSlugs
  } catch {
    return fallbackSlugs
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  // İl sayfaları indexleniyor — şehir bazlı akaryakıt sorguları için kritik
  const ilPages: MetadataRoute.Sitemap = Object.keys(provinceSlugToCode).map((slug) => ({
    url: `${base}/akaryakit/karsilastirma/${slug}`,
    lastModified: now,
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }))

  const slugs = await fetchPublishedSlugs()

  const analizPages: MetadataRoute.Sitemap = slugs.map((slug) => ({
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
    { url: `${base}/hakkimizda`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${base}/iletisim`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${base}/gizlilik`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${base}/reklam`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    ...analizPages,
    ...ilPages,
  ]
}
