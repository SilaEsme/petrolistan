import Parser from 'rss-parser'
import { NewsItem } from '@/types'

const parser = new Parser()

type RSSSource = {
  url: string
  category: NewsItem['category']
  source: string
}

const RSS_SOURCES: RSSSource[] = [
  {
    url: 'https://feeds.reuters.com/reuters/energyNews',
    category: 'DÜNYA',
    source: 'Reuters',
  },
  {
    url: 'https://www.aa.com.tr/tr/rss/default?cat=economy',
    category: 'TÜRKİYE',
    source: 'AA',
  },
]

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 80)
}

export async function fetchRSSNews(): Promise<NewsItem[]> {
  // Dev ortamında harici ağa erişim yok, mock döndür
  if (process.env.NODE_ENV === 'development') {
    return [
      {
        id: 'rss-reuters-1',
        slug: 'reuters-opec-output-cuts',
        title: 'OPEC considers further output cuts amid price pressure',
        excerpt: 'OPEC+ ministers are weighing additional output reductions as oil prices face headwinds from slowing demand growth in Asia.',
        category: 'DÜNYA' as const,
        publishedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        source: 'Reuters',
        readingTime: 2,
        externalUrl: 'https://reuters.com/business/energy',
      },
      {
        id: 'rss-reuters-2',
        slug: 'reuters-us-crude-inventories',
        title: 'U.S. crude inventories fall more than expected',
        excerpt: 'U.S. crude oil stockpiles fell by 4.2 million barrels last week, exceeding analyst forecasts of a 2.1 million barrel draw.',
        category: 'DÜNYA' as const,
        publishedAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
        source: 'Reuters',
        readingTime: 2,
        externalUrl: 'https://reuters.com/business/energy',
      },
      {
        id: 'rss-aa-1',
        slug: 'aa-turkiye-enerji-ithalati-artis',
        title: "Türkiye'nin enerji ithalatı yüzde 8 arttı",
        excerpt: "TÜİK verilerine göre Türkiye'nin enerji ithalatı ilk çeyrekte geçen yıla kıyasla yüzde 8 artış gösterdi.",
        category: 'TÜRKİYE' as const,
        publishedAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
        source: 'AA',
        readingTime: 2,
        externalUrl: 'https://aa.com.tr/tr/ekonomi',
      },
      {
        id: 'rss-aa-2',
        slug: 'aa-dogalgaz-depolama-doluluk',
        title: "Avrupa'nın doğalgaz depolama doluluk oranı yüzde 42'ye geriledi",
        excerpt: "Avrupa doğalgaz depolama tesislerinin doluluk oranı kış sezonunun ardından yüzde 42 seviyesine inerken, yeniden doldurma süreci başladı.",
        category: 'DÜNYA' as const,
        publishedAt: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
        source: 'AA',
        readingTime: 2,
        externalUrl: 'https://aa.com.tr/tr/ekonomi',
      },
    ]
  }

  // Production: gerçek RSS çek
  const results = await Promise.allSettled(
    RSS_SOURCES.map(async (src) => {
      const response = await fetch(src.url, {
        headers: { 'User-Agent': 'Petrolistan/1.0' },
        signal: AbortSignal.timeout(5000),
      })
      const text = await response.text()
      const feed = await parser.parseString(text)
      return feed.items.slice(0, 5).map((item): NewsItem => ({
        id: item.guid ?? item.link ?? Math.random().toString(36),
        slug: slugify(item.title ?? ''),
        title: item.title ?? '',
        excerpt: item.contentSnippet?.substring(0, 200) ?? '',
        category: src.category,
        publishedAt: item.pubDate
          ? new Date(item.pubDate).toISOString()
          : new Date().toISOString(),
        source: src.source,
        readingTime: 2,
        externalUrl: item.link,
      }))
    })
  )

  return results
    .filter((r): r is PromiseFulfilledResult<NewsItem[]> => r.status === 'fulfilled')
    .flatMap((r) => r.value)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}
