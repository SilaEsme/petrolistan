'use client'

import { memo, useMemo, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useFuelBrands } from '@/lib/api'
import { PROVINCES, provinceCodeToSlug } from '@/lib/provinces'
import { BrandLogo } from '@/components/prices/BrandLogo'
import FuelHistoryChart from '@/components/prices/FuelHistoryChart'
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
  mobileHidden?: boolean
}
function PriceCellInner({ val, isMin, isMax, mobileHidden }: PriceCellProps) {
  const tdClass = [
    'py-2.5 sm:py-3.5 px-2 sm:px-4 text-right tabular-nums',
    mobileHidden ? 'hidden sm:table-cell' : '',
  ].join(' ')

  if (val <= 0) {
    return <td className={tdClass + ' text-gray-300 dark:text-gray-700'}>—</td>
  }

  const priceClass = isMin
    ? 'text-[#047857] dark:text-green-400 font-bold'
    : isMax
      ? 'text-[#B91C1C] dark:text-red-400'
      : 'text-gray-600 dark:text-gray-300'

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
  heading,
}: {
  initialData: BrandsResponse | null
  initialProvince?: string
  heading?: string
}) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const province     = initialProvince ?? searchParams.get('province') ?? '34'
  const provinceName = PROVINCES[province] ?? 'Türkiye'

  const [fuelTab, setFuelTab] = useState<'gasoline' | 'diesel' | 'lpg'>('gasoline')

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

  const brands = data?.data ?? []

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
          <p className="text-[11px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">Akaryakıt</p>
          <h1 className="text-2xl font-bold text-[#042C53] dark:text-white tracking-tight">
            {heading ?? `${provinceName} — Marka Karşılaştırması`}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            EPDK ve marka kaynaklarından toplanan güncel pompa fiyatları
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="province-select" className="text-[10px] text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wider">
            İl seç
          </label>
          <select
            id="province-select"
            value={province}
            onChange={handleProvinceChange}
            className="border border-[#0C447C]/40 dark:border-gray-700 rounded-md px-3 py-1.5 text-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-[#0F1829] focus:outline-none focus:ring-2 focus:ring-[#0C447C]/30 focus:border-[#0C447C]"
          >
            {Object.entries(PROVINCES).map(([code, name]) => (
              <option key={code} value={code} className="bg-white dark:bg-[#0F1829]">{code} — {name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Yükleniyor */}
      {isLoading && brands.length === 0 && (
        <div className="rounded-xl border border-gray-100 dark:border-gray-800/60 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={`flex gap-4 px-4 py-4 ${i % 2 === 0 ? 'bg-white dark:bg-[#0F1829]' : 'bg-gray-50 dark:bg-[#0D1526]'}`}>
              <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="h-4 w-20 bg-gray-100 dark:bg-gray-800 rounded animate-pulse ml-auto" />
              <div className="h-4 w-20 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
              <div className="h-4 w-16 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
            </div>
          ))}
        </div>
      )}

      {/* Yakıt türü sekmesi — mobil */}
      {brands.length > 0 && (
        <div className="flex sm:hidden gap-1 mb-4 bg-gray-100 dark:bg-gray-800/60 rounded-lg p-1">
          {(['gasoline', 'diesel', 'lpg'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFuelTab(tab)}
              className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${
                fuelTab === tab
                  ? 'bg-white dark:bg-[#162035] text-[#0D9488] dark:text-[#0D9488] shadow-sm'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              {tab === 'gasoline' ? 'Benzin 95' : tab === 'diesel' ? 'Motorin' : 'LPG'}
            </button>
          ))}
        </div>
      )}

      {/* En Uygun Fiyat — 3 kart */}
      {brands.length > 0 && cheapestGasoline && (
        <>
          <div className="grid grid-cols-3 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800/60 shadow-sm mb-3">
            {/* Benzin */}
            <div className={`bg-white dark:bg-[#0F1829] px-3 py-4 sm:px-5 sm:py-6 border-r border-gray-100 dark:border-gray-800 ${fuelTab !== 'gasoline' ? 'hidden sm:block' : ''}`}>
              <p className="text-[10px] sm:text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2 sm:mb-3">Benzin 95</p>
              <div className="flex items-baseline gap-1 mb-2 sm:mb-2">
                <span className="text-[24px] sm:text-4xl font-semibold text-[#042C53] dark:text-white tabular-nums leading-none">
                  {fmt(cheapestGasoline.gasoline)}
                </span>
                <span className="text-sm text-gray-400 dark:text-gray-500">₺/L</span>
              </div>
              <p className="text-[13px] font-semibold text-[#0C447C] dark:text-[#5B9BD5] mb-2 sm:mb-3 truncate">{cheapestGasoline.brand}</p>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/60 px-2 py-0.5 rounded-full">
                ● En ucuz
              </span>
            </div>
            {/* Motorin */}
            {cheapestDiesel ? (
              <div className={`bg-white dark:bg-[#0F1829] px-3 py-4 sm:px-5 sm:py-6 border-r border-gray-100 dark:border-gray-800 ${fuelTab !== 'diesel' ? 'hidden sm:block' : ''}`}>
                <p className="text-[10px] sm:text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2 sm:mb-3">Motorin</p>
                <div className="flex items-baseline gap-1 mb-2 sm:mb-2">
                  <span className="text-[24px] sm:text-4xl font-semibold text-[#042C53] dark:text-white tabular-nums leading-none">
                    {fmt(cheapestDiesel.diesel)}
                  </span>
                  <span className="text-sm text-gray-400 dark:text-gray-500">₺/L</span>
                </div>
                <p className="text-[13px] font-semibold text-[#0C447C] dark:text-[#5B9BD5] mb-2 sm:mb-3 truncate">{cheapestDiesel.brand}</p>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/60 px-2 py-0.5 rounded-full">
                  ● En ucuz
                </span>
              </div>
            ) : <div className="bg-white dark:bg-[#0F1829] px-3 py-4 sm:px-5 sm:py-6 border-r border-gray-100 dark:border-gray-800" />}
            {/* LPG */}
            {cheapestLpg ? (
              <div className={`bg-white dark:bg-[#0F1829] px-3 py-4 sm:px-5 sm:py-6 ${fuelTab !== 'lpg' ? 'hidden sm:block' : ''}`}>
                <p className="text-[10px] sm:text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2 sm:mb-3">LPG</p>
                <div className="flex items-baseline gap-1 mb-2 sm:mb-2">
                  <span className="text-[24px] sm:text-4xl font-semibold text-[#042C53] dark:text-white tabular-nums leading-none">
                    {fmt(cheapestLpg.lpg)}
                  </span>
                  <span className="text-sm text-gray-400 dark:text-gray-500">₺/L</span>
                </div>
                <p className="text-[13px] font-semibold text-[#0C447C] dark:text-[#5B9BD5] mb-2 sm:mb-3 truncate">{cheapestLpg.brand}</p>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/60 px-2 py-0.5 rounded-full">
                  ● En ucuz
                </span>
              </div>
            ) : <div className="bg-white dark:bg-[#0F1829] px-3 py-4 sm:px-5 sm:py-6" />}
          </div>

          {/* Savings banner */}
          {expensiveGasoline && expensiveGasoline.brand !== cheapestGasoline.brand && (
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-[#1A1200] dark:to-[#1A0E00] border border-amber-100 dark:border-amber-900/30 rounded-xl px-4 py-2.5 mb-6 flex items-center gap-2.5">
              <svg className="w-4 h-4 text-[#633806] dark:text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-[12px] text-[#412402] dark:text-amber-200/80">
                <span className="font-semibold">{cheapestGasoline.brand}</span> yerine{' '}
                <span className="font-semibold">{expensiveGasoline.brand}</span>&apos;dan benzin alsan
                50 litrene{' '}
                <span className="font-bold text-[#633806] dark:text-amber-400">
                  {Math.round((expensiveGasoline.gasoline - cheapestGasoline.gasoline) * 50)} ₺ fazla
                </span>{' '}
                öderdin
              </p>
            </div>
          )}
        </>
      )}

      {/* Tablo */}
      {brands.length > 0 && (
        <>
          <div className="overflow-x-auto rounded-[14px] border border-gray-200 dark:border-gray-800/60 shadow-sm">
            <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
              <colgroup>
                <col style={{ width: '34%' }} />
                <col style={{ width: '22%' }} />
                <col style={{ width: '22%' }} />
                <col style={{ width: '22%' }} />
              </colgroup>
              <thead>
                <tr className="bg-[#0C447C] dark:bg-[#0A1F3D] text-white">
                  <th className="py-3 px-4 text-left text-[11px] font-semibold uppercase tracking-[0.06em] text-white/85">
                    Marka
                  </th>
                  <th className={`py-3 px-4 text-right text-[11px] font-semibold uppercase tracking-[0.06em] text-white/85 ${fuelTab !== 'gasoline' ? 'hidden sm:table-cell' : ''}`}>
                    Benzin 95
                  </th>
                  <th className={`py-3 px-4 text-right text-[11px] font-semibold uppercase tracking-[0.06em] text-white/85 ${fuelTab !== 'diesel' ? 'hidden sm:table-cell' : ''}`}>
                    Motorin
                  </th>
                  <th className={`py-3 px-4 text-right text-[11px] font-semibold uppercase tracking-[0.06em] text-white/85 ${fuelTab !== 'lpg' ? 'hidden sm:table-cell' : ''}`}>
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
                      className="border-t border-gray-100 dark:border-gray-800/50 hover:bg-[#ECFAF7] dark:hover:bg-white/[0.03] transition-colors bg-white dark:bg-[#0F1829]"
                    >
                      {/* Marka hücresi */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="hidden sm:flex flex-shrink-0">
                            <BrandLogo name={brand.brand} />
                          </div>
                          <div className="flex flex-wrap items-center gap-1">
                            <span className="text-xs sm:text-[14px] font-semibold text-[#0A1628] dark:text-gray-100">{brand.brand}</span>
                            {isNational && (
                              <span className="text-[10px] font-normal text-gray-400 dark:text-gray-600 border border-gray-200 dark:border-gray-700 rounded px-1 py-0.5 leading-none">
                                ulusal fiyat
                              </span>
                            )}
                            {brand.brand === 'Total' && brand.gasoline === 0 && (
                              <span className="text-[10px] text-gray-400 dark:text-gray-600">bu ilde yok</span>
                            )}
                            {brand.error && brand.brand !== 'Total' && (
                              <span className="text-xs text-gray-400" title={brand.error}>⚠</span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Fiyat hücreleri */}
                      <PriceCell val={brand.gasoline} isMin={!isNational && brand.gasoline === minG} isMax={!isNational && brand.gasoline === maxG} mobileHidden={fuelTab !== 'gasoline'} />
                      <PriceCell val={brand.diesel}   isMin={!isNational && brand.diesel   === minD} isMax={!isNational && brand.diesel   === maxD} mobileHidden={fuelTab !== 'diesel'} />
                      <PriceCell val={brand.lpg}      isMin={!isNational && brand.lpg      === minL} isMax={!isNational && brand.lpg      === maxL} mobileHidden={fuelTab !== 'lpg'} />
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Legend */}
          <div className="mt-3.5 flex flex-wrap items-center gap-4 text-[11px] text-gray-500 dark:text-gray-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#047857] dark:bg-green-500" />
              <span className="text-[#047857] dark:text-green-400">En ucuz</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#B91C1C] dark:bg-red-500" />
              <span className="text-[#B91C1C] dark:text-red-400">En yüksek</span>
            </span>
            <span className="text-gray-400 dark:text-gray-600">·</span>
            <span className="text-gray-400 dark:text-gray-600">Sütun bazında karşılaştırma</span>
            {data?.cached && data.cachedAt && (
              <span className="ml-auto text-gray-400 dark:text-gray-600">
                Önbellekten ·{' '}
                {new Date(data.cachedAt).toLocaleString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
              </span>
            )}
          </div>

          {/* 30 Günlük Fiyat Geçmişi */}
          <FuelHistoryChart
            province={province}
            brands={brands.map((b: BrandPrice) => b.brand)}
          />

          {/* SSS */}
          <section className="mt-8">
            <h2 className="text-lg font-semibold text-[#0C447C] dark:text-[#5B9BD5] mb-4">Sıkça Sorulan Sorular</h2>
            <div className="space-y-3">
              {[
                {
                  q: `${provinceName}'da benzin 95 kaç lira?`,
                  a: cheapestGasoline && expensiveGasoline
                    ? `${provinceName}'da güncel benzin 95 fiyatları ${fmt(minG)} ile ${fmt(maxG)} ₺/L arasındadır. En ucuz benzin ${cheapestGasoline.brand} istasyonlarında ${fmt(cheapestGasoline.gasoline)} ₺/L olarak uygulanmaktadır.`
                    : `${provinceName} için güncel benzin 95 fiyatları yukarıdaki tabloda görüntülenebilir.`,
                },
                {
                  q: `${provinceName}'da motorin fiyatı ne kadar?`,
                  a: cheapestDiesel && expensiveDiesel
                    ? `${provinceName}'da motorin fiyatları ${fmt(minD)} ile ${fmt(maxD)} ₺/L arasında değişmektedir. En uygun motorin ${cheapestDiesel.brand} istasyonlarında ${fmt(cheapestDiesel.diesel)} ₺/L olarak bulunmaktadır.`
                    : `${provinceName} motorin fiyatları tabloda güncel olarak listelenmektedir.`,
                },
                {
                  q: `${provinceName}'da en ucuz akaryakıt hangi markada?`,
                  a: cheapestGasoline && cheapestDiesel
                    ? `${provinceName}'da en ucuz benzin 95 ${cheapestGasoline.brand} (${fmt(cheapestGasoline.gasoline)} ₺/L), en ucuz motorin ise ${cheapestDiesel.brand} (${fmt(cheapestDiesel.diesel)} ₺/L) istasyonlarında uygulanmaktadır. Fiyatlar saatlik güncellenmektedir.`
                    : `Güncel en ucuz marka bilgisi yukarıdaki tabloda listelenmiştir.`,
                },
                ...(expensiveGasoline && cheapestGasoline && expensiveGasoline.brand !== cheapestGasoline.brand ? [{
                  q: `${provinceName}'da doğru markayı seçersem ne kadar tasarruf ederim?`,
                  a: `${provinceName}'da benzin 95 için en ucuz marka (${cheapestGasoline.brand}, ${fmt(cheapestGasoline.gasoline)} ₺/L) ile en pahalı marka arasında ${fmt(maxG - minG)} ₺/L fark bulunmaktadır. 50 litrelik bir dolum için bu fark ${Math.round((maxG - minG) * 50)} ₺'ye ulaşmaktadır.`,
                }] : []),
                {
                  q: 'Akaryakıt fiyatları ne zaman güncellenir?',
                  a: 'EPDK akaryakıt tavan fiyatlarını her hafta Salı veya Çarşamba günü açıklar; yeni fiyatlar gece yarısından itibaren geçerli olur. Markalar bu tavan fiyatın altında kalmak koşuluyla kendi pompa fiyatlarını belirleyebilir. Petrolistan fiyatları saatlik olarak günceller.',
                },
              ].map(({ q, a }) => (
                <details key={q} className="border border-gray-200 dark:border-gray-800/60 rounded-lg p-4 dark:bg-[#0F1829]">
                  <summary className="font-medium cursor-pointer text-gray-800 dark:text-gray-200">{q}</summary>
                  <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Veri kaynağı notu */}
          <div className="mt-8 p-5 bg-gray-50 dark:bg-[#0F1829] border border-gray-100 dark:border-gray-800/60 rounded-xl">
            <h3 className="text-[15px] font-semibold text-[#042C53] dark:text-white mb-1.5">Veri kaynakları ve güncellik</h3>
            <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed">
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
