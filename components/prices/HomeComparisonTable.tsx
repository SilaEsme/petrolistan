'use client'
import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { useFuelBrands } from '@/lib/api'
import { PROVINCES } from '@/lib/provinces'
import { BrandLogo } from '@/components/prices/BrandLogo'
import type { BrandPrice, BrandsResponse } from '@/types'

const NATIONAL_BRANDS = new Set(['Moil'])

function fmt(val: number) {
  return val.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function nonZero(brands: BrandPrice[], key: 'gasoline' | 'diesel' | 'lpg') {
  return brands.map((b) => b[key]).filter((v) => v > 0)
}

const GEO_PROVINCES = [
  { code: '01', lat: 37.00, lon: 35.32 },
  { code: '02', lat: 37.76, lon: 38.28 },
  { code: '03', lat: 38.75, lon: 30.54 },
  { code: '06', lat: 39.93, lon: 32.85 },
  { code: '07', lat: 36.90, lon: 30.70 },
  { code: '16', lat: 40.19, lon: 29.06 },
  { code: '21', lat: 37.91, lon: 40.24 },
  { code: '27', lat: 37.06, lon: 37.38 },
  { code: '31', lat: 36.20, lon: 36.16 },
  { code: '33', lat: 36.81, lon: 34.64 },
  { code: '34', lat: 41.01, lon: 28.97 },
  { code: '35', lat: 38.42, lon: 27.14 },
  { code: '38', lat: 38.72, lon: 35.49 },
  { code: '41', lat: 40.77, lon: 29.96 },
  { code: '42', lat: 37.87, lon: 32.49 },
  { code: '45', lat: 38.61, lon: 27.43 },
  { code: '46', lat: 37.58, lon: 36.92 },
  { code: '48', lat: 37.21, lon: 28.36 },
  { code: '54', lat: 40.69, lon: 30.43 },
  { code: '55', lat: 41.29, lon: 36.33 },
  { code: '59', lat: 40.98, lon: 27.51 },
  { code: '61', lat: 40.99, lon: 39.73 },
  { code: '63', lat: 37.16, lon: 38.79 },
  { code: '65', lat: 38.49, lon: 43.41 },
  { code: '67', lat: 41.45, lon: 31.79 },
]

function findNearestProvince(lat: number, lon: number): string {
  let nearest = '34'
  let minDist = Infinity
  for (const p of GEO_PROVINCES) {
    const dist = Math.sqrt(Math.pow(lat - p.lat, 2) + Math.pow(lon - p.lon, 2))
    if (dist < minDist) { minDist = dist; nearest = p.code }
  }
  return nearest
}

function HeroPriceSkeleton() {
  return (
    <div className="grid grid-cols-3">
      {[0, 1, 2].map((i) => (
        <div key={i} className={`bg-white dark:bg-[#0F1829] px-5 py-6 ${i < 2 ? 'border-r border-gray-100 dark:border-gray-800' : ''}`}>
          <div className="h-2.5 w-16 bg-gray-100 dark:bg-gray-800 rounded animate-pulse mb-4" />
          <div className="h-10 w-28 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-3" />
          <div className="h-4 w-20 bg-gray-100 dark:bg-gray-800 rounded animate-pulse mb-3" />
          <div className="h-5 w-14 bg-gray-100 dark:bg-gray-800 rounded-full animate-pulse" />
        </div>
      ))}
    </div>
  )
}

function TableSkeleton() {
  return (
    <div>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex gap-4 px-5 py-3 border-b border-gray-50 dark:border-gray-800/50">
          <div className="h-3 w-24 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
          <div className="h-3 w-16 bg-gray-100 dark:bg-gray-800 rounded animate-pulse ml-auto" />
          <div className="h-3 w-16 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
          <div className="hidden sm:block h-3 w-12 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
          <div className="hidden sm:block h-3 w-8 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
        </div>
      ))}
    </div>
  )
}

