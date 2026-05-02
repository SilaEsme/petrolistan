'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useFuelBrands } from '@/lib/api'
import { PROVINCES } from '@/lib/provinces'
import type { BrandPrice } from '@/types'

const NATIONAL_BRANDS = new Set(['Moil'])

function fmt(val: number) {
  return val.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function nonZero(brands: BrandPrice[], key: 'gasoline' | 'diesel' | 'lpg') {
  return brands.map((b) => b[key]).filter((v) => v > 0)
}

export default function HomeComparisonTable() {
  const [province, setProvince] = useState('34')
  const { data, isLoading }     = useFuelBrands(province)

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

  function priceClass(val: number, min: number, max: number, isNational: boolean) {
    if (isNational || val <= 0) return 'text-gray-500'
    if (val === min) return 'text-green-600 font-bold'
    if (val === max) return 'text-red-500 font-bold'
    return 'text-gray-700'
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-3">
      <div className="bg-white rounded-lg overflow-hidden">

        {/* Başlık */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Marka Karşılaştırması
          </span>
          <select
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            className="text-xs border border-gray-200 rounded px-2 py-0.5 text-gray-600 focus:outline-none focus:border-[#0C447C]"
          >
            {Object.entries(PROVINCES).map(([code, name]) => (
              <option key={code} value={code}>{name}</option>
            ))}
          </select>
        </div>

        {/* Yükleniyor */}
        {isLoading && brands.length === 0 && (
          <div>
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="flex gap-4 px-3 py-1.5 border-b border-gray-50">
                <div className="h-3 w-24 bg-gray-100 rounded animate-pulse" />
                <div className="h-3 w-16 bg-gray-100 rounded animate-pulse ml-auto" />
                <div className="h-3 w-16 bg-gray-100 rounded animate-pulse" />
                <div className="h-3 w-12 bg-gray-100 rounded animate-pulse" />
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
                <th className="px-3 py-1.5 text-right text-[10px] font-semibold text-gray-400 uppercase tracking-wider">LPG</th>
              </tr>
            </thead>
            <tbody>
              {brands.map((brand) => {
                const isNational = NATIONAL_BRANDS.has(brand.brand)
                return (
                  <tr key={brand.brand} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-3 py-1.5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-medium text-gray-800">{brand.brand}</span>
                        {isNational && (
                          <span className="text-[9px] text-gray-400 border border-gray-200 rounded px-1 py-0 leading-none">
                            ulusal
                          </span>
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
                    <td className="px-3 py-1.5 text-right tabular-nums">
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
