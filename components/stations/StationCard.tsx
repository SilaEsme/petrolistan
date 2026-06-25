'use client'

import { BrandLogo } from '@/components/prices/BrandLogo'
import { normalizeText, formatStationAddress } from '@/lib/address'
import { BRAND_KEY_TO_NAME } from '@/lib/brands'

export interface NearbyStation {
  id: number
  osm_id: number
  name: string
  brand: string
  brand_key: string
  lat: number
  lng: number
  address: string
  city: string
  province: string
  has_benzin: boolean
  has_motorin: boolean
  has_lpg: boolean
  has_carwash: boolean
  has_market: boolean
  is_open_24h: boolean
  has_ev: boolean
  brand_source?: string
  distance_km: number
  price_benzin?: number
  price_motorin?: number
  price_lpg?: number
}

function DirectionsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M3 12l18-9-9 18-2-8-7-1z" />
    </svg>
  )
}

export function StationCard({ station, fuelType, isHighlighted = false }: {
  station: NearbyStation
  fuelType: string
  isHighlighted?: boolean
}) {
  const brandName = BRAND_KEY_TO_NAME[station.brand_key] || station.brand || 'Bilinmeyen'

  const price =
    fuelType === 'motorin' ? station.price_motorin
    : fuelType === 'lpg'   ? station.price_lpg
    : station.price_benzin

  const cleanName = normalizeText(station.name)
  const label = cleanName || brandName

  return (
    <div className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${
      isHighlighted
        ? 'bg-[#0C447C]/5 dark:bg-[#0C447C]/20 border-[#0C447C]/40 dark:border-[#0C447C]/50'
        : 'bg-white dark:bg-[#0F1E33] border-gray-100 dark:border-white/5 hover:border-[#0C447C]/30 dark:hover:border-white/20'
    }`}>
      <BrandLogo name={brandName} size={40} />

      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-gray-800 dark:text-white truncate">{label}</div>
        {(() => {
          const addrStr = formatStationAddress(station)
          const subtitle =
            addrStr ||
            (cleanName && cleanName !== brandName ? cleanName : undefined) ||
            undefined
          return subtitle ? (
            <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{subtitle}</div>
          ) : null
        })()}
        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
          <span className="text-xs text-gray-400 dark:text-gray-500">
            {station.distance_km < 1
              ? `${Math.round(station.distance_km * 1000)} m`
              : `${station.distance_km.toFixed(1)} km`}
          </span>
          <span className="text-gray-200 dark:text-gray-700">·</span>
          <div className="flex gap-1 flex-wrap">
            {station.has_benzin  && <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 font-medium">Benzin</span>}
            {station.has_motorin && <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 font-medium">Motorin</span>}
            {station.has_lpg     && <span className="text-[10px] px-1.5 py-0.5 rounded bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 font-medium">LPG</span>}
            {station.has_ev      && <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 font-medium">EV</span>}
            {station.has_carwash && <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-400 font-medium">Yıkama</span>}
            {station.has_market  && <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 font-medium">Market</span>}
            {station.is_open_24h && <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-medium">7/24</span>}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        {price ? (
          <span className="text-base font-bold tabular-nums text-[#0C447C] dark:text-[#5B9FD4]">
            {price.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺
          </span>
        ) : (
          <span className="text-xs text-gray-400">—</span>
        )}
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${station.lat},${station.lng}&travelmode=driving`}
          target="_blank"
          rel="noreferrer noopener"
          className="flex items-center gap-1 text-xs font-medium text-white bg-[#0C447C] hover:bg-[#0a3d6e] px-2 py-1 rounded-lg transition-colors"
        >
          <DirectionsIcon />
          Yol tarifi
        </a>
      </div>
    </div>
  )
}
