'use client'

import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface Props {
  lat: number
  lng: number
  onChange: (lat: number, lng: number) => void
}

const stationIcon = L.divIcon({
  html: `<div style="width:18px;height:18px;border-radius:50%;background:#BA7517;border:2px solid white;box-shadow:0 1px 3px rgba(0,0,0,.4);"></div>`,
  className: '',
  iconSize: [18, 18],
  iconAnchor: [9, 9],
})

function isValid(lat: number, lng: number) {
  return lat !== 0 && lng !== 0 && isFinite(lat) && isFinite(lng)
}

function ClickHandler({ onChange }: { onChange: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onChange(e.latlng.lat, e.latlng.lng)
    },
  })
  return null
}

function MapController({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap()
  const mounted = useRef(false)

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      // Tile render fix: modal was hidden when map mounted → invalidate after a tick
      setTimeout(() => map.invalidateSize(), 80)
      return
    }
    // Sync view when caller changes lat/lng via number inputs, but don't interfere while dragging
    if (!isValid(lat, lng)) return
    if (!map.getBounds().contains([lat, lng])) {
      map.setView([lat, lng], map.getZoom())
    }
  }, [lat, lng, map])

  return null
}

export default function LocationPicker({ lat, lng, onChange }: Props) {
  const valid = isValid(lat, lng)
  const center: [number, number] = valid ? [lat, lng] : [39, 35]
  const zoom = valid ? 15 : 6

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className="h-56 w-full rounded-lg z-0"
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      <MapController lat={lat} lng={lng} />
      <ClickHandler onChange={onChange} />
      {valid && (
        <Marker
          position={[lat, lng]}
          icon={stationIcon}
          draggable
          eventHandlers={{
            dragend(e) {
              const ll = (e.target as L.Marker).getLatLng()
              onChange(ll.lat, ll.lng)
            },
          }}
        />
      )}
    </MapContainer>
  )
}
