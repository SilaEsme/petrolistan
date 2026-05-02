import { MetadataRoute } from 'next'
import { provinceSlugToCode } from '@/lib/provinces'

const base = 'https://petrolistan.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const ilPages: MetadataRoute.Sitemap = Object.keys(provinceSlugToCode).map((slug) => ({
    url: `${base}/akaryakit/karsilastirma/${slug}`,
    lastModified: now,
    changeFrequency: 'hourly' as const,
    priority: 0.8,
  }))

  const analizler = [
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
    { url: `${base}/hakkimizda`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${base}/iletisim`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${base}/gizlilik`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${base}/reklam`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    ...analizPages,
    ...ilPages,
  ]
}
