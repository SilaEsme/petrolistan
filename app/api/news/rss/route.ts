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

export async function GET() {
  try {
    const key = process.env.NEWSDATA_API_KEY
    if (!key) return NextResponse.json({ data: [], error: 'API key eksik' })

    // İki paralel sorgu: Türkçe + İngilizce enerji haberleri
    const [trRes, enRes] = await Promise.allSettled([
      fetch(
        `https://newsdata.io/api/1/news?apikey=${key}&q=petrol+do%C4%9Falgaz+enerji+akaryak%C4%B1t&language=tr&category=business,politics&size=10`,
        { next: { revalidate: 3600 }, signal: AbortSignal.timeout(8000) }
      ),
      fetch(
        `https://newsdata.io/api/1/news?apikey=${key}&q=oil+gas+energy+OPEC+crude&language=en&category=business&size=10`,
        { next: { revalidate: 3600 }, signal: AbortSignal.timeout(8000) }
      ),
    ])

    const news: NewsItem[] = []

    for (const result of [trRes, enRes]) {
      if (result.status !== 'fulfilled') continue
      const json = await result.value.json()
      if (!json.results) continue

      for (const item of json.results) {
        if (!item.title) continue
        news.push({
          id: item.article_id ?? item.link ?? Math.random().toString(36),
          slug: slugify(item.title),
          title: item.title,
          excerpt: item.description?.substring(0, 200) ?? item.content?.substring(0, 200) ?? '',
          category: item.language === 'tr' ? 'TÜRKİYE' : 'DÜNYA',
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
