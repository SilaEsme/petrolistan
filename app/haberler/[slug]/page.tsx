import { notFound, redirect } from 'next/navigation'

async function getNews(): Promise<any[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'}/api/news/rss`,
      { next: { revalidate: 3600 } }
    )
    const json = await res.json()
    return json.data ?? []
  } catch {
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const news = await getNews()
  const item = news.find((n: any) => n.slug === slug)
  if (!item) return {}
  return {
    title: `${item.title} — Petrolistan`,
    description: item.excerpt,
  }
}

export default async function HaberDetayPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const news = await getNews()
  const item = news.find((n: any) => n.slug === slug)
  if (!item) notFound()

  if (item.externalUrl) {
    redirect(item.externalUrl)
  }

  const categoryColors: Record<string, { bg: string; text: string }> = {
    'OPEC+':    { bg: '#E6F1FB', text: '#0C447C' },
    'TÜRKİYE': { bg: '#E1F5EE', text: '#085041' },
    'ANALİZ':  { bg: '#FAEEDA', text: '#633806' },
    'PAZAR':   { bg: '#FAECE7', text: '#712B13' },
    'DÜNYA':   { bg: '#F1EFE8', text: '#444441' },
  }
  const color = categoryColors[item.category] ?? categoryColors['DÜNYA']
  const formattedDate = new Date(item.publishedAt).toLocaleDateString('tr-TR', {
    day: 'numeric', month: 'long', year: 'numeric'
  })

  // Aynı kategorideki diğer haberler (max 3)
  const related = news
    .filter((n: any) => n.category === item.category && n.slug !== item.slug)
    .slice(0, 3)

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      {/* Meta */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <span className="text-[11px] font-medium px-2 py-0.5 rounded"
          style={{ background: color.bg, color: color.text }}>
          {item.category}
        </span>
        <span className="text-xs text-gray-400">{formattedDate}</span>
        <span className="text-xs text-gray-400">·</span>
        <span className="text-xs text-gray-400">{item.source}</span>
        <span className="text-xs text-gray-400">·</span>
        <span className="text-xs text-gray-400">{item.readingTime} dk okuma</span>
      </div>

      {/* Başlık */}
      <h1 className="text-2xl font-medium text-gray-900 leading-snug mb-4">
        {item.title}
      </h1>

      {/* Excerpt / İçerik */}
      <p className="text-base text-gray-600 leading-relaxed border-l-2 border-[#378ADD] pl-4 mb-8">
        {item.excerpt}
      </p>

      {/* Sosyal paylaşım */}
      <div className="flex gap-2 mb-10">
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(item.title)}&url=https://petrolistan.com/haberler/${slug}`}
          target="_blank" rel="noopener noreferrer"
          className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded transition-colors">
          X'te paylaş
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=https://petrolistan.com/haberler/${slug}`}
          target="_blank" rel="noopener noreferrer"
          className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded transition-colors">
          LinkedIn'de paylaş
        </a>
      </div>

      {/* İlgili haberler */}
      {related.length > 0 && (
        <div className="border-t border-gray-200 pt-8">
          <h2 className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-4">
            İlgili haberler
          </h2>
          <div className="space-y-3">
            {related.map((r: any) => (
              <a key={r.slug} href={`/haberler/${r.slug}`}
                className="block hover:bg-gray-50 p-3 rounded-lg transition-colors">
                <p className="text-sm font-medium text-gray-900">{r.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{r.source} · {r.readingTime} dk okuma</p>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Geri dön */}
      <div className="mt-10 pt-6 border-t border-gray-200">
        <a href="/haberler" className="text-sm text-[#185FA5] hover:underline">
          ← Tüm haberler
        </a>
      </div>
    </main>
  )
}
