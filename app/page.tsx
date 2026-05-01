'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { usePrices, usePriceHistory, useNews, useFuelBrands } from '@/lib/api'
import PriceCard from '@/components/prices/PriceCard'
import PriceChart from '@/components/prices/PriceChart'
import { PROVINCES, provinceCodeToSlug } from '@/lib/provinces'

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
  const router = useRouter()
  const [province, setProvince] = useState('34')

  const { prices, updatedAt, isLoading }           = usePrices()
  const { history, isLoading: historyLoading }     = usePriceHistory()
  const { news, isLoading: newsLoading }           = useNews()
  const { data: fuelData, isLoading: fuelLoading } = useFuelBrands(province)

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

  const fuelCardColors: Record<string, string> = {
    'Benzin 95': 'bg-[#0C447C]',
    'Motorin':   'bg-[#042C53]',
    'LPG':       'bg-[#BA7517]',
  }
  const previewNews    = news.slice(0, 3)
  const provinceName   = PROVINCES[province.padStart(2, '0')] ?? 'İstanbul'

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

  function handleProvinceChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const code = e.target.value
    setProvince(code)
    const slug = provinceCodeToSlug[parseInt(code)]
    if (slug) router.push(`/akaryakit/karsilastirma/${slug}`)
  }

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
                <div key={i} className="h-[96px] bg-gray-100 rounded-xl animate-pulse" />
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
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Akaryakıt Fiyatları
            </span>
            <select
              value={province}
              onChange={handleProvinceChange}
              className="border border-[#0C447C]/40 rounded-md px-2 py-1 text-[12px] text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#0C447C]/30 focus:border-[#0C447C]"
            >
              {Object.entries(PROVINCES).map(([code, name]) => (
                <option key={code} value={String(parseInt(code))}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {fuelLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-32 bg-gray-100 rounded-xl animate-pulse" />
                ))
              : fuelItems.map((item) => (
                  <Link
                    key={item.name}
                    href={`/akaryakit/karsilastirma?province=${province}`}
                    className={`block ${fuelCardColors[item.name] ?? 'bg-[#0C447C]'} text-white rounded-xl p-5 shadow-sm hover:opacity-90 transition-opacity cursor-pointer`}
                  >
                    <p className="text-xs font-medium text-white/80 mb-2">{item.name}</p>
                    <p className="text-5xl font-bold tabular-nums leading-none">
                      {item.value.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      <span className="text-base font-medium text-white/60 ml-1.5">₺/L</span>
                    </p>
                    <p className="text-white/60 text-xs mt-2">
                      {isFuelFallback
                        ? 'Kaynak: EPDK · Haftalık güncelleme'
                        : `${provinceName} ortalaması · ${brands.length} marka`}
                    </p>
                    <p className="text-white/70 text-sm mt-3">
                      Markaları karşılaştır →
                    </p>
                  </Link>
                ))}
          </div>
        </div>

        {/* Ham Petrol & Doğalgaz — küçük kartlar */}
        <div>
          <p className="text-sm font-normal text-gray-400 uppercase tracking-wider mb-3">
            Ham Petrol &amp; Doğalgaz
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl p-3 border border-gray-200/80 flex flex-col gap-2 animate-pulse"
                  >
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
      </section>

      {/* Brent 30 günlük grafik */}
      <PriceChart data={history} isLoading={historyLoading} />

    </main>
  )
}
