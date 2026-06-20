import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'

export const revalidate = 86400

interface ArticleDetail {
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  categoryBg: string
  categoryColor: string
  publishedAt: string
  readingTime: number
}

const backendUrl = process.env.GO_BACKEND_URL ?? 'http://localhost:8080'

async function fetchArticle(slug: string): Promise<ArticleDetail | null> {
  try {
    const res = await fetch(`${backendUrl}/articles/${slug}`, {
      next: { revalidate: 86400 },
      signal: AbortSignal.timeout(8000),
    })
    if (res.status === 404) return null
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export async function generateStaticParams() {
  try {
    const res = await fetch(`${backendUrl}/articles`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) return []
    const articles: { slug: string }[] = await res.json()
    return articles.map((a) => ({ slug: a.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = await fetchArticle(slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `https://petrolistan.com/analizler/${article.slug}` },
    robots: { index: false, follow: true },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `https://petrolistan.com/analizler/${article.slug}`,
      type: 'article',
    },
  }
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = await fetchArticle(slug)
  if (!article) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    url: `https://petrolistan.com/analizler/${article.slug}`,
    author: {
      '@type': 'Organization',
      name: 'Petrolistan Editöryal',
      url: 'https://petrolistan.com/hakkimizda',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Petrolistan',
      url: 'https://petrolistan.com',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="max-w-3xl mx-auto px-4 py-10">
        <div className="flex items-center gap-2 mb-4 flex-wrap">
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

        <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-3">{article.title}</h1>
        <p className="text-gray-500 text-base leading-relaxed mb-8 border-b border-gray-100 pb-8">
          {article.excerpt}
        </p>

        {article.content ? (
          <article
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-brand"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        ) : (
          <p className="text-gray-400 italic text-sm">İçerik yakında eklenecek.</p>
        )}

        <div className="mt-12 pt-6 border-t border-gray-100">
          <Link
            href="/analizler"
            className="text-sm text-brand hover:text-dark transition-colors"
          >
            ← Tüm analizler
          </Link>
        </div>
      </main>
    </>
  )
}
