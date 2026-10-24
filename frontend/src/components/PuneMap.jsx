import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Circle, useMapEvents, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useLocationStore, KITCHEN_LAT, KITCHEN_LNG } from '../store/locationStore'

// ── Fix Leaflet default marker icon (Vite asset bug) ──
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

// ── User-selected pin (terracotta) ──
const userIcon = L.divIcon({
  className: '',
  iconSize:  [36, 46],
  iconAnchor:[18, 46],
  popupAnchor:[0, -46],
  html: `
    <div style="display:flex;flex-direction:column;align-items:center;filter:drop-shadow(0 4px 8px rgba(194,65,12,0.4))">
      <div style="
        width:36px;height:36px;border-radius:50% 50% 50% 0;
        background:#c2410c;transform:rotate(-45deg);
        border:3px solid #fff;
        display:flex;align-items:center;justify-content:center;">
        <span style="transform:rotate(45deg);font-size:16px">📍</span>
      </div>
    </div>`,
})

// ── Kitchen marker (green) ──
const kitchenIcon = L.divIcon({
  className: '',
  iconSize:  [40, 40],
  iconAnchor:[20, 40],
  popupAnchor:[0,-40],
  html: `
    <div style="display:flex;flex-direction:column;align-items:center">
      <div style="
        width:40px;height:40px;border-radius:50%;
        background:#246131;border:3px solid #fff;
        box-shadow:0 4px 12px rgba(36,97,49,0.4);
        display:flex;align-items:center;justify-content:center;
        font-size:20px;">🏠</div>
    </div>`,
})

// ── Click handler component ──
function ClickToPin() {
  const setPin = useLocationStore(s => s.setPin)
  useMapEvents({
    click(e) { setPin(e.latlng.lat, e.latlng.lng) },
  })
  return null
}

// ── Recenter map smoothly when store pin changes ──
function MapRecenter({ lat, lng }) {
  const map = useMap()
  useEffect(() => {
    if (lat && lng) {
      map.flyTo([lat, lng], map.getZoom(), { duration: 0.8 })
    }
  }, [lat, lng, map])
  return null
}

// ── Main Map component ──
export default function PuneMap() {
  const pin             = useLocationStore(s => s.pin)
  const geocodeLoading  = useLocationStore(s => s.geocodeLoading)
  const setPin          = useLocationStore(s => s.setPin)
  const markerRef       = useRef(null)

  // Sync draggable marker → store
  const onDragEnd = () => {
    const m = markerRef.current
    if (m) {
      const { lat, lng } = m.getLatLng()
      setPin(lat, lng)
    }
  }

  return (
    <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden',
      boxShadow: '0 4px 16px rgba(43,29,20,0.1)', border: '1px solid #e1bfb5' }}>

      <MapContainer
        center={[KITCHEN_LAT, KITCHEN_LNG]}
        zoom={13}
        minZoom={10}
        maxBounds={[[18.25, 73.55], [18.80, 74.15]]}
        style={{ height: 440, width: '100%', cursor: 'crosshair' }}
        scrollWheelZoom
        zoomControl
      >
        <MapRecenter lat={pin.lat} lng={pin.lng} />

        {/* OpenStreetMap tiles — free, no key */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {/* Delivery radius rings */}
        <Circle center={[KITCHEN_LAT, KITCHEN_LNG]} radius={5000}
          pathOptions={{ color: '#246131', fillColor: 'rgba(36,97,49,0.06)',
            dashArray: '6,4', weight: 1.8, fillOpacity: 1 }} />
        <Circle center={[KITCHEN_LAT, KITCHEN_LNG]} radius={12000}
          pathOptions={{ color: '#c2410c', fillColor: 'rgba(194,65,12,0.04)',
            dashArray: '6,4', weight: 1.5, fillOpacity: 1 }} />

        {/* Kitchen hub marker */}
        <Marker position={[KITCHEN_LAT, KITCHEN_LNG]} icon={kitchenIcon}>
          <Popup>
            <div style={{ fontFamily: 'Noto Sans, sans-serif', fontSize: 13, minWidth: 160 }}>
              <strong style={{ color: '#246131' }}>🏠 Swami Om Central Kitchen</strong><br/>
              <span style={{ color: '#59413a', fontSize: 12 }}>All tiffins dispatched from here</span>
            </div>
          </Popup>
        </Marker>

        {/* User pin (draggable) */}
        <Marker
          position={[pin.lat, pin.lng]}
          icon={userIcon}
          draggable
          ref={markerRef}
          eventHandlers={{ dragend: onDragEnd }}
        >
          <Popup>
            <div style={{ fontFamily: 'Noto Sans, sans-serif', fontSize: 13, minWidth: 180 }}>
              <strong style={{ color: '#9b2f00' }}>
                {geocodeLoading ? '⏳ Locating…' : `📍 ${pin.label}`}
              </strong><br/>
              <span style={{ color: '#59413a', fontSize: 12 }}>
                {pin.dist} km from kitchen · {pin.zone === 'inner' ? '✅ Free delivery zone' : pin.zone === 'mid' ? '🛵 Standard delivery' : '⚠️ Outside daily zone'}
              </span>
            </div>
          </Popup>
        </Marker>

        <ClickToPin />
      </MapContainer>

      {/* Overlay: zone legend */}
      <div style={{
        position: 'absolute', top: 12, right: 12, zIndex: 1000,
        background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)',
        borderRadius: 12, padding: '10px 14px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
        fontFamily: 'Noto Sans, sans-serif', fontSize: 11,
      }}>
        <div style={{ fontWeight: 700, marginBottom: 6, color: '#261910', fontSize: 12 }}>Delivery Zones</div>
        {[
          { color: '#246131', label: '≤ 5 km — Free Delivery' },
          { color: '#c2410c', label: '5–12 km — Standard' },
          { color: '#8d7168', label: '> 12 km — On Request' },
        ].map(z => (
          <div key={z.label} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: z.color, flexShrink: 0 }} />
            <span style={{ color: '#59413a' }}>{z.label}</span>
          </div>
        ))}
      </div>

      {/* Instruction pill */}
      <div style={{
        position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)',
        zIndex: 1000, background: 'rgba(155,47,0,0.9)', color: '#fff',
        borderRadius: 9999, padding: '6px 16px',
        fontFamily: 'Noto Sans, sans-serif', fontWeight: 600, fontSize: 12,
        boxShadow: '0 4px 12px rgba(155,47,0,0.3)', whiteSpace: 'nowrap',
      }}>
        Click or drag pin to select delivery location
      </div>
    </div>
  )
}