export default function HomeComparisonTable({ initialData }: { initialData?: BrandsResponse }) {
  const [province, setProvince] = useState('34')
  const [locating, setLocating] = useState(true)
  const { data, isLoading, isError } = useFuelBrands(province, initialData)

  useEffect(() => {
    if (!navigator.geolocation) { setLocating(false); return }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const nearest = findNearestProvince(pos.coords.latitude, pos.coords.longitude)
        setProvince(nearest)
        setLocating(false)
      },
      () => setLocating(false),
      { timeout: 5000 },
    )
  }, [])

  const brands = data?.data ?? []
  const eligibleBrands = brands.filter((b) => b.brand !== 'Moil')

  const gasolineVals = nonZero(eligibleBrands, 'gasoline')
  const dieselVals = nonZero(eligibleBrands, 'diesel')
  const lpgVals = nonZero(eligibleBrands, 'lpg')

  const minG = gasolineVals.length ? Math.min(...gasolineVals) : 0
  const maxG = gasolineVals.length ? Math.max(...gasolineVals) : 0
  const minD = dieselVals.length ? Math.min(...dieselVals) : 0
  const maxD = dieselVals.length ? Math.max(...dieselVals) : 0
  const minL = lpgVals.length ? Math.min(...lpgVals) : 0
  const maxL = lpgVals.length ? Math.max(...lpgVals) : 0

  const cheapestG = useMemo(
    () => eligibleBrands.filter((b) => b.gasoline > 0).sort((a, b) => a.gasoline - b.gasoline)[0],
    [eligibleBrands]
  )
  const cheapestD = useMemo(
    () => eligibleBrands.filter((b) => b.diesel > 0).sort((a, b) => a.diesel - b.diesel)[0],
    [eligibleBrands]
  )
  const cheapestL = useMemo(
    () => eligibleBrands.filter((b) => b.lpg > 0).sort((a, b) => a.lpg - b.lpg)[0],
    [eligibleBrands]
  )
  const priceyG = useMemo(
    () => eligibleBrands.filter((b) => b.gasoline > 0).sort((a, b) => b.gasoline - a.gasoline)[0],
    [eligibleBrands]
  )

  const savingsG50 = maxG > minG ? Math.round((maxG - minG) * 50) : 0

  function priceClass(val: number, min: number, max: number, isNational: boolean) {
    if (isNational || val <= 0) return 'text-gray-400 dark:text-gray-600'
    if (val === min) return 'text-green-600 dark:text-green-400 font-semibold'
    if (val === max) return 'text-red-500 dark:text-red-400 font-semibold'
    return 'text-gray-700 dark:text-gray-300'
  }

  function diffLabel(val: number, min: number) {
    if (val <= 0 || val === min) return null
    const diff = val - min
    return `+${fmt(diff)}`
  }

  const showData = brands.length > 0

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-4 py-3">
      <div className="bg-white dark:bg-[#0F1829] rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800/60 shadow-sm">

        {/* Header bar — province selector */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800/60">
          <div>
            <h1 className="text-base font-semibold text-[#042C53] dark:text-white leading-tight">Güncel Akaryakıt Fiyatları</h1>
            <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">Marka bazlı, saatlik güncelleme</p>
          </div>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <svg className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <select
              value={locating ? '' : province}
              onChange={(e) => setProvince(e.target.value)}
              disabled={locating}
              className="text-[13px] font-medium text-[#0C447C] dark:text-[#5B9BD5] bg-transparent border-none focus:outline-none cursor-pointer disabled:text-gray-400 pr-1"
            >
              {locating && <option value="">Konum alınıyor…</option>}
              {Object.entries(PROVINCES).map(([code, name]) => (
                <option key={code} value={code} className="text-gray-900 dark:text-gray-100 bg-white dark:bg-[#0F1829]">{name}</option>
              ))}
            </select>
          </label>
        </div>

        {/* Hero price cards */}
        {isLoading && !showData ? (
          <HeroPriceSkeleton />
        ) : isError ? (
          <div className="grid grid-cols-3">
            <div className="col-span-3 px-5 py-8 text-center text-sm text-gray-400 dark:text-gray-600">
              Fiyat verileri şu an yüklenemiyor. Lütfen sayfayı yenileyin.
            </div>
          </div>
        ) : cheapestG ? (
          <div className="grid grid-cols-3">
            {/* Benzin 95 */}
            <div className="bg-white dark:bg-[#0F1829] px-5 py-6 border-r border-gray-100 dark:border-gray-800">
              <p className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">Benzin 95</p>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl sm:text-5xl font-semibold text-[#042C53] dark:text-white tabular-nums leading-none">
                  {fmt(minG)}
                </span>
                <span className="text-sm text-gray-400 dark:text-gray-500">₺/L</span>
              </div>
              <p className="text-sm font-semibold text-[#0C447C] dark:text-[#5B9BD5] mb-3 truncate">{cheapestG.brand}</p>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/60 px-2 py-0.5 rounded-full">
                <span>●</span> En ucuz
              </span>
            </div>

            {/* Motorin */}
            <div className="bg-white dark:bg-[#0F1829] px-5 py-6 border-r border-gray-100 dark:border-gray-800">
              <p className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">Motorin</p>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl sm:text-5xl font-semibold text-[#042C53] dark:text-white tabular-nums leading-none">
                  {cheapestD ? fmt(minD) : '—'}
                </span>
                {cheapestD && <span className="text-sm text-gray-400 dark:text-gray-500">₺/L</span>}
              </div>
              {cheapestD && (
                <p className="text-sm font-semibold text-[#0C447C] dark:text-[#5B9BD5] mb-3 truncate">{cheapestD.brand}</p>
              )}
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/60 px-2 py-0.5 rounded-full">
                <span>●</span> En ucuz
              </span>
            </div>

            {/* LPG */}
            <div className="bg-white dark:bg-[#0F1829] px-5 py-6">
              <p className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">LPG</p>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl sm:text-5xl font-semibold text-[#042C53] dark:text-white tabular-nums leading-none">
                  {cheapestL ? fmt(minL) : '—'}
                </span>
                {cheapestL && <span className="text-sm text-gray-400 dark:text-gray-500">₺/L</span>}
              </div>
              {cheapestL && (
                <p className="text-sm font-semibold text-[#0C447C] dark:text-[#5B9BD5] mb-3 truncate">{cheapestL.brand}</p>
              )}
              {cheapestL ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/60 px-2 py-0.5 rounded-full">
                  <span>●</span> En ucuz
                </span>
              ) : (
                <span className="text-[11px] text-gray-300 dark:text-gray-700">Bu ilde yok</span>
              )}
            </div>
          </div>
        ) : null}

        {/* Savings banner */}
        {savingsG50 > 0 && priceyG && cheapestG && (
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-[#1A1200] dark:to-[#1A0E00] border-t border-amber-100 dark:border-amber-900/30 px-5 py-2.5 flex items-center gap-2.5">
            <svg className="w-4 h-4 text-[#633806] dark:text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-[12px] text-[#412402] dark:text-amber-200/80 leading-snug">
              <span className="font-semibold">{cheapestG.brand}</span> yerine{' '}
              <span className="font-semibold">{priceyG.brand}</span>&apos;nden alsan 50 litrene{' '}
              <span className="font-bold text-[#633806] dark:text-amber-400">{savingsG50} ₺ fazla</span> öderdin
              <span className="text-[#854F0B] dark:text-amber-500/70 ml-1">— en ucuz markayı seç</span>
            </p>
          </div>
        )}

        {/* Table */}
        {isLoading && !showData ? (
          <TableSkeleton />
        ) : isError ? null : showData ? (
          <table className="w-full" style={{ borderCollapse: 'collapse' }}>
            <colgroup>
              <col style={{ width: '36%' }} />
              <col style={{ width: '20%' }} />
              <col style={{ width: '20%' }} />
              <col style={{ width: '13%' }} />
              <col style={{ width: '11%' }} />
            </colgroup>
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800/60">
                <th className="px-5 py-2.5 text-left text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Marka</th>
                <th className="px-3 py-2.5 text-right text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Benzin 95</th>
                <th className="px-3 py-2.5 text-right text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Motorin</th>
                <th className="hidden sm:table-cell px-3 py-2.5 text-right text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">LPG</th>
                <th className="hidden sm:table-cell px-5 py-2.5 text-right text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Fark</th>
              </tr>
            </thead>
            <tbody>
              {brands.map((brand) => {
                const isNational = NATIONAL_BRANDS.has(brand.brand)
                const diff = diffLabel(brand.gasoline, minG)
                const isCheapestG = !isNational && brand.gasoline > 0 && brand.gasoline === minG
                return (
                  <tr
                    key={brand.brand}
                    className={`border-b border-gray-50 dark:border-gray-800/40 transition-colors hover:bg-gray-50/60 dark:hover:bg-white/[0.03] ${
                      isCheapestG ? 'border-l-2 border-l-green-400 dark:border-l-green-600' : ''
                    }`}
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <BrandLogo name={brand.brand} size={20} />
                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{brand.brand}</span>
                        {isNational && (
                          <span className="text-[9px] text-gray-400 dark:text-gray-600 border border-gray-200 dark:border-gray-700 rounded px-1 leading-none">ulusal</span>
                        )}
                        {brand.brand === 'Total' && brand.gasoline === 0 && (
                          <span className="text-[9px] text-gray-400 dark:text-gray-600">bu ilde yok</span>
                        )}
                      </div>
                    </td>
                    <td className="px-3 py-3 text-right tabular-nums">
                      {brand.gasoline > 0
                        ? <span className={`text-[13px] ${priceClass(brand.gasoline, minG, maxG, isNational)}`}>{fmt(brand.gasoline)} ₺</span>
                        : <span className="text-gray-200 dark:text-gray-700 text-xs">—</span>}
                    </td>
                    <td className="px-3 py-3 text-right tabular-nums">
                      {brand.diesel > 0
                        ? <span className={`text-[13px] ${priceClass(brand.diesel, minD, maxD, isNational)}`}>{fmt(brand.diesel)} ₺</span>
                        : <span className="text-gray-200 dark:text-gray-700 text-xs">—</span>}
                    </td>
                    <td className="hidden sm:table-cell px-3 py-3 text-right tabular-nums">
                      {brand.lpg > 0
                        ? <span className={`text-[13px] ${priceClass(brand.lpg, minL, maxL, isNational)}`}>{fmt(brand.lpg)} ₺</span>
                        : <span className="text-gray-200 dark:text-gray-700 text-xs">—</span>}
                    </td>
                    <td className="hidden sm:table-cell px-5 py-3 text-right">
                      {!isNational && diff ? (
                        <span className="text-[11px] text-red-400 dark:text-red-500 tabular-nums">{diff}</span>
                      ) : !isNational && brand.gasoline === minG && minG > 0 ? (
                        <span className="text-[11px] text-green-600 dark:text-green-400 font-semibold">—</span>
                      ) : (
                        <span className="text-gray-200 dark:text-gray-700 text-[11px]">—</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        ) : null}

        {/* Footer */}
        <div className="px-5 py-2.5 flex items-center justify-between border-t border-gray-100 dark:border-gray-800/60">
          <div className="flex items-center gap-4 text-[10px] text-gray-400 dark:text-gray-600">
            <span className="text-green-600 dark:text-green-500">● En ucuz</span>
            <span className="text-red-400 dark:text-red-500">● En pahalı</span>
            <span className="hidden sm:inline text-gray-300 dark:text-gray-700">Fark: benzin 95 için en ucuzdan ₺ fark</span>
          </div>
          <Link
            href={`/akaryakit/karsilastirma?province=${province}`}
            className="text-[11px] text-[#0C447C] dark:text-[#5B9BD5] hover:underline whitespace-nowrap"
          >
            Tüm iller →
          </Link>
        </div>

      </div>
    </div>
  )
}
