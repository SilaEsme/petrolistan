'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useFuelBrands } from '@/lib/api'
import { PROVINCES, provinceCodeToSlug } from '@/lib/provinces'
import type { BrandPrice, BrandsResponse } from '@/types'

// Bu markalar il parametresini desteklemiyor — ulusal fiyat gösterir
const NATIONAL_BRANDS = new Set(['Moil'])

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
  initialProvince,
}: {
  initialData: BrandsResponse | null
  initialProvince?: string
}) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const province = initialProvince ?? searchParams.get('province') ?? '34'
  const provinceName = PROVINCES[province] ?? 'Türkiye'

  const { data, isLoading } = useFuelBrands(
    province,
    initialData ?? undefined
  )

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

  const gasolineVals = nonZero(brands, 'gasoline')
  const dieselVals   = nonZero(brands, 'diesel')
  const lpgVals      = nonZero(brands, 'lpg')

  const minG = gasolineVals.length ? Math.min(...gasolineVals) : 0
  const maxG = gasolineVals.length ? Math.max(...gasolineVals) : 0
  const minD = dieselVals.length   ? Math.min(...dieselVals)   : 0
  const maxD = dieselVals.length   ? Math.max(...dieselVals)   : 0
  const minL = lpgVals.length      ? Math.min(...lpgVals)      : 0
  const maxL = lpgVals.length      ? Math.max(...lpgVals)      : 0

  const cheapestDiesel   = brands.filter(b => b.diesel > 0).sort((a, b) => a.diesel - b.diesel)[0]
  const expensiveDiesel  = brands.filter(b => b.diesel > 0).sort((a, b) => b.diesel - a.diesel)[0]
  const cheapestGasoline  = brands.filter(b => b.gasoline > 0).sort((a, b) => a.gasoline - b.gasoline)[0]
  const expensiveGasoline = brands.filter(b => b.gasoline > 0).sort((a, b) => b.gasoline - a.gasoline)[0]

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-10">
      {/* Başlık + İl seçici */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#0C447C]">
            {provinceName} — Marka Karşılaştırması
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            OPET, Shell, Petrol Ofisi, Aytemiz, Lukoil, Total, Moil güncel pompa fiyatları
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

      {/* En ucuz banner */}
      {brands.length > 0 && (cheapestDiesel || cheapestGasoline) && (
        <div className="bg-[#0C447C] text-white rounded-xl p-4 mb-6 grid grid-cols-2 gap-4">
          {cheapestDiesel && (
            <div>
              <p className="text-xs text-white/60 uppercase tracking-wide">En Ucuz Motorin</p>
              <p className="text-xl font-bold">{cheapestDiesel.brand}</p>
              <p className="text-2xl font-bold text-[#BA7517]">{fmt(cheapestDiesel.diesel)} ₺/L</p>
            </div>
          )}
          {cheapestGasoline && (
            <div>
              <p className="text-xs text-white/60 uppercase tracking-wide">En Ucuz Benzin 95</p>
              <p className="text-xl font-bold">{cheapestGasoline.brand}</p>
              <p className="text-2xl font-bold text-[#BA7517]">{fmt(cheapestGasoline.gasoline)} ₺/L</p>
            </div>
          )}
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
                  <th className="py-3 px-4 text-right font-medium"><span className="hidden sm:inline">Benzin </span>95</th>
                  <th className="py-3 px-4 text-right font-medium">Motorin</th>
                  <th className="py-3 px-4 text-right font-medium hidden sm:table-cell">LPG</th>
                  <th className="py-3 px-4 text-right font-medium hidden md:table-cell">Son Güncelleme</th>
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
                        <div className="flex flex-wrap items-center gap-1">
                          <span>{brand.brand}</span>
                          {isNational && (
                            <span className="text-[10px] font-normal text-gray-400 border border-gray-200 rounded px-1 py-0.5 leading-none">
                              ulusal fiyat
                            </span>
                          )}
                          {brand.error && (
                            <span className="text-xs text-gray-400" title={brand.error}>
                              ⚠
                            </span>
                          )}
                        </div>
                      </td>
                      <td className={`py-3 px-4 text-right tabular-nums ${colorClass(brand.gasoline, minG, maxG)}`}>
                        {brand.gasoline > 0 ? `${fmt(brand.gasoline)} ₺` : '—'}
                      </td>
                      <td className={`py-3 px-4 text-right tabular-nums ${colorClass(brand.diesel, minD, maxD)}`}>
                        {brand.diesel > 0 ? `${fmt(brand.diesel)} ₺` : '—'}
                      </td>
                      <td className={`py-3 px-4 text-right tabular-nums hidden sm:table-cell ${colorClass(brand.lpg, minL, maxL)}`}>
                        {brand.lpg > 0 ? `${fmt(brand.lpg)} ₺` : '—'}
                      </td>
                      <td className="py-3 px-4 text-right text-gray-400 hidden md:table-cell text-xs">
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
          {/* SSS */}
          <section className="mt-8">
            <h2 className="text-lg font-semibold text-[#0C447C] mb-4">Sıkça Sorulan Sorular</h2>
            <div className="space-y-4">
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
                  a: `${provinceName}'da LPG otogaz fiyatı Shell ve Petrol Ofisi istasyonlarında güncel olarak tabloda gösterilmektedir.`,
                },
              ].map(({ q, a }) => (
                <details key={q} className="border border-gray-200 rounded-lg p-4">
                  <summary className="font-medium cursor-pointer text-gray-800">{q}</summary>
                  <p className="mt-2 text-gray-600 text-sm">{a}</p>
                </details>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  )
}
