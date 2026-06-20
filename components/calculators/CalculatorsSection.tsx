'use client'
import { useState } from 'react'
import { useFuelBrands } from '@/lib/api'
import { PROVINCES } from '@/lib/provinces'
import type { BrandPrice } from '@/types'

function fmt(n: number, decimals = 2) {
  return n.toLocaleString('tr-TR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
}

function nonZero(brands: BrandPrice[], key: 'gasoline' | 'diesel' | 'lpg') {
  return brands.map((b) => b[key]).filter((v) => v > 0)
}

type FuelType = 'gasoline' | 'diesel' | 'lpg'
const FUEL_LABELS: Record<FuelType, string> = { gasoline: 'Benzin 95', diesel: 'Motorin', lpg: 'LPG' }

export default function CalculatorsSection() {
  const [activeTab, setActiveTab] = useState<'savings' | 'route'>('savings')
  const [province, setProvince] = useState('34')

  // Tasarruf hesaplayıcısı
  const [litres, setLitres] = useState(40)
  const [savingsFuel, setSavingsFuel] = useState<FuelType>('gasoline')

  // Sefer hesaplayıcısı
  const [km, setKm] = useState(100)
  const [consumption, setConsumption] = useState(8)
  const [routeFuel, setRouteFuel] = useState<FuelType>('gasoline')
  const [roundTrip, setRoundTrip] = useState(false)

  const { data, isLoading } = useFuelBrands(province)
  const brands = (data?.data ?? []).filter((b) => b.brand !== 'Moil')

  const gasolineVals = nonZero(brands, 'gasoline')
  const dieselVals   = nonZero(brands, 'diesel')
  const lpgVals      = nonZero(brands, 'lpg')

  const mins = {
    gasoline: gasolineVals.length ? Math.min(...gasolineVals) : 0,
    diesel:   dieselVals.length   ? Math.min(...dieselVals)   : 0,
    lpg:      lpgVals.length      ? Math.min(...lpgVals)      : 0,
  }
  const maxs = {
    gasoline: gasolineVals.length ? Math.max(...gasolineVals) : 0,
    diesel:   dieselVals.length   ? Math.max(...dieselVals)   : 0,
    lpg:      lpgVals.length      ? Math.max(...lpgVals)      : 0,
  }

  function cheapest(fuel: FuelType) {
    return brands.filter((b) => b[fuel] > 0).sort((a, b) => a[fuel] - b[fuel])[0]
  }
  function mostExpensive(fuel: FuelType) {
    return brands.filter((b) => b[fuel] > 0).sort((a, b) => b[fuel] - a[fuel])[0]
  }

  // Tasarruf hesabı
  const sMin = mins[savingsFuel]
  const sMax = maxs[savingsFuel]
  const sCheap = cheapest(savingsFuel)
  const sExpensive = mostExpensive(savingsFuel)
  const cheapCost    = sMin * litres
  const expensiveCost = sMax * litres
  const saving = expensiveCost - cheapCost

  // Sefer hesabı
  const rMin = mins[routeFuel]
  const rCheap = cheapest(routeFuel)
  const totalKm = roundTrip ? km * 2 : km
  const neededLitres = (totalKm * consumption) / 100
  const routeCost = neededLitres * rMin

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-4 pb-4 sm:pb-6">
      <div className="bg-white dark:bg-[#0F1829] rounded-xl border border-gray-200/80 dark:border-gray-800/60 shadow-sm overflow-hidden">

        {/* Tab başlıkları — segment control style */}
        <div className="p-2 border-b border-gray-100 dark:border-gray-800/60">
          <div className="flex bg-gray-100 dark:bg-gray-800/60 rounded-xl p-1 gap-1">
            {(['savings', 'route'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-150 ${
                  activeTab === tab
                    ? 'bg-white dark:bg-[#162035] text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {tab === 'savings' ? 'Tasarruf Hesaplayıcısı' : 'Sefer Maliyet Hesaplayıcısı'}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4">
          {/* İl seçici — iki hesaplayıcı için ortak */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs text-gray-400 dark:text-gray-500 shrink-0">İl:</span>
            <select
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1 text-gray-700 dark:text-gray-200 bg-transparent dark:bg-[#0F1829] focus:outline-none focus:ring-2 focus:ring-[#0D9488]/30"
            >
              {Object.entries(PROVINCES).map(([code, name]) => (
                <option key={code} value={code} className="bg-white dark:bg-[#0F1829]">{name}</option>
              ))}
            </select>
          </div>

          {activeTab === 'savings' ? (
            /* ── Tasarruf Hesaplayıcısı ── */
            <div>
              {/* Yakıt türü */}
              <div className="flex gap-1.5 mb-4">
                {(['gasoline', 'diesel', 'lpg'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setSavingsFuel(f)}
                    className={`px-3 py-1 text-xs font-medium rounded-full border transition-colors ${
                      savingsFuel === f
                        ? 'bg-[#0D9488] text-white border-[#0D9488]'
                        : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    {FUEL_LABELS[f]}
                  </button>
                ))}
              </div>

              {/* Litre slider */}
              <div className="mb-5">
                <label className="text-xs text-gray-500 dark:text-gray-400 mb-2 flex justify-between">
                  <span>Yakıt miktarı</span>
                  <strong className="text-[#042C53] dark:text-white">{litres} litre</strong>
                </label>
                <input
                  type="range"
                  min={10}
                  max={100}
                  step={5}
                  value={litres}
                  onChange={(e) => setLitres(Number(e.target.value))}
                  className="w-full accent-[#0D9488] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-300 dark:text-gray-600 mt-0.5">
                  <span>10 L</span>
                  <span>100 L</span>
                </div>
              </div>

              {/* Sonuçlar */}
              {isLoading ? (
                <div className="space-y-2">
                  <div className="h-16 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
                  <div className="h-16 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
                  <div className="h-16 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
                </div>
              ) : sMin > 0 ? (
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-4 bg-green-50 dark:bg-green-950/60 border border-green-100 dark:border-green-900 rounded-lg">
                    <div>
                      <p className="text-[10px] text-green-700 dark:text-green-400 font-semibold uppercase tracking-wider">
                        En ucuz — {sCheap?.brand}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{fmt(sMin)} ₺/L × {litres} L</p>
                    </div>
                    <p className="text-xl font-bold text-green-700 dark:text-green-400">{fmt(cheapCost)} ₺</p>
                  </div>
                  {sMax > sMin && sExpensive && (
                    <>
                      <div className="flex justify-between items-center p-4 bg-red-50 dark:bg-red-950/60 border border-red-100 dark:border-red-900 rounded-lg">
                        <div>
                          <p className="text-[10px] text-red-600 dark:text-red-400 font-semibold uppercase tracking-wider">
                            En pahalı — {sExpensive.brand}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{fmt(sMax)} ₺/L × {litres} L</p>
                        </div>
                        <p className="text-xl font-bold text-red-600 dark:text-red-400">{fmt(expensiveCost)} ₺</p>
                      </div>
                      <div className="p-4 bg-[#042C53] dark:bg-[#162035] rounded-lg flex items-center justify-between">
                        <p className="text-white/60 text-sm">
                          En ucuzu seçerek tasarrufun
                        </p>
                        <p className="text-white font-bold text-3xl tabular-nums">{fmt(saving)} ₺</p>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <p className="text-sm text-gray-400 dark:text-gray-600 text-center py-6">Bu ilde veri bulunamadı</p>
              )}
            </div>
          ) : (
            /* ── Sefer Maliyet Hesaplayıcısı ── */
            <div>
              {/* Mesafe + Tüketim */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label htmlFor="route-km" className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Mesafe (km)</label>
                  <input
                    id="route-km"
                    type="number"
                    min={1}
                    max={9999}
                    value={km}
                    onChange={(e) => setKm(Math.max(1, Number(e.target.value)))}
                    className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-transparent dark:bg-[#0F1829] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0D9488]/30"
                  />
                </div>
                <div>
                  <label htmlFor="route-consumption" className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Tüketim (L/100km)</label>
                  <input
                    id="route-consumption"
                    type="number"
                    min={1}
                    max={30}
                    step={0.5}
                    value={consumption}
                    onChange={(e) => setConsumption(Math.max(1, Number(e.target.value)))}
                    className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-transparent dark:bg-[#0F1829] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0D9488]/30"
                  />
                </div>
              </div>

              {/* Yakıt türü */}
              <div className="flex gap-1.5 mb-3">
                {(['gasoline', 'diesel', 'lpg'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setRouteFuel(f)}
                    className={`px-3 py-1 text-xs font-medium rounded-full border transition-colors ${
                      routeFuel === f
                        ? 'bg-[#0D9488] text-white border-[#0D9488]'
                        : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    {FUEL_LABELS[f]}
                  </button>
                ))}
              </div>

              {/* Tek yön / Gidiş-dönüş */}
              <div className="flex gap-1.5 mb-5">
                {([false, true] as const).map((rt) => (
                  <button
                    key={String(rt)}
                    onClick={() => setRoundTrip(rt)}
                    className={`px-3 py-1 text-xs font-medium rounded-full border transition-colors ${
                      roundTrip === rt
                        ? 'bg-[#0D9488] text-white border-[#0D9488]'
                        : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    {rt ? 'Gidiş-Dönüş' : 'Tek Yön'}
                  </button>
                ))}
              </div>

              {/* Sonuçlar */}
              {isLoading ? (
                <div className="h-20 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
              ) : rMin > 0 ? (
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-4 bg-gray-50 dark:bg-[#162035]/60 border border-gray-100 dark:border-gray-800/60 rounded-lg text-center">
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wider font-medium">Toplam km</p>
                    <p className="text-xl font-bold text-[#042C53] dark:text-white mt-1 tabular-nums">{fmt(totalKm, 0)}</p>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500">km</p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-[#162035]/60 border border-gray-100 dark:border-gray-800/60 rounded-lg text-center">
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wider font-medium">Gereken yakıt</p>
                    <p className="text-xl font-bold text-[#042C53] dark:text-white mt-1 tabular-nums">
                      {neededLitres.toLocaleString('tr-TR', { maximumFractionDigits: 1 })}
                    </p>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500">litre</p>
                  </div>
                  <div className="p-4 bg-[#042C53] dark:bg-[#162035] rounded-lg text-center">
                    <p className="text-[10px] text-white/50 uppercase tracking-wider font-medium">Tahmini maliyet</p>
                    <p className="text-lg font-bold text-white mt-1 tabular-nums leading-tight">
                      {fmt(routeCost)} ₺
                    </p>
                    <p className="text-[10px] text-white/40">{rCheap?.brand ?? '—'}</p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-400 dark:text-gray-600 text-center py-6">Bu ilde veri bulunamadı</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
