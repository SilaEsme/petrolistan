export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { NewsItem } from '@/types'

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 80)
}

function detectCategory(title: string, excerpt: string): NewsItem['category'] {
  const text = (title + ' ' + excerpt).toLowerCase()
  if (/opec|brent|wti|ham petrol/.test(text)) return 'OPEC+'
  if (/türkiye|botaş|epdk|akaryakıt|benzin|motorin|tüpraş/.test(text)) return 'TÜRKİYE'
  if (/analiz|yorum|değerlendirme|beklenti|tahmin/.test(text)) return 'ANALİZ'
  if (/fiyat|piyasa|borsa|dolar|kur/.test(text)) return 'PAZAR'
  return 'DÜNYA'
}

export async function GET() {
  try {
    const key = process.env.NEWSDATA_API_KEY
    if (!key) return NextResponse.json({ data: [], error: 'API key eksik' })

    const queries = [
      // Türkiye odaklı enerji haberleri
      `https://newsdata.io/api/1/news?apikey=${key}&q=petrol+akaryak%C4%B1t+do%C4%9Falgaz+enerji&language=tr&size=10`,
      // OPEC ve küresel petrol - Türkçe
      `https://newsdata.io/api/1/news?apikey=${key}&q=OPEC+ham+petrol+brent&language=tr&size=10`,
    ]

    const results = await Promise.allSettled(
      queries.map((url) =>
        fetch(url, { next: { revalidate: 3600 }, signal: AbortSignal.timeout(8000) })
      )
    )

    const news: NewsItem[] = []
    const seenTitles = new Set<string>()

    for (const result of results) {
      if (result.status !== 'fulfilled') continue
      const json = await result.value.json()
      if (!json.results) continue

      for (const item of json.results) {
        if (!item.title) continue
        if (seenTitles.has(item.title)) continue
        seenTitles.add(item.title)

        const excerpt =
          item.description?.substring(0, 200) ??
          item.content?.substring(0, 200) ??
          ''

        news.push({
          id: item.article_id ?? item.link ?? Math.random().toString(36),
          slug: slugify(item.title),
          title: item.title,
          excerpt,
          category: detectCategory(item.title, excerpt),
          publishedAt: item.pubDate
            ? new Date(item.pubDate).toISOString()
            : new Date().toISOString(),
          source: item.source_name ?? item.source_id ?? 'Haber',
          readingTime: 2,
          externalUrl: item.link,
        })
      }
    }

    // Tarihe göre sırala, en yeni önce
    news.sort((a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )

    return NextResponse.json(
      { data: news.slice(0, 20), updatedAt: new Date().toISOString() },
      { headers: { 'Content-Type': 'application/json; charset=utf-8' } }
    )
  } catch (err: any) {
    console.error('[/api/news/rss]', err.message)
    return NextResponse.json({ data: [], error: err.message }, { status: 500 })
  }
}
