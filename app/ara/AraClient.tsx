'use client'

import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import dynamic from 'next/dynamic'
import useSWR from 'swr'
import { fetcher } from '@/lib/api'
import { findProvinceCode, getProvinceCenter } from '@/lib/geo'
import { PROVINCES } from '@/lib/provinces'
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
  | { status: 'loading' }
  | { status: 'ready'; lat: number; lng: number; province: string; isDefault: boolean }

const ISTANBUL = { lat: 41.01, lng: 28.97, province: '34' } as const

export default function AraClient() {
  const [geo, setGeo] = useState<GeoState>({ status: 'loading' })
  const [fuelType, setFuelType] = useState<FuelType>('benzin')
  const [sortBy, setSortBy] = useState<SortBy>('yakin')
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null)
  const [selectedCity, setSelectedCity] = useState<string | null>(null)
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

  // İl seçiliyse il merkezi, yoksa kullanıcı/default konumu
  const queryLat = geo.status === 'ready'
    ? (selectedProvince ? getProvinceCenter(selectedProvince).lat : geo.lat)
    : ISTANBUL.lat
  const queryLng = geo.status === 'ready'
    ? (selectedProvince ? getProvinceCenter(selectedProvince).lng : geo.lng)
    : ISTANBUL.lng
  const queryProvince = geo.status === 'ready' ? (selectedProvince ?? geo.province) : ISTANBUL.province
  const queryRadius = selectedProvince ? 200 : 50

  const apiKey =
    geo.status === 'ready'
      ? `/api/stations/nearby?lat=${queryLat.toFixed(5)}&lng=${queryLng.toFixed(5)}&province=${queryProvince}&fuel_type=${fuelType}&radius=${queryRadius}`
      : null

  const { data, isLoading, error } = useSWR<NearbyResponse>(apiKey, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60_000,
  })

  const stations = useMemo(() => {
    const filtered = (data?.stations ?? []).filter(s => s.brand || s.name)

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

    // İl filtresi: DB province kolonu boş olduğu için koordinat bazlı
    const provinceFiltered = selectedProvince
      ? deduped.filter(s => findProvinceCode(s.lat, s.lng) === selectedProvince)
      : deduped

    // İlçe filtresi
    const cityFiltered = selectedCity
      ? provinceFiltered.filter(s => s.city === selectedCity)
      : provinceFiltered

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
    return cityFiltered
  }, [data, sortBy, fuelType, selectedProvince, selectedCity])

  // İlçe seçenekleri: province filtrelenmiş ama city filtresi uygulanmamış listeden
  const availableCities = useMemo(() => {
    const all = (data?.stations ?? []).filter(s => s.brand || s.name)
    const provinceFiltered = selectedProvince
      ? all.filter(s => findProvinceCode(s.lat, s.lng) === selectedProvince)
      : all
    return [...new Set(provinceFiltered.map(s => s.city).filter(Boolean))].sort((a, b) =>
      a.localeCompare(b, 'tr')
    )
  }, [data, selectedProvince])

  const handleProvinceChange = useCallback((code: string | null) => {
    setSelectedProvince(code)
    setSelectedCity(null)
  }, [])

  const handleStationClick = useCallback((id: number) => {
    setSelectedId(prev => prev === id ? null : id)
  }, [])

  const handleStationHover = useCallback((id: number | null) => {
    setHoveredId(id)
  }, [])

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

      {/* Filtreler satır 2: il + ilçe */}
      {geo.status === 'ready' && (
        <div className="flex gap-3">
          <select
            value={selectedProvince ?? ''}
            onChange={e => handleProvinceChange(e.target.value || null)}
            className="flex-1 px-3 py-2 rounded-xl bg-gray-100 dark:bg-[#0F1E33] text-sm text-gray-700 dark:text-gray-200 border-0 outline-none cursor-pointer"
          >
            <option value="">İl: Tümü</option>
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

      {/* Harita */}
      {geo.status === 'ready' && stations.length > 0 && (
        <StationMap
          stations={stations}
          userLat={queryLat}
          userLng={queryLng}
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

      {/* Hata */}
      {error && !isLoading && (
        <div className="rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-4 text-sm text-red-700 dark:text-red-300">
          İstasyonlar yüklenemedi. Veritabanı henüz doldurulmamış olabilir.
        </div>
      )}

      {/* İstasyon sayısı */}
      {!isLoading && data && (
        <div className="text-xs text-gray-400 dark:text-gray-500">
          {stations.length} istasyon
          {selectedProvince
            ? ` — ${PROVINCES[selectedProvince] ?? ''}`
            : ' — 50 km yarıçap'}
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

      {!isLoading && data && stations.length === 0 && (
        <div className="text-center py-12 text-sm text-gray-400">
          Bu alanda kayıtlı istasyon bulunamadı.
        </div>
      )}
    </div>
  )
}
