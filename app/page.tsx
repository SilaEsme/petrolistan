'use client'
import Link from 'next/link'
import { usePrices, useNews } from '@/lib/api'
import PriceCard from '@/components/prices/PriceCard'
import HomeComparisonTable from '@/components/prices/HomeComparisonTable'

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })
  } catch {
    return ''
  }
}

export default function HomePage() {
  const { prices, updatedAt, isLoading } = usePrices()
  const { news, isLoading: newsLoading } = useNews()

  const commodityPrices = prices.filter((p) => p.label !== 'Brent (TL karsiligi)')
  const previewNews     = news.slice(0, 3)

  return (
    <>
      {/* 1. Hero */}
      <div className="bg-[#0C447C] text-white py-4 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-lg font-bold">Güncel Akaryakıt Fiyatları</h1>
          <p className="text-white/60 text-sm">Tüm markalar, seçtiğin ilde</p>
        </div>
      </div>

      {/* 2. Marka karşılaştırma tablosu */}
      <HomeComparisonTable />

      {/* 3. Piyasa fiyatları */}
      <div className="max-w-5xl mx-auto px-4 pb-6">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
          Ham Petrol &amp; Doğalgaz
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-3 border border-gray-200/80 flex flex-col gap-2 animate-pulse">
                  <div className="flex justify-between">
                    <div className="h-4 w-24 bg-gray-200 rounded" />
                    <div className="h-3 w-10 bg-gray-100 rounded" />
                  </div>
                  <div className="h-7 w-28 bg-gray-200 rounded" />
                  <div className="h-4 w-20 bg-gray-100 rounded" />
                </div>
              ))
            : commodityPrices.map((item) => (
                <PriceCard key={item.label} {...item} updatedAt={updatedAt} compact />
              ))}
        </div>
      </div>

      {/* 4. Son haberler */}
      <div className="max-w-5xl mx-auto px-4 pb-10">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Son Haberler</p>
          <Link href="/haberler" className="text-xs text-[#185FA5] hover:underline">
            Tümünü gör →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {newsLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-24 bg-gray-100 rounded-xl animate-pulse" />
              ))
            : previewNews.map((item) => (
                <Link
                  key={item.id}
                  href={`/haberler/${item.slug}`}
                  className="block group p-4 rounded-xl border border-gray-100 hover:border-[#0C447C]/30 hover:bg-gray-50/60 transition-all"
                >
                  <p className="text-[13px] font-semibold text-gray-900 leading-snug group-hover:text-[#0C447C] transition-colors mb-2 line-clamp-2">
                    {item.title}
                  </p>
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mb-2">
                    <span className="font-semibold text-gray-500">{item.source}</span>
                    <span>·</span>
                    <span>{formatDate(item.publishedAt)}</span>
                  </div>
                  <span className="text-[11px] text-[#185FA5] group-hover:underline">
                    Devamını oku →
                  </span>
                </Link>
              ))}
        </div>
      </div>
    </>
  )
}
