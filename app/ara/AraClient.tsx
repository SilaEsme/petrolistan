'use client'

import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import dynamic from 'next/dynamic'
import useSWR from 'swr'
import { fetcher } from '@/lib/api'
import { findProvinceCode } from '@/lib/geo'
import { StationCard, type NearbyStation } from '@/components/stations/StationCard'

const StationMap = dynamic(() => import('@/components/stations/StationMap'), {
  ssr: false,
  loading: () => <div className="h-64 w-full rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse" />,
})

interface NearbyResponse {
  count: number
  province: string
  stations: NearbyStation[]
}

type FuelType = 'benzin' | 'motorin' | 'lpg'
type SortBy = 'yakin' | 'ucuz'

type GeoState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'ready'; lat: number; lng: number; province: string }
  | { status: 'denied' }
  | { status: 'error'; message: string }

export default function AraClient() {
  const [geo, setGeo] = useState<GeoState>({ status: 'idle' })
  const [fuelType, setFuelType] = useState<FuelType>('benzin')
  const [sortBy, setSortBy] = useState<SortBy>('yakin')
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const cardRefs = useRef<Map<number, HTMLElement>>(new Map())

  useEffect(() => {
    if (!navigator.geolocation) {
      setGeo({ status: 'error', message: 'Tarayıcınız konum desteği sunmuyor.' })
      return
    }
    setGeo({ status: 'loading' })

    let watchId: number | null = null

    // watchPosition, getCurrentPosition'dan farklı olarak CoreLocation'ın
    // kCLErrorLocationUnknown geçici hatalarında denemeye devam eder.
    watchId = navigator.geolocation.watchPosition(
      (pos) => {
        if (watchId !== null) {
          navigator.geolocation.clearWatch(watchId)
          watchId = null
        }
        const lat = pos.coords.latitude
        const lng = pos.coords.longitude
        setGeo({ status: 'ready', lat, lng, province: findProvinceCode(lat, lng) })
      },
      (err) => {
        if (watchId !== null) {
          navigator.geolocation.clearWatch(watchId)
          watchId = null
        }
        if (err.code === err.PERMISSION_DENIED) {
          setGeo({ status: 'denied' })
        } else {
          setGeo({ status: 'error', message: 'Konum alınamadı. Lütfen sayfayı yenileyin.' })
        }
      },
      { enableHighAccuracy: false, maximumAge: 60000, timeout: 30000 }
    )

    return () => {
      if (watchId !== null) navigator.geolocation.clearWatch(watchId)
    }
  }, [])

  const apiKey =
    geo.status === 'ready'
      ? `/api/stations/nearby?lat=${geo.lat.toFixed(5)}&lng=${geo.lng.toFixed(5)}&province=${geo.province}&fuel_type=${fuelType}`
      : null

  const { data, isLoading, error } = useSWR<NearbyResponse>(apiKey, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60_000,
  })

  const stations = useMemo(() => {
    // Remove stations with no brand AND no name (show up as "Bilinmeyen")
    const filtered = (data?.stations ?? []).filter(s => s.brand || s.name)

    // Deduplicate: first by osm_id (same OSM node imported multiple times),
    // then by coordinate proximity ~55m (different OSM nodes for same physical station)
    const seenOsmIds = new Set<number>()
    const deduped: NearbyStation[] = []
    for (const s of filtered) {
      if (s.osm_id && seenOsmIds.has(s.osm_id)) continue

      const dupIdx = deduped.findIndex(
        k => Math.abs(k.lat - s.lat) < 0.0005 && Math.abs(k.lng - s.lng) < 0.0005
      )
      if (dupIdx === -1) {
        deduped.push(s)
        if (s.osm_id) seenOsmIds.add(s.osm_id)
      } else if (s.address && !deduped[dupIdx].address) {
        if (deduped[dupIdx].osm_id) seenOsmIds.delete(deduped[dupIdx].osm_id)
        deduped[dupIdx] = s
        if (s.osm_id) seenOsmIds.add(s.osm_id)
      }
    }

    if (sortBy === 'ucuz') {
      return [...deduped].sort((a, b) => {
        const pa = fuelType === 'motorin' ? a.price_motorin : fuelType === 'lpg' ? a.price_lpg : a.price_benzin
        const pb = fuelType === 'motorin' ? b.price_motorin : fuelType === 'lpg' ? b.price_lpg : b.price_benzin
        if (!pa && !pb) return 0
        if (!pa) return 1
        if (!pb) return -1
        return pa - pb
      })
    }
    return deduped // already sorted by distance from API
  }, [data, sortBy, fuelType])

  const handleStationClick = useCallback((id: number) => {
    setSelectedId(prev => prev === id ? null : id)
    setTimeout(() => {
      cardRefs.current.get(id)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }, 50)
  }, [])

  const handleStationHover = useCallback((id: number | null) => {
    setHoveredId(id)
  }, [])

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Fuel type tabs */}
        <div className="flex bg-gray-100 dark:bg-[#0F1E33] rounded-xl p-1 gap-1">
          {(['benzin', 'motorin', 'lpg'] as FuelType[]).map((ft) => (
            <button
              key={ft}
              onClick={() => setFuelType(ft)}
              className={`flex-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors capitalize ${
                fuelType === ft
                  ? 'bg-white dark:bg-[#0C447C] text-[#0C447C] dark:text-white shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              {ft.charAt(0).toUpperCase() + ft.slice(1)}
            </button>
          ))}
        </div>

        {/* Sort toggle */}
        <div className="flex bg-gray-100 dark:bg-[#0F1E33] rounded-xl p-1 gap-1">
          {([['yakin', 'Yakın'], ['ucuz', 'Ucuz']] as [SortBy, string][]).map(([s, label]) => (
            <button
              key={s}
              onClick={() => setSortBy(s)}
              className={`flex-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                sortBy === s
                  ? 'bg-white dark:bg-[#0C447C] text-[#0C447C] dark:text-white shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Geo status messages */}
      {geo.status === 'idle' || geo.status === 'loading' ? (
        <div className="text-sm text-gray-500 dark:text-gray-400 text-center py-8 animate-pulse">
          Konumunuz alınıyor…
        </div>
      ) : geo.status === 'denied' ? (
        <div className="rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 p-4 text-sm text-amber-800 dark:text-amber-200">
          Konum izni reddedildi. Tarayıcı ayarlarından konuma izin verin, ardından sayfayı yenileyin.
        </div>
      ) : geo.status === 'error' ? (
        <div className="rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-4 text-sm text-red-700 dark:text-red-300">
          {geo.status === 'error' && (geo as { status: 'error'; message: string }).message}
        </div>
      ) : null}

      {/* Map */}
      {geo.status === 'ready' && stations.length > 0 && (
        <StationMap
          stations={stations}
          userLat={geo.lat}
          userLng={geo.lng}
          fuelType={fuelType}
          onStationClick={handleStationClick}
          onStationHover={handleStationHover}
        />
      )}

      {/* Loading skeleton */}
      {isLoading && (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-20 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
          ))}
        </div>
      )}

      {/* Error */}
      {error && !isLoading && (
        <div className="rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-4 text-sm text-red-700 dark:text-red-300">
          İstasyonlar yüklenemedi. Veritabanı henüz doldurulmamış olabilir.
        </div>
      )}

      {/* Station count header */}
      {!isLoading && data && (
        <div className="text-xs text-gray-400 dark:text-gray-500">
          {stations.length} istasyon — 10 km yarıçap
        </div>
      )}

      {/* Station list */}
      <div className="space-y-2">
        {stations.map((s) => (
          <div
            key={s.id}
            ref={el => { if (el) cardRefs.current.set(s.id, el); else cardRefs.current.delete(s.id) }}
          >
            <StationCard
              station={s}
              fuelType={fuelType}
              isHighlighted={s.id === selectedId || s.id === hoveredId}
            />
          </div>
        ))}
      </div>

      {!isLoading && data && stations.length === 0 && (
        <div className="text-center py-12 text-sm text-gray-400">
          Yakınınızda kayıtlı istasyon bulunamadı.
        </div>
      )}
    </div>
  )
}
