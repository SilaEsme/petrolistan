import { NewsItem } from '@/types'

export async function fetchRSSNews(): Promise<NewsItem[]> {
  const key = process.env.NEWSDATA_API_KEY
  if (!key) return []

  try {
    const res = await fetch(
      `https://newsdata.io/api/1/news?apikey=${key}&q=petrol+enerji&language=tr&category=business`,
      { next: { revalidate: 3600 }, signal: AbortSignal.timeout(5000) }
    )
    const json = await res.json()
    if (!json.results) return []

    return json.results.slice(0, 8).map((item: any): NewsItem => ({
      id: item.article_id,
      slug: item.article_id,
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
  } catch (err) {
    console.error('[RSS] NewsData fetch hatası:', err)
    return []
  }
}
