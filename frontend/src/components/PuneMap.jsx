import { useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Circle, useMapEvents, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useTranslation } from 'react-i18next'
import {
  KITCHEN_LAT,
  KITCHEN_LNG,
  calcPrice,
  haversineKm,
  useLocationStore,
  zoneFromDist,
} from '../store/locationStore'

const COVERAGE_RADIUS_METERS = 7000
const SELECTED_LOCATION_RADIUS_METERS = 1500

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

// ── Coverage locality marker with a visible area label ──
function createLocalityIcon(name, animated = false) {
  return L.divIcon({
    className: '',
    iconSize: [180, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18],
    html: `
      <div style="display:flex;align-items:center;gap:6px;white-space:nowrap">
        <div style="
          width:24px;height:24px;border-radius:50%;
          background:#2563eb;border:3px solid #fff;
          box-shadow:0 2px 8px rgba(37,99,235,0.4);
          display:flex;align-items:center;justify-content:center;
          color:#fff;font-size:12px;
          ${animated ? 'animation: locality-pulse 1.2s ease-out;' : ''}">●</div>
        <span style="
          padding:4px 8px;border-radius:999px;background:rgba(255,255,255,0.95);
          box-shadow:0 2px 8px rgba(0,0,0,0.15);color:#261910;
          font:600 12px 'Noto Sans', sans-serif;">${name}</span>
      </div>
      ${animated ? `<style>
        @keyframes locality-pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.35); }
          100% { transform: scale(1); }
        }
      </style>` : ''}`,
  })
}

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
  const hasMounted = useRef(false)

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true
      return
    }
    if (lat && lng) {
      map.flyTo([lat, lng], map.getZoom(), { duration: 0.8 })
    }
  }, [lat, lng, map])
  return null
}

function FitCoverageLocations({ locations }) {
  const map = useMap()
  const hasFit = useRef(false)

  useEffect(() => {
    if (hasFit.current || locations.length === 0) return

    const bounds = L.latLngBounds([
      [KITCHEN_LAT, KITCHEN_LNG],
      ...locations.map(({ lat, lng }) => [lat, lng]),
    ])
    map.fitBounds(bounds, { padding: [64, 64], maxZoom: 11 })
    hasFit.current = true
  }, [locations, map])

  return null
}

// ── Main Map component ──
export default function PuneMap({ locations = [] }) {
  const { t } = useTranslation()
  const pin             = useLocationStore(s => s.pin)
  const geocodeLoading  = useLocationStore(s => s.geocodeLoading)
  const setPin          = useLocationStore(s => s.setPin)
  const people          = useLocationStore(s => s.people)
  const freq            = useLocationStore(s => s.freq)
  const duration        = useLocationStore(s => s.duration)
  const markerRef       = useRef(null)
  const [animatedLocality, setAnimatedLocality] = useState(null)
  const selectedLocality = locations.some(
    (location) => location.lat === pin.lat && location.lng === pin.lng,
  )
  const isKitchenPin = pin.lat === KITCHEN_LAT && pin.lng === KITCHEN_LNG
  const coverageRadius = isKitchenPin
    ? COVERAGE_RADIUS_METERS
    : SELECTED_LOCATION_RADIUS_METERS
  const coverageCenter = isKitchenPin
    ? [KITCHEN_LAT, KITCHEN_LNG]
    : [pin.lat, pin.lng]
  const days = duration === 'trial' ? 1 : duration === '15days' ? 15 : 30
  const mealsPerDay = freq === 'both' ? 2 : 1

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
        center={[18.52, 73.86]}
        zoom={11}
        minZoom={10}
        maxBounds={[[18.25, 73.55], [18.80, 74.15]]}
        style={{ height: 440, width: '100%', cursor: 'crosshair' }}
        scrollWheelZoom
        zoomControl
      >
        <FitCoverageLocations locations={locations} />
        <MapRecenter lat={pin.lat} lng={pin.lng} />

        {/* OpenStreetMap tiles — free, no key */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {/* Selected location coverage radius */}
        <Circle center={coverageCenter} radius={coverageRadius}
          pathOptions={{ color: '#246131', fillColor: 'rgba(36,97,49,0.06)',
            dashArray: '6,4', weight: 1.8, fillOpacity: 1 }} />

        {/* Kitchen hub marker */}
        <Marker
          position={[KITCHEN_LAT, KITCHEN_LNG]}
          icon={kitchenIcon}
          eventHandlers={{
            click: (event) => {
              L.DomEvent.stopPropagation(event)
              setPin(KITCHEN_LAT, KITCHEN_LNG)
            },
          }}
        >
          <Popup>
            <div style={{ fontFamily: 'Noto Sans, sans-serif', fontSize: 13, minWidth: 160 }}>
              <strong style={{ color: '#246131' }}>{t('map.kitchenName')}</strong><br/>
              <span style={{ color: '#59413a', fontSize: 12 }}>{t('map.kitchenSub')}</span>
            </div>
          </Popup>
        </Marker>

        {locations.map((location) => (
          (() => {
            const distance = haversineKm(
              KITCHEN_LAT,
              KITCHEN_LNG,
              location.lat,
              location.lng,
            )
            const zone = zoneFromDist(distance)
            const totalPrice = calcPrice({ zone, people, freq, duration })
            const pricePerTiffin = Math.ceil(totalPrice / (days * mealsPerDay * people))

            return (
              <Marker
                key={location.name}
                position={[location.lat, location.lng]}
                icon={createLocalityIcon(
                  location.name,
                  animatedLocality === location.name,
                )}
                eventHandlers={{
                  click: (event) => {
                    L.DomEvent.stopPropagation(event)
                    setAnimatedLocality(location.name)
                    setPin(location.lat, location.lng)
                  },
                }}
              >
                <Popup>
                  <div style={{ fontFamily: 'Noto Sans, sans-serif', fontSize: 13, minWidth: 170 }}>
                    <span style={{ color: '#59413a', fontSize: 12 }}>
                      {t('map.kmFromKitchen', { dist: distance.toFixed(1) })} · {zone === 'inner'
                        ? t('map.zoneInner')
                        : zone === 'mid'
                          ? t('map.zoneMid')
                          : t('map.zoneOuter')}
                    </span>
                    <br/>
                    <strong style={{ color: '#9b2f00', fontSize: 13 }}>
                      ₹{pricePerTiffin} per tiffin
                    </strong>
                  </div>
                </Popup>
              </Marker>
            )
          })()
        ))}

        {/* User pin (draggable) is only needed for custom map selections. */}
        {!selectedLocality && !isKitchenPin && (
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
                  {geocodeLoading ? t('map.locating') : `📍 ${pin.label}`}
                </strong><br/>
                <span style={{ color: '#59413a', fontSize: 12 }}>
                  {t('map.kmFromKitchen', { dist: pin.dist })} · {pin.zone === 'inner' ? t('map.zoneInner') : pin.zone === 'mid' ? t('map.zoneMid') : t('map.zoneOuter')}
                </span>
              </div>
            </Popup>
          </Marker>
        )}

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
        <div style={{ fontWeight: 700, marginBottom: 6, color: '#261910', fontSize: 12 }}>{t('map.legendTitle')}</div>
        {[
          {
            color: '#246131',
            label: `${coverageRadius / 1000} km — ${t('map.coverageRadius')}`,
          },
          { color: '#8d7168', label: t('map.legendOuter') },
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
        {t('map.hint')}
      </div>
    </div>
  )
}
