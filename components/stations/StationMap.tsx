'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { NearbyStation } from './StationCard'

const userIcon = L.divIcon({
  className: '',
  html: `<div style="width:16px;height:16px;background:#0C447C;border:3px solid white;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.4)"></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
})

const stationIcon = L.divIcon({
  className: '',
  html: `<div style="width:12px;height:12px;background:#BA7517;border:2px solid white;border-radius:50%;box-shadow:0 1px 4px rgba(0,0,0,0.3)"></div>`,
  iconSize: [12, 12],
  iconAnchor: [6, 6],
})

interface StationMapProps {
  stations: NearbyStation[]
  userLat: number
  userLng: number
  fuelType: string
}

export default function StationMap({ stations, userLat, userLng, fuelType }: StationMapProps) {
  // Suppress SSR-related window errors — this component is always loaded dynamically.
  useEffect(() => {}, [])

  const getPriceForType = (s: NearbyStation) =>
    fuelType === 'motorin' ? s.price_motorin
    : fuelType === 'lpg'   ? s.price_lpg
    : s.price_benzin

  return (
    <MapContainer
      center={[userLat, userLng]}
      zoom={13}
      className="h-64 w-full rounded-xl z-0"
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[userLat, userLng]} icon={userIcon}>
        <Popup>Konumunuz</Popup>
      </Marker>
      {stations.map((s) => {
        const price = getPriceForType(s)
        const name = s.brand || s.name || 'İstasyon'
        return (
          <Marker key={s.id} position={[s.lat, s.lng]} icon={stationIcon}>
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
  )
}
