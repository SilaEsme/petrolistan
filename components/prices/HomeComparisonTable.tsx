'use client'
import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { useFuelBrands } from '@/lib/api'
import { PROVINCES } from '@/lib/provinces'
import { BrandLogo } from '@/components/prices/BrandLogo'
import type { BrandPrice } from '@/types'

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

export default function HomeComparisonTable() {
  const [province,  setProvince]  = useState('34')
  const [locating,  setLocating]  = useState(true)
  const { data, isLoading }       = useFuelBrands(province)

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

  const brands         = data?.data ?? []
  const eligibleBrands = brands.filter((b) => b.brand !== 'Moil')

  const gasolineVals = nonZero(eligibleBrands, 'gasoline')
  const dieselVals   = nonZero(eligibleBrands, 'diesel')
  const lpgVals      = nonZero(eligibleBrands, 'lpg')

  const minG = gasolineVals.length ? Math.min(...gasolineVals) : 0
  const maxG = gasolineVals.length ? Math.max(...gasolineVals) : 0
  const minD = dieselVals.length   ? Math.min(...dieselVals)   : 0
  const maxD = dieselVals.length   ? Math.max(...dieselVals)   : 0
  const minL = lpgVals.length      ? Math.min(...lpgVals)      : 0
  const maxL = lpgVals.length      ? Math.max(...lpgVals)      : 0

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

  function priceClass(val: number, min: number, max: number, isNational: boolean) {
    if (isNational || val <= 0) return 'text-gray-500'
    if (val === min) return 'text-green-600 font-bold'
    if (val === max) return 'text-red-500 font-bold'
    return 'text-gray-700'
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-3">
      <div className="bg-white rounded-lg overflow-hidden">

        {/* Hero başlık */}
        <div className="bg-[#0C447C] px-4 pt-3 pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h1 className="text-white font-bold text-base leading-tight">
                Güncel Akaryakıt Fiyatları
              </h1>
              {/* En ucuz özet */}
              {!isLoading && cheapestG ? (
                <>
                  <p className="text-white/70 text-[12px] mt-0.5 leading-snug">
                    {PROVINCES[province]} · En ucuz benzin:{' '}
                    <span className="text-[#BA7517] font-semibold">{cheapestG.brand}</span>{' '}
                    <span className="text-white/80">{cheapestG.gasoline.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺</span>
                    {cheapestD && (
                      <>
                        {' '}· Motorin:{' '}
                        <span className="text-[#BA7517] font-semibold">{cheapestD.brand}</span>{' '}
                        <span className="text-white/80">{cheapestD.diesel.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺</span>
                      </>
                    )}
                  </p>
                  {maxG > minG && (
                    <p className="text-[#BA7517] font-semibold text-[12px] mt-1">
                      50L&apos;de{' '}
                      {((maxG - minG) * 50).toLocaleString('tr-TR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} ₺
                      {' '}tasarruf edebilirsin — en ucuz markayı seç
                    </p>
                  )}
                </>
              ) : (
                <div className="h-3 w-48 bg-white/20 rounded animate-pulse mt-1" />
              )}
            </div>
            <select
              value={locating ? '' : province}
              onChange={(e) => setProvince(e.target.value)}
              disabled={locating}
              className="text-xs border border-white/30 rounded px-2 py-1 text-white bg-white/10 focus:outline-none focus:ring-1 focus:ring-white/50 disabled:text-white/40 flex-shrink-0"
            >
              {locating && <option value="">Konum alınıyor...</option>}
              {Object.entries(PROVINCES).map(([code, name]) => (
                <option key={code} value={code} className="text-gray-900 bg-white">{name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* En ucuz fiyat kartları */}
        {isLoading && brands.length === 0 ? (
          <div className="grid grid-cols-3 gap-2 px-3 pt-3 pb-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-gray-100 p-3 flex flex-col gap-1.5 animate-pulse">
                <div className="h-2.5 w-14 bg-gray-100 rounded" />
                <div className="h-6 w-20 bg-gray-200 rounded" />
                <div className="h-2.5 w-12 bg-gray-100 rounded" />
              </div>
            ))}
          </div>
        ) : cheapestG ? (
          <div className="grid grid-cols-3 gap-2 px-3 pt-3 pb-2">
            {/* Benzin 95 */}
            <div className="rounded-xl border border-gray-100 bg-gray-50/60 p-3">
              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Benzin 95</p>
              <p className="text-xl font-bold text-[#042C53] tabular-nums mt-1 leading-none">
                {fmt(minG)} ₺
              </p>
              <p className="text-[11px] text-[#BA7517] font-semibold mt-1 truncate">{cheapestG.brand}</p>
            </div>
            {/* Motorin */}
            {cheapestD && (
              <div className="rounded-xl border border-gray-100 bg-gray-50/60 p-3">
                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Motorin</p>
                <p className="text-xl font-bold text-[#042C53] tabular-nums mt-1 leading-none">
                  {fmt(minD)} ₺
                </p>
                <p className="text-[11px] text-[#BA7517] font-semibold mt-1 truncate">{cheapestD.brand}</p>
              </div>
            )}
            {/* LPG */}
            {cheapestL && (
              <div className="rounded-xl border border-gray-100 bg-gray-50/60 p-3">
                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">LPG</p>
                <p className="text-xl font-bold text-[#042C53] tabular-nums mt-1 leading-none">
                  {fmt(minL)} ₺
                </p>
                <p className="text-[11px] text-[#BA7517] font-semibold mt-1 truncate">{cheapestL.brand}</p>
              </div>
            )}
          </div>
        ) : null}

        {/* Yükleniyor */}
        {isLoading && brands.length === 0 && (
          <div>
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="flex gap-4 px-3 py-1.5 border-b border-gray-50">
                <div className="h-3 w-24 bg-gray-100 rounded animate-pulse" />
                <div className="h-3 w-16 bg-gray-100 rounded animate-pulse ml-auto" />
                <div className="h-3 w-16 bg-gray-100 rounded animate-pulse" />
                <div className="hidden md:block h-3 w-12 bg-gray-100 rounded animate-pulse" />
              </div>
            ))}
          </div>
        )}

        {/* Tablo */}
        {brands.length > 0 && (
          <table className="w-full" style={{ borderCollapse: 'collapse' }}>
            <colgroup>
              <col style={{ width: '34%' }} />
              <col style={{ width: '22%' }} />
              <col style={{ width: '22%' }} />
              <col style={{ width: '22%' }} />
            </colgroup>
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-3 py-1.5 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Marka</th>
                <th className="px-3 py-1.5 text-right text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Benzin 95</th>
                <th className="px-3 py-1.5 text-right text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Motorin</th>
                <th className="hidden md:table-cell px-3 py-1.5 text-right text-[10px] font-semibold text-gray-400 uppercase tracking-wider">LPG</th>
              </tr>
            </thead>
            <tbody>
              {brands.map((brand) => {
                const isNational = NATIONAL_BRANDS.has(brand.brand)
                return (
                  <tr key={brand.brand} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-3 py-1.5">
                      <div className="flex items-center gap-2">
                        <BrandLogo name={brand.brand} size={22} />
                        <span className="text-sm font-medium text-gray-800">{brand.brand}</span>
                        {isNational && (
                          <span className="text-[9px] text-gray-400 border border-gray-200 rounded px-1 py-0 leading-none">
                            ulusal
                          </span>
                        )}
                        {brand.brand === 'Total' && brand.gasoline === 0 && (
                          <span className="text-[9px] text-gray-400">bu ilde yok</span>
                        )}
                      </div>
                    </td>
                    <td className="px-3 py-1.5 text-right tabular-nums">
                      {brand.gasoline > 0
                        ? <span className={`text-sm ${priceClass(brand.gasoline, minG, maxG, isNational)}`}>{fmt(brand.gasoline)} ₺</span>
                        : <span className="text-gray-300 text-xs">—</span>}
                    </td>
                    <td className="px-3 py-1.5 text-right tabular-nums">
                      {brand.diesel > 0
                        ? <span className={`text-sm ${priceClass(brand.diesel, minD, maxD, isNational)}`}>{fmt(brand.diesel)} ₺</span>
                        : <span className="text-gray-300 text-xs">—</span>}
                    </td>
                    <td className="hidden md:table-cell px-3 py-1.5 text-right tabular-nums">
                      {brand.lpg > 0
                        ? <span className={`text-sm ${priceClass(brand.lpg, minL, maxL, isNational)}`}>{fmt(brand.lpg)} ₺</span>
                        : <span className="text-gray-300 text-xs">—</span>}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}

        {/* Alt bilgi */}
        <div className="px-3 py-1.5 flex items-center justify-between border-t border-gray-100">
          <div className="flex items-center gap-3 text-[10px] text-gray-400">
            <span className="text-green-600">● En ucuz</span>
            <span className="text-red-400">● En yüksek</span>
          </div>
          <Link
            href={`/akaryakit/karsilastirma?province=${province}`}
            className="text-[11px] text-[#0C447C] hover:underline"
          >
            Tüm illeri →
          </Link>
        </div>

      </div>
    </div>
  )
}
