import { NewsItem } from '@/types'

function isValidNewsItem(item: unknown): item is NewsItem {
  return (
    typeof item === 'object' && item !== null &&
    typeof (item as Record<string, unknown>).title === 'string' &&
    typeof (item as Record<string, unknown>).link === 'string'
  )
}

interface RawNewsItem {
  article_id?: string
  title?: string
  description?: string
  pubDate?: string
  source_name?: string
  link?: string
}

function isValidRawItem(item: unknown): item is RawNewsItem {
  if (typeof item !== 'object' || item === null) return false
  const r = item as Record<string, unknown>
  return (
    typeof r.article_id === 'string' &&
    typeof r.title === 'string' &&
    typeof r.link === 'string'
  )
}

export async function fetchRSSNews(): Promise<NewsItem[]> {
  const key = process.env.NEWSDATA_API_KEY
  if (!key) return []

  try {
    const res = await fetch(
      `https://newsdata.io/api/1/news?apikey=${key}&q=petrol+enerji&language=tr&category=business`,
      { next: { revalidate: 3600 }, signal: AbortSignal.timeout(5000) }
    )
    const json = await res.json()
    if (!json.results || !Array.isArray(json.results)) return []

    const mapped: NewsItem[] = json.results
      .filter(isValidRawItem)
      .slice(0, 8)
      .map((item: RawNewsItem): NewsItem => ({
        id: item.article_id!,
        slug: item.article_id!,
        title: item.title ?? '',
        excerpt: item.description?.substring(0, 200) ?? '',
        category: 'DÜNYA' as const,
        publishedAt: item.pubDate
          ? new Date(item.pubDate).toISOString()
          : new Date().toISOString(),
        source: item.source_name ?? 'Haber',
        readingTime: 2,
        externalUrl: item.link,
      }))

    return mapped.filter(isValidNewsItem)
  } catch (err) {
    console.error('[RSS] NewsData fetch hatası:', err)
    return []
  }
}
