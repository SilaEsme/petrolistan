'use client'
import Link from 'next/link'
import { usePrices, usePriceHistory, useNews, useFuelBrands } from '@/lib/api'
import PriceCard from '@/components/prices/PriceCard'
import PriceChart from '@/components/prices/PriceChart'

const FUEL_FALLBACK = [
  { name: 'Benzin 95', value: 72.40 },
  { name: 'Motorin',   value: 68.05 },
  { name: 'LPG',       value: 34.20 },
]

function avg(nums: number[]) {
  const valid = nums.filter((n) => n > 0)
  if (!valid.length) return 0
  return valid.reduce((a, b) => a + b, 0) / valid.length
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })
  } catch {
    return ''
  }
}

export default function HomePage() {
  const { prices, updatedAt, isLoading }          = usePrices()
  const { history, isLoading: historyLoading }    = usePriceHistory()
  const { news, isLoading: newsLoading }          = useNews()
  const { data: fuelData, isLoading: fuelLoading } = useFuelBrands('34')

  const commodityPrices = prices.filter((p) => p.label !== 'Brent (TL karsiligi)')

  const brands = fuelData?.data ?? []
  const fuelItems =
    brands.length > 0
      ? [
          { name: 'Benzin 95', value: avg(brands.map((b) => b.gasoline)) },
          { name: 'Motorin',   value: avg(brands.map((b) => b.diesel)) },
          { name: 'LPG',       value: avg(brands.map((b) => b.lpg)) },
        ].filter((item) => item.value > 0)
      : FUEL_FALLBACK

  const isFuelFallback = brands.length === 0
  const previewNews    = news.slice(0, 3)

  const formattedTime = (() => {
    if (!updatedAt) return undefined
    try {
      const d = new Date(updatedAt)
      if (isNaN(d.getTime())) return undefined
      return d.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
    } catch {
      return undefined
    }
  })()

  return (
    <main className="max-w-5xl mx-auto px-4 py-6 space-y-8">

      {/* Son Haberler */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Son Haberler</h2>
          <Link href="/haberler" className="text-xs text-[#185FA5] hover:underline">
            Tümünü gör →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {newsLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-[84px] bg-gray-100 rounded-xl animate-pulse" />
              ))
            : previewNews.map((item) => (
                <Link
                  key={item.id}
                  href={`/haberler/${item.slug}`}
                  className="block group p-4 rounded-xl border border-gray-100 hover:border-[#0C447C]/20 hover:bg-gray-50/60 transition-all"
                >
                  <p className="text-[13px] font-semibold text-gray-900 leading-snug group-hover:text-[#0C447C] transition-colors mb-2 line-clamp-2">
                    {item.title}
                  </p>
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                    <span>{item.source}</span>
                    <span>·</span>
                    <span>{formatDate(item.publishedAt)}</span>
                  </div>
                </Link>
              ))}
        </div>
      </section>

      {/* Piyasa Fiyatları */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[#042C53] font-bold text-lg">Piyasa Fiyatları</h2>
          {formattedTime && formattedTime !== 'Invalid Date' && (
            <span className="flex items-center gap-1 text-[10px] text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B6D11] inline-block" />
              Güncellendi {formattedTime}
            </span>
          )}
        </div>

        {/* Akaryakıt — büyük kartlar */}
        <div className="mb-6">
          <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-3">
            Akaryakıt — İstanbul Ortalaması
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {fuelLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-28 bg-gray-100 rounded-xl animate-pulse" />
                ))
              : fuelItems.map((item) => (
                  <div
                    key={item.name}
                    className="bg-white rounded-xl p-5 border border-gray-200/80 shadow-sm"
                  >
                    <p className="text-xs text-gray-500 font-medium mb-2">{item.name}</p>
                    <p className="text-3xl font-bold text-[#042C53] tabular-nums leading-none">
                      {item.value.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      <span className="text-base font-medium text-gray-400 ml-1.5">₺/L</span>
                    </p>
                    <p className="text-[10px] text-gray-400 mt-2">
                      {isFuelFallback
                        ? 'Kaynak: EPDK · Haftalık güncelleme'
                        : `${brands.length} marka ortalaması`}
                    </p>
                  </div>
                ))}
          </div>
          <Link
            href="/akaryakit/karsilastirma?province=34"
            className="mt-2 inline-block text-[11px] text-[#185FA5] hover:underline"
          >
            Marka karşılaştırması →
          </Link>
        </div>

        {/* Ham Petrol & Doğalgaz — küçük kartlar */}
        <div>
          <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-3">
            Ham Petrol &amp; Doğalgaz
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl p-4 border border-gray-200/80 flex flex-col gap-3 animate-pulse"
                  >
                    <div className="flex justify-between">
                      <div className="h-4 w-24 bg-gray-200 rounded" />
                      <div className="h-3 w-10 bg-gray-100 rounded" />
                    </div>
                    <div className="h-8 w-28 bg-gray-200 rounded" />
                    <div className="h-4 w-20 bg-gray-100 rounded" />
                  </div>
                ))
              : commodityPrices.map((item) => (
                  <PriceCard key={item.label} {...item} updatedAt={updatedAt} />
                ))}
          </div>
        </div>
      </section>

      {/* Brent 30 günlük grafik */}
      <PriceChart data={history} isLoading={historyLoading} />

    </main>
  )
}
