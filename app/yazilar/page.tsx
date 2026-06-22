import type { Metadata } from 'next'
import Link from 'next/link'
import { YAZILAR } from '@/lib/yazilar'
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema'

export const metadata: Metadata = {
  title: 'Yazılar ve Analizler | Petrolistan',
  description:
    "Türkiye'de yakıt fiyatları, ham petrol piyasaları ve enerji ekonomisi hakkında özgün analizler ve rehber yazılar.",
  alternates: { canonical: 'https://petrolistan.com/yazilar' },
  robots: { index: true, follow: true },
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function YazilarPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <BreadcrumbSchema
        items={[
          { name: 'Ana Sayfa', url: 'https://petrolistan.com' },
          { name: 'Yazılar', url: 'https://petrolistan.com/yazilar' },
        ]}
      />

      <h1 className="text-3xl font-bold text-dark mb-2">Yazılar ve Analizler</h1>
      <p className="text-gray-500 text-sm mb-10 border-b border-gray-100 pb-6">
        Türkiye enerji piyasaları, yakıt ekonomisi ve ham petrol hakkında özgün içerikler.
      </p>

      <div className="space-y-8">
        {YAZILAR.map((yazi) => (
          <article key={yazi.slug} className="border-b border-gray-100 pb-8 last:border-0">
            <div className="flex flex-wrap gap-1.5 mb-3">
              {yazi.etiketler.map((etiket) => (
                <span
                  key={etiket}
                  className="text-[11px] font-medium px-2 py-0.5 rounded bg-blue-50 text-[#0C447C]"
                >
                  {etiket}
                </span>
              ))}
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2 leading-snug">
              <Link
                href={`/yazilar/${yazi.slug}`}
                className="hover:text-[#0C447C] transition-colors"
              >
                {yazi.baslik}
              </Link>
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">{yazi.ozet}</p>
            <div className="flex items-center justify-between">
              <time className="text-xs text-gray-400" dateTime={yazi.tarih}>
                {formatDate(yazi.tarih)}
              </time>
              <Link
                href={`/yazilar/${yazi.slug}`}
                className="text-xs font-medium text-[#185FA5] hover:underline"
              >
                Devamını oku →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}
