'use client'

import { useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster'
import type { NearbyStation } from './StationCard'

const userIcon = L.divIcon({
  className: '',
  html: `<div style="width:20px;height:20px;background:#0C447C;border:3px solid white;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.4)"></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
})

const makeStationIcon = (_rank: number) => L.divIcon({
  className: '',
  html: `<div style="width:18px;height:18px;background:#BA7517;border:2px solid white;border-radius:50%;box-shadow:0 2px 5px rgba(0,0,0,0.4)"></div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
})

const makeClusterIcon = (count: number) => L.divIcon({
  className: '',
  html: `<div style="width:34px;height:34px;background:#0C447C;border:3px solid white;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;color:white;font-size:12px;font-weight:700;font-family:sans-serif;">${count}</div>`,
  iconSize: [34, 34],
  iconAnchor: [17, 17],
})

function MapResizer({ trigger }: { trigger: boolean }) {
  const map = useMap()
  useEffect(() => {
    const t = setTimeout(() => map.invalidateSize(), 50)
    return () => clearTimeout(t)
  }, [trigger, map])
  return null
}

function ClusteredMarkers({ stations, fuelType, onStationClick, onStationHover }: {
  stations: NearbyStation[]
  fuelType: string
  onStationClick?: (id: number) => void
  onStationHover?: (id: number | null) => void
}) {
  const map = useMap()
  // Keep callbacks current without adding them to effect deps
  const cbRef = useRef({ onStationClick, onStationHover })
  cbRef.current = { onStationClick, onStationHover }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cluster = (L as any).markerClusterGroup({
      showCoverageOnHover: false,
      maxClusterRadius: 50,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      iconCreateFunction: (c: any) => makeClusterIcon(c.getChildCount()),
    })

    stations.forEach((s, i) => {
      const price =
        fuelType === 'motorin' ? s.price_motorin
        : fuelType === 'lpg'   ? s.price_lpg
        : s.price_benzin
      const name = s.brand || s.name || 'İstasyon'
      const marker = L.marker([s.lat, s.lng], { icon: makeStationIcon(i + 1) })

      const wrap = document.createElement('div')
      wrap.style.cssText = 'font-size:14px;line-height:1.6;min-width:160px'

      const nameEl = document.createElement('strong')
      nameEl.textContent = name
      wrap.appendChild(nameEl)

      if (s.address) {
        wrap.appendChild(document.createElement('br'))
        const addrEl = document.createElement('span')
        addrEl.style.color = '#6b7280'
        addrEl.textContent = s.address
        wrap.appendChild(addrEl)
      }

      wrap.appendChild(document.createElement('br'))
      const distEl = document.createElement('span')
      distEl.style.color = '#9ca3af'
      distEl.textContent = s.distance_km < 1
        ? `${Math.round(s.distance_km * 1000)} m uzak`
        : `${s.distance_km.toFixed(1)} km uzak`
      wrap.appendChild(distEl)

      if (price) {
        wrap.appendChild(document.createElement('br'))
        const priceEl = document.createElement('strong')
        priceEl.style.color = '#0C447C'
        priceEl.textContent = `${price.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺`
        wrap.appendChild(priceEl)
      }

      wrap.appendChild(document.createElement('br'))
      const linkEl = document.createElement('a')
      linkEl.href = `https://www.google.com/maps/dir/?api=1&destination=${s.lat},${s.lng}&travelmode=driving`
      linkEl.target = '_blank'
      linkEl.rel = 'noreferrer noopener'
      linkEl.style.cssText = 'color:#0C447C;text-decoration:underline;font-size:12px'
      linkEl.textContent = 'Yol tarifi →'
      wrap.appendChild(linkEl)

      marker.bindPopup(wrap)
      marker.on('click', () => cbRef.current.onStationClick?.(s.id))
      marker.on('mouseover', () => cbRef.current.onStationHover?.(s.id))
      marker.on('mouseout', () => cbRef.current.onStationHover?.(null))
      cluster.addLayer(marker)
    })

    map.addLayer(cluster)
    return () => { map.removeLayer(cluster) }
  }, [stations, fuelType, map])

  return null
}

interface StationMapProps {
  stations: NearbyStation[]
  userLat: number
  userLng: number
  fuelType: string
  onStationClick?: (id: number) => void
  onStationHover?: (id: number | null) => void
}

export default function StationMap({ stations, userLat, userLng, fuelType, onStationClick, onStationHover }: StationMapProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="relative">
      <MapContainer
        center={[userLat, userLng]}
        zoom={13}
        className={`w-full rounded-xl z-0 transition-[height] duration-300 ${
          expanded ? 'h-[520px] sm:h-[640px]' : 'h-[320px] sm:h-[420px]'
        }`}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        <MapResizer trigger={expanded} />
        <Marker position={[userLat, userLng]} icon={userIcon}>
          <Popup>Konumunuz</Popup>
        </Marker>
        <ClusteredMarkers
          stations={stations}
          fuelType={fuelType}
          onStationClick={onStationClick}
          onStationHover={onStationHover}
        />
        <Circle center={[userLat, userLng]} radius={200} color="#0C447C" fillOpacity={0.05} weight={1} />
      </MapContainer>

      <button
        onClick={() => setExpanded(e => !e)}
        className="absolute bottom-3 right-3 z-[1000] bg-white dark:bg-[#0F1E33] border border-gray-200 dark:border-white/10 rounded-lg px-2.5 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 shadow-md hover:bg-gray-50 dark:hover:bg-[#1a2f4a] transition-colors"
        aria-label={expanded ? 'Haritayı küçült' : 'Haritayı büyüt'}
      >
        {expanded ? '↙ Küçült' : '↗ Büyüt'}
      </button>
    </div>
  )
}
