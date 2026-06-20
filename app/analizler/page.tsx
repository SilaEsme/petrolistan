import Link from 'next/link'
import { Metadata } from 'next'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Benzin, Petrol ve Enerji Analizleri 2026',
  description: 'Türkiye\'de benzin neden pahalı? Brent petrol tahmini, dolar kuru etkisi, OPEC+ kararları, LPG avantajları ve enerji tasarrufu. Uzman analizleri.',
  alternates: { canonical: 'https://petrolistan.com/analizler' },
  robots: { index: false, follow: true },
}

interface ArticleSummary {
  slug: string
  title: string
  excerpt: string
  category: string
  categoryBg: string
  categoryColor: string
  publishedAt: string
  readingTime: number
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

async function fetchArticles(): Promise<ArticleSummary[]> {
  try {
    const backendUrl = process.env.GO_BACKEND_URL ?? 'http://localhost:8080'
    const res = await fetch(`${backendUrl}/articles`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

export default async function AnalizlerPage() {
  const articles = await fetchArticles()

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-dark mb-2">Enerji Analizleri</h1>
      <p className="text-gray-500 text-sm mb-10 border-b border-gray-100 pb-6">
        Derinlemesine enerji piyasası analizleri ve yorumları — Petrolistan Editöryal Ekibi
      </p>

      <div className="space-y-6">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/analizler/${article.slug}`}
            className="block group p-5 rounded-xl border border-gray-100 hover:border-brand/30 hover:bg-gray-50/60 transition-all"
          >
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span
                className="text-[11px] font-medium px-2 py-0.5 rounded"
                style={{ background: article.categoryBg, color: article.categoryColor }}
              >
                {article.category}
              </span>
              <span className="text-xs text-gray-400">{formatDate(article.publishedAt)}</span>
              <span className="text-xs text-gray-400">·</span>
              <span className="text-xs text-gray-400">{article.readingTime} dk okuma</span>
            </div>
            <h2 className="text-[17px] font-semibold text-gray-900 leading-snug group-hover:text-brand transition-colors mb-1.5">
              {article.title}
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              {article.excerpt}
            </p>
          </Link>
        ))}
      </div>

    </main>
  )
}
