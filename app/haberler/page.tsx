'use client'

import { useState, useEffect } from 'react'
import type { NewsItem } from '@/types'
import NewsList from '@/components/news/NewsList'

const CATEGORIES = ['Tümü', 'OPEC+', 'TÜRKİYE', 'ANALİZ', 'PAZAR', 'DÜNYA']

export default function HaberlerPage() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('Tümü')

  useEffect(() => {
    fetch('/data/news.json')
      .then((r) => r.json())
      .then((data) => {
        setNews(data)
        setIsLoading(false)
      })
  }, [])

  const filtered =
    activeCategory === 'Tümü'
      ? news
      : news.filter((n) => n.category === activeCategory)

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-medium text-gray-900 mb-6">Haberler</h1>

      {/* Kategori filtreleri */}
      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
              activeCategory === cat
                ? 'bg-[#0C447C] text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-400'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <NewsList items={filtered} isLoading={isLoading} />
    </main>
  )
}
