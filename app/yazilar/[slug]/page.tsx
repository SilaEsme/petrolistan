import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { YAZILAR, getYazi, getYaziIcerik } from '@/lib/yazilar'
import { ArticleSchema } from '@/components/ads/ArticleSchema'
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema'
import AdUnit, { AD_SLOTS } from '@/components/ads/AdUnit'

type Params = Promise<{ slug: string }>

export function generateStaticParams() {
  return YAZILAR.map((y) => ({ slug: y.slug }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const yazi = getYazi(slug)
  if (!yazi) return {}
  return {
    title: `${yazi.baslik} | Petrolistan`,
    description: yazi.ozet,
    alternates: { canonical: `https://petrolistan.com/yazilar/${slug}` },
    robots: { index: true, follow: true },
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default async function YaziDetayPage({ params }: { params: Params }) {
  const { slug } = await params
  const yazi = getYazi(slug)
  const icerik = getYaziIcerik(slug)
  if (!yazi || !icerik) notFound()

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <ArticleSchema
        title={yazi.baslik}
        description={yazi.ozet}
        datePublished={yazi.tarih}
        url={`https://petrolistan.com/yazilar/${slug}`}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Ana Sayfa', url: 'https://petrolistan.com' },
          { name: 'Yazılar', url: 'https://petrolistan.com/yazilar' },
          { name: yazi.baslik, url: `https://petrolistan.com/yazilar/${slug}` },
        ]}
      />

      {/* Etiketler */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {yazi.etiketler.map((etiket) => (
          <span
            key={etiket}
            className="text-[11px] font-medium px-2 py-0.5 rounded bg-blue-50 text-[#0C447C]"
          >
            {etiket}
          </span>
        ))}
      </div>

      {/* Başlık */}
      <h1 className="text-2xl font-bold text-gray-900 leading-snug mb-3">{yazi.baslik}</h1>
      <div className="flex items-center gap-3 text-xs text-gray-400 mb-8 pb-6 border-b border-gray-100">
        <time dateTime={yazi.tarih}>{formatDate(yazi.tarih)}</time>
        <span>·</span>
        <span>Petrolistan Editöryal</span>
      </div>

      {/* İçerik */}
      <div
        className="prose prose-gray max-w-none text-[15px] leading-relaxed
          prose-h2:text-xl prose-h2:font-semibold prose-h2:text-gray-900 prose-h2:mt-8 prose-h2:mb-3
          prose-h3:text-base prose-h3:font-semibold prose-h3:text-gray-800 prose-h3:mt-6 prose-h3:mb-2
          prose-p:text-gray-700 prose-p:mb-4
          prose-ul:list-disc prose-ul:pl-5 prose-ul:space-y-1 prose-ul:mb-4
          prose-ol:list-decimal prose-ol:pl-5 prose-ol:space-y-1 prose-ol:mb-4
          prose-li:text-gray-700
          prose-strong:text-gray-900
          prose-a:text-[#185FA5] prose-a:no-underline hover:prose-a:underline"
        dangerouslySetInnerHTML={{ __html: icerik }}
      />

      {/* Makale sonu reklam */}
      <AdUnit slot={AD_SLOTS.articleInContent} format="rectangle" className="mt-10" />

      {/* Geri dön */}
      <div className="mt-10 pt-6 border-t border-gray-200">
        <a href="/yazilar" className="text-sm text-[#185FA5] hover:underline">
          ← Tüm yazılar
        </a>
      </div>
    </main>
  )
}
