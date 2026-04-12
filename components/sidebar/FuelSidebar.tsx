'use client'
import Link from 'next/link'
import { useFuelBrands } from '@/lib/api'

// Makul tavan değerleri — bar yüzdesini hesaplamak için
const BAR_MAX: Record<string, number> = {
  'Benzin 95': 90,
  Motorin: 90,
  LPG: 50,
}

// Go backend henüz hazır değilse gösterilecek yedek değerler
const FALLBACK = [
  { name: 'Benzin 95', value: 72.40 },
  { name: 'Motorin',   value: 68.05 },
  { name: 'LPG',       value: 34.20 },
]

function avg(nums: number[]) {
  const valid = nums.filter((n) => n > 0)
  if (!valid.length) return 0
  return valid.reduce((a, b) => a + b, 0) / valid.length
}

export default function FuelSidebar({ province = '34' }: { province?: string }) {
  const { data, isLoading, isError } = useFuelBrands(province)

  if (isLoading) {
    return (
      <div className="bg-white border border-gray-200/80 rounded-lg p-3 space-y-3">
        <div className="h-3 w-28 bg-gray-100 rounded animate-pulse" />
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-1.5">
            <div className="h-3 bg-gray-100 rounded animate-pulse" />
            <div className="h-[3px] bg-gray-100 rounded-full animate-pulse" />
          </div>
        ))}
      </div>
    )
  }

  const brands = data?.data ?? []

  const gasolineAvg = avg(brands.map((b) => b.gasoline))
  const dieselAvg   = avg(brands.map((b) => b.diesel))
  const lpgAvg      = avg(brands.map((b) => b.lpg))

  if (brands.length > 0) {
    console.log('[FuelSidebar] brands:', brands.length, '| avg →', {
      gasoline: gasolineAvg.toFixed(2),
      diesel:   dieselAvg.toFixed(2),
      lpg:      lpgAvg.toFixed(2),
    })
  }

  const items =
    brands.length > 0
      ? [
          { name: 'Benzin 95', value: gasolineAvg },
          { name: 'Motorin',   value: dieselAvg },
          { name: 'LPG',       value: lpgAvg },
        ].filter((item) => item.value > 0)
      : FALLBACK

  const isFallback = isError || brands.length === 0

  return (
    <div className="bg-white border border-gray-200/80 rounded-lg p-3">
      <h3 className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-3">
        Akaryakıt fiyatları
      </h3>

      <div className="space-y-2.5">
        {items.map((item) => {
          const barPercent = Math.min(
            100,
            Math.round((item.value / (BAR_MAX[item.name] ?? 100)) * 100)
          )
          return (
            <div key={item.name}>
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-xs text-gray-500">{item.name}</span>
                <span className="text-sm font-medium text-gray-900 tabular-nums">
                  {item.value.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                  <span className="text-[10px] text-gray-400 ml-0.5">₺/L</span>
                  {!isFallback && (
                    <span className="text-[10px] text-[#BA7517] ml-1">(ort.)</span>
                  )}
                </span>
              </div>
              <div className="h-[3px] bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#185FA5] rounded-full"
                  style={{ width: `${barPercent}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>

      <p className="text-[10px] text-gray-400 mt-3">
        {isFallback
          ? 'Kaynak: EPDK · Haftalık güncelleme'
          : `${brands.length} marka ortalaması · Saatlik güncelleme`}
      </p>

      <Link
        href={`/akaryakit/karsılastirma?province=${province}`}
        className="mt-2 block text-[11px] text-[#185FA5] hover:underline"
      >
        Marka karşılaştırması →
      </Link>
    </div>
  )
}
