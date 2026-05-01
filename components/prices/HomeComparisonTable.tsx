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

function brandInitials(name: string): string {
  const words = name.trim().split(/\s+/)
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase()
  return name.slice(0, 2).toUpperCase()
}

function nonZero(brands: BrandPrice[], key: 'gasoline' | 'diesel' | 'lpg') {
  return brands.map((b) => b[key]).filter((v) => v > 0)
}

const CheckIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)
const TriangleIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 4 L4 18 L20 18 Z" />
  </svg>
)

function PriceCell({ val, isMin, isMax }: { val: number; isMin: boolean; isMax: boolean }) {
  const tdClass = [
    'py-3.5 px-4 text-right tabular-nums',
    isMin ? 'bg-[#ECFDF5]' : isMax ? 'bg-[#FEF2F2]' : '',
  ].join(' ')

  if (val <= 0) return <td className={tdClass + ' text-gray-300'}>—</td>

  const priceClass = isMin
    ? 'text-[#047857] font-semibold'
    : isMax
      ? 'text-[#B91C1C] font-semibold'
      : 'text-gray-600'

  return (
    <td className={tdClass}>
      <span className="inline-flex items-center gap-2 justify-end">
        {isMin && (
          <span className="w-[18px] h-[18px] rounded-full bg-[#10B981] text-white flex items-center justify-center flex-shrink-0">
            <CheckIcon />
          </span>
        )}
        {isMax && (
          <span className="w-[18px] h-[18px] rounded-full bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center flex-shrink-0">
            <TriangleIcon />
          </span>
        )}
        <span className={`text-[13px] ${priceClass}`}>{fmt(val)} ₺</span>
      </span>
    </td>
  )
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

  const provinceName = PROVINCES[province] ?? 'İstanbul'

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Başlık + il seçici */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-0.5">
            Marka Karşılaştırması
          </p>
          <h2 className="text-lg font-bold text-[#042C53]">{provinceName}</h2>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
            İl seç
          </label>
          <select
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            className="border border-[#0C447C]/40 rounded-md px-2 py-1 text-[12px] text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#0C447C]/30 focus:border-[#0C447C]"
          >
            {Object.entries(PROVINCES).map(([code, name]) => (
              <option key={code} value={code}>{name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Yükleniyor */}
      {isLoading && brands.length === 0 && (
        <div className="rounded-xl border border-gray-100 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex gap-4 px-4 py-4 border-t border-gray-100 first:border-0">
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
          <div className="overflow-x-auto rounded-[14px] border border-gray-200 shadow-sm">
            <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
              <colgroup>
                <col style={{ width: '34%' }} />
                <col style={{ width: '22%' }} />
                <col style={{ width: '22%' }} />
                <col style={{ width: '22%' }} />
              </colgroup>
              <thead>
                <tr className="bg-[#0C447C] text-white">
                  <th className="py-3 px-4 text-left text-[11px] font-semibold uppercase tracking-[0.06em] text-white/85">Marka</th>
                  <th className="py-3 px-4 text-right text-[11px] font-semibold uppercase tracking-[0.06em] text-white/85">Benzin 95</th>
                  <th className="py-3 px-4 text-right text-[11px] font-semibold uppercase tracking-[0.06em] text-white/85">Motorin</th>
                  <th className="py-3 px-4 text-right text-[11px] font-semibold uppercase tracking-[0.06em] text-white/85">LPG</th>
                </tr>
              </thead>
              <tbody>
                {brands.map((brand) => {
                  const isNational = NATIONAL_BRANDS.has(brand.brand)
                  return (
                    <tr key={brand.brand} className="border-t border-gray-100 hover:bg-[#ECFAF7] transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-[26px] h-[26px] rounded-md bg-gray-100 text-[#0C447C] text-[11px] font-bold flex items-center justify-center flex-shrink-0">
                            {brandInitials(brand.brand)}
                          </div>
                          <div className="flex flex-wrap items-center gap-1">
                            <span className="text-[14px] font-semibold text-[#0A1628]">{brand.brand}</span>
                            {isNational && (
                              <span className="text-[10px] font-normal text-gray-400 border border-gray-200 rounded px-1 py-0.5 leading-none">
                                ulusal fiyat
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <PriceCell val={brand.gasoline} isMin={!isNational && brand.gasoline === minG} isMax={!isNational && brand.gasoline === maxG} />
                      <PriceCell val={brand.diesel}   isMin={!isNational && brand.diesel   === minD} isMax={!isNational && brand.diesel   === maxD} />
                      <PriceCell val={brand.lpg}      isMin={!isNational && brand.lpg      === minL} isMax={!isNational && brand.lpg      === maxL} />
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-3 flex items-center justify-between text-[11px] text-gray-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-[14px] h-[14px] rounded-full bg-[#10B981] text-white flex items-center justify-center">
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                En ucuz
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-[14px] h-[14px] rounded-full bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center">
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 4 L4 18 L20 18 Z" />
                  </svg>
                </span>
                En yüksek
              </span>
            </div>
            <Link
              href={`/akaryakit/karsilastirma?province=${province}`}
              className="text-[#185FA5] hover:underline"
            >
              Tüm illeri karşılaştır →
            </Link>
          </div>
        </>
      )}
    </div>
  )
}
