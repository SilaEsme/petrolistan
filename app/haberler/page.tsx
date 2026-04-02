import type { NewsItem } from '@/types'
import NewsList from '@/components/news/NewsList'

async function getNews(): Promise<NewsItem[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'}/data/news.json`
  )
  return res.json()
}

export default async function HaberlerPage() {
  const news = await getNews()
  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-medium text-gray-900 mb-6">Haberler</h1>
      <NewsList items={news} />
    </main>
  )
}
