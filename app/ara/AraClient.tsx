'use client'

import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import dynamic from 'next/dynamic'
import useSWR from 'swr'
import { fetcher } from '@/lib/api'
import { findProvinceCode, getProvinceCenter, haversineKm } from '@/lib/geo'
import { PROVINCES } from '@/lib/provinces'
import { StationCard, type NearbyStation } from '@/components/stations/StationCard'
import type { MapBounds } from '@/components/stations/StationMap'

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
  | { status: 'loading' }
  | { status: 'ready'; lat: number; lng: number; province: string; isDefault: boolean }

const ISTANBUL = { lat: 41.01, lng: 28.97, province: '34' } as const
const MIN_ZOOM = 9 // altında Türkiye çapı çok fazla pin olur

export default function AraClient() {
  const [geo, setGeo] = useState<GeoState>({ status: 'loading' })
  const [fuelType, setFuelType] = useState<FuelType>('benzin')
  const [sortBy, setSortBy] = useState<SortBy>('yakin')
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [jumpProvince, setJumpProvince] = useState<string>('')
  const [jumpTarget, setJumpTarget] = useState<{ lat: number; lng: number; zoom: number } | null>(null)
  const [selectedCity, setSelectedCity] = useState<string | null>(null)
  const [viewport, setViewport] = useState<MapBounds | null>(null)
  const [zoom, setZoom] = useState(13)
  const cardRefs = useRef<Map<number, HTMLElement>>(new Map())

  useEffect(() => {
    if (!navigator.geolocation) {
      setGeo({ status: 'ready', ...ISTANBUL, isDefault: true })
      return
    }

    let watchId: number | null = null

    // watchPosition, CoreLocation kCLErrorLocationUnknown geçici hatalarında denemeye devam eder.
    watchId = navigator.geolocation.watchPosition(
      (pos) => {
        if (watchId !== null) {
          navigator.geolocation.clearWatch(watchId)
          watchId = null
        }
        const lat = pos.coords.latitude
        const lng = pos.coords.longitude
        setGeo({ status: 'ready', lat, lng, province: findProvinceCode(lat, lng), isDefault: false })
      },
      () => {
        if (watchId !== null) {
          navigator.geolocation.clearWatch(watchId)
          watchId = null
        }
        setGeo({ status: 'ready', ...ISTANBUL, isDefault: true })
      },
      { enableHighAccuracy: false, maximumAge: 60000, timeout: 30000 }
    )

    return () => {
      if (watchId !== null) navigator.geolocation.clearWatch(watchId)
    }
  }, [])

  const provinceOptions = useMemo(
    () => Object.entries(PROVINCES).sort((a, b) => a[1].localeCompare(b[1], 'tr')),
    []
  )

  // Harita pan/zoom olaylarını 300ms debounce'la — hızlı kaydırmada istek spam'i önlenir.
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const handleViewportChange = useCallback((b: MapBounds, z: number) => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      setViewport(b)
      setZoom(z)
    }, 300)
  }, [])
  useEffect(() => () => { if (debounceRef.current) clearTimeout(debounceRef.current) }, [])

  // Fiyat zenginleştirmesi için harita merkezinin ili.
  const centerProvince = viewport
    ? findProvinceCode((viewport.north + viewport.south) / 2, (viewport.east + viewport.west) / 2)
    : ISTANBUL.province

  const apiKey =
    viewport && zoom >= MIN_ZOOM
      ? `/api/stations/bbox?north=${viewport.north.toFixed(4)}&south=${viewport.south.toFixed(4)}` +
        `&east=${viewport.east.toFixed(4)}&west=${viewport.west.toFixed(4)}` +
        `&fuel_type=${fuelType}&province=${centerProvince}`
      : null

  const { data, isLoading, error } = useSWR<NearbyResponse>(apiKey, fetcher, {
    revalidateOnFocus: false,
    keepPreviousData: true,
    dedupingInterval: 10_000,
  })

  const userLat = geo.status === 'ready' ? geo.lat : ISTANBUL.lat
  const userLng = geo.status === 'ready' ? geo.lng : ISTANBUL.lng

  const stations = useMemo(() => {
    const DEPOT_RE = /depo|dolum/i
    const letterCount = (x?: string) => (x ?? '').replace(/[^A-Za-z]/g, '').length
    const filtered = (data?.stations ?? []).filter(s => {
      if (DEPOT_RE.test(s.name ?? '')) return false
      if (!s.brand_key) {
        const eff = s.name?.trim() ? s.name : (s.brand ?? '')
        if (letterCount(eff) < 2) return false
      }
      return true
    })

    // Dedup: önce osm_id, sonra koordinat yakınlığı ~55m
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

    // Mesafe client-side hesaplanır (bbox endpoint distance döndürmez)
    const withDistance = deduped.map(s => ({
      ...s,
      distance_km: haversineKm(userLat, userLng, s.lat, s.lng),
    }))

    // İlçe filtresi
    const cityFiltered = selectedCity
      ? withDistance.filter(s => s.city === selectedCity)
      : withDistance

    if (sortBy === 'ucuz') {
      return [...cityFiltered].sort((a, b) => {
        const pa = fuelType === 'motorin' ? a.price_motorin : fuelType === 'lpg' ? a.price_lpg : a.price_benzin
        const pb = fuelType === 'motorin' ? b.price_motorin : fuelType === 'lpg' ? b.price_lpg : b.price_benzin
        if (!pa && !pb) return 0
        if (!pa) return 1
        if (!pb) return -1
        return pa - pb
      })
    }
    return [...cityFiltered].sort((a, b) => a.distance_km - b.distance_km)
  }, [data, sortBy, fuelType, selectedCity, userLat, userLng])

  // İlçe seçenekleri: yüklü viewport verisindeki unique city değerleri
  const availableCities = useMemo(() => {
    const cities = (data?.stations ?? []).map(s => s.city).filter(Boolean)
    return [...new Set(cities)].sort((a, b) => a.localeCompare(b, 'tr'))
  }, [data])

  const handleProvinceJump = useCallback((code: string) => {
    setJumpProvince(code)
    setSelectedCity(null)
    if (code) {
      const c = getProvinceCenter(code)
      setJumpTarget({ lat: c.lat, lng: c.lng, zoom: 11 })
    }
  }, [])

  const handleStationClick = useCallback((id: number) => {
    setSelectedId(prev => prev === id ? null : id)
  }, [])

  const handleStationHover = useCallback((id: number | null) => {
    setHoveredId(id)
  }, [])

  const tooFarOut = viewport !== null && zoom < MIN_ZOOM

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
      {/* İstanbul fallback banner */}
      {geo.status === 'ready' && geo.isDefault && (
        <div className="rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-3 text-sm text-blue-700 dark:text-blue-300">
          Konumunuz alınamadı — İstanbul merkezi kullanılıyor
        </div>
      )}

      {/* Filtreler satır 1: yakıt tipi + sıralama */}
      <div className="flex flex-col sm:flex-row gap-3">
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

      {/* Filtreler satır 2: il (haritayı uçur) + ilçe (filtre) */}
      {geo.status === 'ready' && (
        <div className="flex gap-3">
          <select
            value={jumpProvince}
            onChange={e => handleProvinceJump(e.target.value)}
            className="flex-1 px-3 py-2 rounded-xl bg-gray-100 dark:bg-[#0F1E33] text-sm text-gray-700 dark:text-gray-200 border-0 outline-none cursor-pointer"
          >
            <option value="">İl: Haritada git…</option>
            {provinceOptions.map(([code, name]) => (
              <option key={code} value={code}>{name}</option>
            ))}
          </select>

          <select
            value={selectedCity ?? ''}
            onChange={e => setSelectedCity(e.target.value || null)}
            disabled={availableCities.length === 0}
            className="flex-1 px-3 py-2 rounded-xl bg-gray-100 dark:bg-[#0F1E33] text-sm text-gray-700 dark:text-gray-200 border-0 outline-none cursor-pointer disabled:opacity-40"
          >
            <option value="">İlçe: Tümü</option>
            {availableCities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
      )}

      {/* Konum alınıyor */}
      {geo.status === 'loading' && (
        <div className="text-sm text-gray-500 dark:text-gray-400 text-center py-8 animate-pulse">
          Konumunuz alınıyor…
        </div>
      )}

      {/* Harita — yükleme motorunu sürükler, geo hazır olunca her zaman göster */}
      {geo.status === 'ready' && (
        <div className="relative">
          <StationMap
            stations={stations}
            userLat={userLat}
            userLng={userLng}
            fuelType={fuelType}
            onStationClick={handleStationClick}
            onStationHover={handleStationHover}
            onViewportChange={handleViewportChange}
            flyTo={jumpTarget}
          />
          {tooFarOut && (
            <div className="absolute inset-x-0 top-3 z-[1000] mx-auto w-max max-w-[90%] rounded-lg bg-black/70 px-3 py-1.5 text-xs font-medium text-white shadow-lg pointer-events-none">
              Daha fazla istasyon için haritada yakınlaştırın
            </div>
          )}
        </div>
      )}

      {/* Loading skeleton (ilk yükleme) */}
      {isLoading && !data && (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-20 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
          ))}
        </div>
      )}

      {/* Hata */}
      {error && !isLoading && (
        <div className="rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-4 text-sm text-red-700 dark:text-red-300">
          İstasyonlar yüklenemedi. Veritabanı henüz doldurulmamış olabilir.
        </div>
      )}

      {/* İstasyon sayısı */}
      {data && !tooFarOut && (
        <div className="text-xs text-gray-400 dark:text-gray-500">
          {stations.length} istasyon — haritada görünen alanda
        </div>
      )}

      {/* İstasyon listesi */}
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

      {data && !tooFarOut && stations.length === 0 && (
        <div className="text-center py-12 text-sm text-gray-400">
          Bu alanda kayıtlı istasyon bulunamadı.
        </div>
      )}
    </div>
  )
}
