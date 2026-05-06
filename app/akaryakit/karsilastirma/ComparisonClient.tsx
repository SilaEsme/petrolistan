'use client'

import { memo, useMemo } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useFuelBrands } from '@/lib/api'
import { PROVINCES, provinceCodeToSlug } from '@/lib/provinces'
import { BrandLogo } from '@/components/prices/BrandLogo'
import type { BrandPrice, BrandsResponse } from '@/types'

const NATIONAL_BRANDS = new Set(['Moil'])

function fmt(val: number) {
  return val.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function nonZero(brands: BrandPrice[], key: 'gasoline' | 'diesel' | 'lpg') {
  return brands.map((b) => b[key]).filter((v) => v > 0)
}


interface PriceCellProps {
  val: number
  isMin: boolean
  isMax: boolean
  hidden?: boolean
}
function PriceCellInner({ val, isMin, isMax, hidden }: PriceCellProps) {
  const tdClass = [
    'py-2.5 sm:py-3.5 px-2 sm:px-4 text-right tabular-nums',
    hidden ? 'hidden sm:table-cell' : '',
  ].join(' ')

  if (val <= 0) {
    return <td className={tdClass + ' text-gray-300'}>—</td>
  }

  const priceClass = isMin
    ? 'text-[#047857] font-bold'
    : isMax
      ? 'text-[#B91C1C]'
      : 'text-gray-600'

  return (
    <td className={tdClass}>
      <span className={`text-xs sm:text-[13px] ${priceClass}`}>{fmt(val)} ₺</span>
    </td>
  )
}
const PriceCell = memo(PriceCellInner)

export default function ComparisonClient({
  initialData,
  initialProvince,
}: {
  initialData: BrandsResponse | null
  initialProvince?: string
}) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const province     = initialProvince ?? searchParams.get('province') ?? '34'
  const provinceName = PROVINCES[province] ?? 'Türkiye'

  const { data, isLoading } = useFuelBrands(province, initialData ?? undefined)

  function handleProvinceChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const code = parseInt(e.target.value)
    const slug = provinceCodeToSlug[code]
    if (slug) {
      router.push(`/akaryakit/karsilastirma/${slug}`, { scroll: false })
    } else {
      router.push(`/akaryakit/karsilastirma?province=${e.target.value}`, { scroll: false })
    }
  }

  const brands          = data?.data ?? []

  const stats = useMemo(() => {
    const eligibleBrands = brands.filter((b: BrandPrice) => b.brand !== 'Moil')

    const gasolineVals = nonZero(eligibleBrands, 'gasoline')
    const dieselVals   = nonZero(eligibleBrands, 'diesel')
    const lpgVals      = nonZero(eligibleBrands, 'lpg')

    return {
      minG: gasolineVals.length ? Math.min(...gasolineVals) : 0,
      maxG: gasolineVals.length ? Math.max(...gasolineVals) : 0,
      minD: dieselVals.length   ? Math.min(...dieselVals)   : 0,
      maxD: dieselVals.length   ? Math.max(...dieselVals)   : 0,
      minL: lpgVals.length      ? Math.min(...lpgVals)      : 0,
      maxL: lpgVals.length      ? Math.max(...lpgVals)      : 0,
      cheapestGasoline:  eligibleBrands.filter((b: BrandPrice) => b.gasoline > 0).sort((a: BrandPrice, b: BrandPrice) => a.gasoline - b.gasoline)[0],
      cheapestDiesel:    eligibleBrands.filter((b: BrandPrice) => b.diesel   > 0).sort((a: BrandPrice, b: BrandPrice) => a.diesel   - b.diesel  )[0],
      cheapestLpg:       eligibleBrands.filter((b: BrandPrice) => b.lpg      > 0).sort((a: BrandPrice, b: BrandPrice) => a.lpg      - b.lpg     )[0],
      expensiveGasoline: eligibleBrands.filter((b: BrandPrice) => b.gasoline > 0).sort((a: BrandPrice, b: BrandPrice) => b.gasoline - a.gasoline)[0],
      expensiveDiesel:   eligibleBrands.filter((b: BrandPrice) => b.diesel   > 0).sort((a: BrandPrice, b: BrandPrice) => b.diesel   - a.diesel  )[0],
    }
  }, [brands])

  const { minG, maxG, minD, maxD, minL, maxL, cheapestGasoline, cheapestDiesel, cheapestLpg, expensiveGasoline, expensiveDiesel } = stats

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-10">

      {/* Başlık + İl seçici */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-1">Akaryakıt</p>
          <h1 className="text-2xl font-bold text-[#042C53] tracking-tight">
            {provinceName} — Marka Karşılaştırması
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            EPDK ve marka kaynaklarından toplanan güncel pompa fiyatları
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="province-select" className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
            İl seç
          </label>
          <select
            id="province-select"
            value={province}
            onChange={handleProvinceChange}
            className="border border-[#0C447C]/40 rounded-md px-3 py-1.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#0C447C]/30 focus:border-[#0C447C]"
          >
            {Object.entries(PROVINCES).map(([code, name]) => (
              <option key={code} value={code}>{code} — {name}</option>
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

      {/* En Uygun Fiyat — 3 kart */}
      {brands.length > 0 && cheapestGasoline && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          {/* Benzin */}
          <div className="bg-[#042C53] text-white rounded-xl p-4 border-l-4 border-[#BA7517]">
            <p className="text-[10px] text-white/50 uppercase tracking-widest font-medium mb-2">Benzin 95</p>
            <p className="text-base font-bold text-[#BA7517] leading-tight">{cheapestGasoline.brand}</p>
            <p className="text-xl font-bold mt-0.5">{fmt(cheapestGasoline.gasoline)} ₺/L</p>
            {expensiveGasoline && expensiveGasoline.brand !== cheapestGasoline.brand && (
              <p className="text-[11px] text-white/50 mt-1">
                {fmt(expensiveGasoline.gasoline - cheapestGasoline.gasoline)} ₺ daha ucuz
              </p>
            )}
          </div>
          {/* Motorin */}
          {cheapestDiesel && (
            <div className="bg-[#042C53] text-white rounded-xl p-4 border-l-4 border-[#185FA5]">
              <p className="text-[10px] text-white/50 uppercase tracking-widest font-medium mb-2">Motorin</p>
              <p className="text-base font-bold text-[#BA7517] leading-tight">{cheapestDiesel.brand}</p>
              <p className="text-xl font-bold mt-0.5">{fmt(cheapestDiesel.diesel)} ₺/L</p>
              {expensiveDiesel && expensiveDiesel.brand !== cheapestDiesel.brand && (
                <p className="text-[11px] text-white/50 mt-1">
                  {fmt(expensiveDiesel.diesel - cheapestDiesel.diesel)} ₺ daha ucuz
                </p>
              )}
            </div>
          )}
          {/* LPG */}
          {cheapestLpg && (
            <div className="bg-[#042C53] text-white rounded-xl p-4 border-l-4 border-[#0E7C7B]">
              <p className="text-[10px] text-white/50 uppercase tracking-widest font-medium mb-2">LPG Otogaz</p>
              <p className="text-base font-bold text-[#BA7517] leading-tight">{cheapestLpg.brand}</p>
              <p className="text-xl font-bold mt-0.5">{fmt(cheapestLpg.lpg)} ₺/L</p>
            </div>
          )}
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
                  <th className="py-3 px-4 text-left text-[11px] font-semibold uppercase tracking-[0.06em] text-white/85">
                    Marka
                  </th>
                  <th className="py-3 px-4 text-right text-[11px] font-semibold uppercase tracking-[0.06em] text-white/85">
                    Benzin 95
                  </th>
                  <th className="py-3 px-4 text-right text-[11px] font-semibold uppercase tracking-[0.06em] text-white/85">
                    Motorin
                  </th>
                  <th className="py-3 px-4 text-right text-[11px] font-semibold uppercase tracking-[0.06em] text-white/85">
                    LPG
                  </th>
                </tr>
              </thead>
              <tbody>
                {brands.map((brand) => {
                  const isNational = NATIONAL_BRANDS.has(brand.brand)
                  return (
                    <tr
                      key={brand.brand}
                      className="border-t border-gray-100 hover:bg-[#ECFAF7] transition-colors"
                    >
                      {/* Marka hücresi */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="hidden sm:flex flex-shrink-0">
                            <BrandLogo name={brand.brand} />
                          </div>
                          <div className="flex flex-wrap items-center gap-1">
                            <span className="text-xs sm:text-[14px] font-semibold text-[#0A1628]">{brand.brand}</span>
                            {isNational && (
                              <span className="text-[10px] font-normal text-gray-400 border border-gray-200 rounded px-1 py-0.5 leading-none">
                                ulusal fiyat
                              </span>
                            )}
                            {brand.brand === 'Total' && brand.gasoline === 0 && (
                              <span className="text-[10px] text-gray-400">bu ilde yok</span>
                            )}
                            {brand.error && brand.brand !== 'Total' && (
                              <span className="text-xs text-gray-400" title={brand.error}>⚠</span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Fiyat hücreleri */}
                      <PriceCell val={brand.gasoline} isMin={!isNational && brand.gasoline === minG} isMax={!isNational && brand.gasoline === maxG} />
                      <PriceCell val={brand.diesel}   isMin={!isNational && brand.diesel   === minD} isMax={!isNational && brand.diesel   === maxD} />
                      <PriceCell val={brand.lpg}      isMin={!isNational && brand.lpg      === minL} isMax={!isNational && brand.lpg      === maxL} />
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Legend */}
          <div className="mt-3.5 flex flex-wrap items-center gap-4 text-[11px] text-gray-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#047857]" />
              <span className="text-[#047857]">En ucuz</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#B91C1C]" />
              <span className="text-[#B91C1C]">En yüksek</span>
            </span>
            <span className="text-gray-400">·</span>
            <span className="text-gray-400">Sütun bazında karşılaştırma</span>
            {data?.cached && data.cachedAt && (
              <span className="ml-auto text-gray-400">
                Önbellekten ·{' '}
                {new Date(data.cachedAt).toLocaleString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
              </span>
            )}
          </div>

          {/* SSS */}
          <section className="mt-8">
            <h2 className="text-lg font-semibold text-[#0C447C] mb-4">Sıkça Sorulan Sorular</h2>
            <div className="space-y-3">
              {[
                {
                  q: `Bugün ${provinceName}'da motorin kaç lira?`,
                  a: `${new Date().toLocaleDateString('tr-TR')} itibarıyla ${provinceName}'da motorin fiyatları ${cheapestDiesel ? fmt(cheapestDiesel.diesel) : '—'} ile ${expensiveDiesel ? fmt(expensiveDiesel.diesel) : '—'} ₺/L arasında değişmektedir. En ucuz motorin ${cheapestDiesel?.brand ?? '—'} istasyonlarında bulunmaktadır.`,
                },
                {
                  q: `Bugün ${provinceName}'da benzin 95 kaç lira?`,
                  a: `${provinceName}'da kurşunsuz 95 oktan benzin fiyatları ${cheapestGasoline ? fmt(cheapestGasoline.gasoline) : '—'} ile ${expensiveGasoline ? fmt(expensiveGasoline.gasoline) : '—'} ₺/L arasında değişmektedir.`,
                },
                {
                  q: 'OPET mi Shell mi daha ucuz?',
                  a: 'Akaryakıt fiyatları şehre ve güne göre değişmektedir. Yukarıdaki tabloda bulunduğunuz şehir için güncel OPET ve Shell fiyatlarını karşılaştırabilirsiniz.',
                },
                {
                  q: 'LPG otogaz fiyatı ne kadar?',
                  a: `${provinceName}'da Shell, Petrol Ofisi ve Total istasyonlarında LPG otogaz fiyatları tabloda gösterilmektedir.`,
                },
              ].map(({ q, a }) => (
                <details key={q} className="border border-gray-200 rounded-lg p-4">
                  <summary className="font-medium cursor-pointer text-gray-800">{q}</summary>
                  <p className="mt-2 text-gray-600 text-sm leading-relaxed">{a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Veri kaynağı notu */}
          <div className="mt-8 p-5 bg-gray-50 rounded-xl">
            <h3 className="text-[15px] font-semibold text-[#042C53] mb-1.5">Veri kaynakları ve güncellik</h3>
            <p className="text-[13px] text-gray-500 leading-relaxed">
              Fiyatlar markaların resmi web siteleri ve EPDK&apos;nın haftalık raporlarından derlenmektedir.
              İl ve istasyon bazında ufak farklar olabilir; pompada gördüğünüz fiyat esastır.
              Fiyatlar bilgi amaçlıdır — yatırım tavsiyesi değildir.
            </p>
          </div>
        </>
      )}
    </div>
  )
}
