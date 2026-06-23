'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { NearbyStation } from './StationCard'

const userIcon = L.divIcon({
  className: '',
  html: `<div style="width:20px;height:20px;background:#0C447C;border:3px solid white;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.4)"></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
})

const makeStationIcon = (rank: number) => L.divIcon({
  className: '',
  html: `<div style="width:24px;height:24px;background:#BA7517;border:2px solid white;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.4);display:flex;align-items:center;justify-content:center;color:white;font-size:11px;font-weight:700;font-family:sans-serif;">${rank <= 9 ? rank : '·'}</div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
})

function MapResizer({ trigger }: { trigger: boolean }) {
  const map = useMap()
  useEffect(() => {
    const t = setTimeout(() => map.invalidateSize(), 50)
    return () => clearTimeout(t)
  }, [trigger, map])
  return null
}

interface StationMapProps {
  stations: NearbyStation[]
  userLat: number
  userLng: number
  fuelType: string
}

export default function StationMap({ stations, userLat, userLng, fuelType }: StationMapProps) {
  const [expanded, setExpanded] = useState(false)

  const getPriceForType = (s: NearbyStation) =>
    fuelType === 'motorin' ? s.price_motorin
    : fuelType === 'lpg'   ? s.price_lpg
    : s.price_benzin

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
        {stations.map((s, i) => {
          const price = getPriceForType(s)
          const name = s.brand || s.name || 'İstasyon'
          return (
            <Marker key={s.id} position={[s.lat, s.lng]} icon={makeStationIcon(i + 1)}>
              <Popup>
                <div className="text-sm leading-relaxed min-w-[160px]">
                  <strong>{name}</strong>
                  {s.address && <><br /><span className="text-gray-600">{s.address}</span></>}
                  <br />
                  <span className="text-gray-500">{s.distance_km < 1
                    ? `${Math.round(s.distance_km * 1000)} m uzak`
                    : `${s.distance_km.toFixed(1)} km uzak`
                  }</span>
                  {price && (
                    <><br /><strong className="text-[#0C447C]">
                      {price.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
                    </strong></>
                  )}
                  <br />
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${s.lat},${s.lng}`}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-[#0C447C] underline text-xs"
                  >
                    Yol tarifi →
                  </a>
                </div>
              </Popup>
            </Marker>
          )
        })}
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
