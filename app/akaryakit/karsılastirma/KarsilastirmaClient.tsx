'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useFuelBrands } from '@/lib/api'
import { PROVINCES } from '@/lib/provinces'
import type { BrandPrice, BrandsResponse } from '@/types'

// Bu markalar il parametresini desteklemiyor — ulusal fiyat gösterir
const NATIONAL_BRANDS = new Set(['Petrol Ofisi', 'Aytemiz', 'Lukoil', 'Moil'])

function fmt(val: number) {
  return val.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function colorClass(val: number, min: number, max: number): string {
  if (val <= 0) return ''
  if (val === min) return 'text-[#3B6D11] font-semibold'
  if (val === max) return 'text-[#A32D2D] font-semibold'
  return ''
}

function nonZero(brands: BrandPrice[], key: 'gasoline' | 'diesel' | 'lpg') {
  return brands.map((b) => b[key]).filter((v) => v > 0)
}

export default function KarsilastirmaClient({
  initialData,
}: {
  initialData: BrandsResponse | null
}) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const province = searchParams.get('province') ?? '34'
  const provinceName = PROVINCES[province] ?? 'Türkiye'

  const { data, isLoading } = useFuelBrands(
    province,
    initialData ?? undefined
  )

  function handleProvinceChange(e: React.ChangeEvent<HTMLSelectElement>) {
    router.push(`/akaryakit/karsılastirma?province=${e.target.value}`, { scroll: false })
  }

  const brands = data?.data ?? []

  const gasolineVals = nonZero(brands, 'gasoline')
  const dieselVals   = nonZero(brands, 'diesel')
  const lpgVals      = nonZero(brands, 'lpg')

  const minG = gasolineVals.length ? Math.min(...gasolineVals) : 0
  const maxG = gasolineVals.length ? Math.max(...gasolineVals) : 0
  const minD = dieselVals.length   ? Math.min(...dieselVals)   : 0
  const maxD = dieselVals.length   ? Math.max(...dieselVals)   : 0
  const minL = lpgVals.length      ? Math.min(...lpgVals)      : 0
  const maxL = lpgVals.length      ? Math.max(...lpgVals)      : 0

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Başlık + İl seçici */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#0C447C]">
            {provinceName} — Marka Karşılaştırması
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            OPET, Shell, Petrol Ofisi, Aytemiz, Lukoil, Moil güncel pompa fiyatları
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="province-select" className="text-xs text-gray-400 font-medium uppercase tracking-wide">
            İl seç
          </label>
          <select
            id="province-select"
            value={province}
            onChange={handleProvinceChange}
            className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#0C447C]/30 focus:border-[#0C447C]"
          >
            {Object.entries(PROVINCES).map(([code, name]) => (
              <option key={code} value={code}>
                {code} — {name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Yükleniyor */}
      {isLoading && brands.length === 0 && (
        <div className="rounded-xl border border-gray-100 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={`flex gap-4 px-4 py-4 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-20 bg-gray-100 rounded animate-pulse ml-auto" />
              <div className="h-4 w-20 bg-gray-100 rounded animate-pulse" />
              <div className="h-4 w-16 bg-gray-100 rounded animate-pulse" />
            </div>
          ))}
        </div>
      )}

      {/* Tablo */}
      {brands.length > 0 && (
        <>
          <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#0C447C] text-white">
                  <th className="py-3 px-4 text-left font-medium">Marka</th>
                  <th className="py-3 px-4 text-right font-medium">Benzin 95</th>
                  <th className="py-3 px-4 text-right font-medium">Motorin</th>
                  <th className="py-3 px-4 text-right font-medium">LPG</th>
                  <th className="py-3 px-4 text-right font-medium hidden sm:table-cell">Son Güncelleme</th>
                </tr>
              </thead>
              <tbody>
                {brands.map((brand, i) => {
                  const isNational = NATIONAL_BRANDS.has(brand.brand)
                  const updatedAt = brand.updatedAt
                    ? new Date(brand.updatedAt).toLocaleString('tr-TR', {
                        day: '2-digit',
                        month: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : '—'

                  return (
                    <tr
                      key={brand.brand}
                      className={`border-t border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-amber-50 transition-colors`}
                    >
                      <td className="py-3 px-4 font-medium text-gray-800">
                        <span>{brand.brand}</span>
                        {isNational && (
                          <span className="ml-2 text-[10px] font-normal text-gray-400 border border-gray-200 rounded px-1 py-0.5 leading-none">
                            ulusal fiyat
                          </span>
                        )}
                        {brand.error && (
                          <span className="ml-2 text-xs text-gray-400" title={brand.error}>
                            ⚠
                          </span>
                        )}
                      </td>
                      <td className={`py-3 px-4 text-right tabular-nums ${colorClass(brand.gasoline, minG, maxG)}`}>
                        {brand.gasoline > 0 ? `${fmt(brand.gasoline)} ₺` : '—'}
                      </td>
                      <td className={`py-3 px-4 text-right tabular-nums ${colorClass(brand.diesel, minD, maxD)}`}>
                        {brand.diesel > 0 ? `${fmt(brand.diesel)} ₺` : '—'}
                      </td>
                      <td className={`py-3 px-4 text-right tabular-nums ${colorClass(brand.lpg, minL, maxL)}`}>
                        {brand.lpg > 0 ? `${fmt(brand.lpg)} ₺` : '—'}
                      </td>
                      <td className="py-3 px-4 text-right text-gray-400 hidden sm:table-cell text-xs">
                        {updatedAt}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-3 rounded-sm bg-[#3B6D11]" />
              En ucuz
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-3 rounded-sm bg-[#A32D2D]" />
              En pahalı
            </span>
            <span className="flex items-center gap-1.5 text-gray-400">
              <span className="border border-gray-300 rounded px-1 text-[10px]">ulusal fiyat</span>
              İl bazlı fiyat verisi olmayan markalar
            </span>
            {data?.cached && data.cachedAt && (
              <span className="ml-auto">
                Önbellekten •{' '}
                {new Date(data.cachedAt).toLocaleString('tr-TR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            )}
          </div>
        </>
      )}
    </div>
  )
}
