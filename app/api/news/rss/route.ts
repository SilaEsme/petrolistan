export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { fetchRSSNews } from '@/lib/rss'
import newsData from '@/public/data/news.json'
import { NewsItem } from '@/types'

export async function GET() {
  try {
    const rssNews = await fetchRSSNews()
    const all: NewsItem[] = [...(newsData as NewsItem[]), ...rssNews]
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

    return NextResponse.json(
      { data: all, updatedAt: new Date().toISOString() },
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Cache-Control': 's-maxage=3600, stale-while-revalidate',
        },
      }
    )
  } catch (err: any) {
    console.error('[/api/news/rss]', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
