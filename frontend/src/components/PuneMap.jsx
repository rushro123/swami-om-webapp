import { useEffect, useMemo, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useTranslation } from "react-i18next";
import {
  useLocationStore,
  KITCHEN_LAT,
  KITCHEN_LNG,
  haversineKm,
  zoneFromDist,
} from "../store/locationStore";
import { LOCALITIES } from "../data/localities";

// Devanagari-capable font stack (add Noto Sans Devanagari in index.html)
const FONT = "'Noto Sans Devanagari','Noto Sans',sans-serif";

// ── Fix Leaflet default marker icon (Vite asset bug) ──
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// ── User-selected pin (terracotta) ──
const userIcon = L.divIcon({
  className: "",
  iconSize: [36, 46],
  iconAnchor: [18, 46],
  popupAnchor: [0, -46],
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
});

// ── Kitchen marker (green) ──
const kitchenIcon = L.divIcon({
  className: "",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
  html: `
    <div style="display:flex;flex-direction:column;align-items:center">
      <div style="
        width:40px;height:40px;border-radius:50%;
        background:#246131;border:3px solid #fff;
        box-shadow:0 4px 12px rgba(36,97,49,0.4);
        display:flex;align-items:center;justify-content:center;
        font-size:20px;">🏠</div>
    </div>`,
});

// ── Serving-locality sign: a small "✓ Name" tag with a pointer ──
// Colour follows the delivery zone, same as the legend.
const ZONE_COLOR = { inner: "#246131", mid: "#c2410c", outer: "#8d7168" };

function localityIcon(name, color) {
  return L.divIcon({
    className: "",
    iconSize: [0, 0], // the tag is positioned by the inner absolute div
    iconAnchor: [0, 0],
    html: `
      <div style="position:absolute;left:0;top:0;transform:translate(-50%,-100%);
        display:flex;flex-direction:column;align-items:center;cursor:pointer">
        <div style="display:flex;align-items:center;gap:5px;white-space:nowrap;
          background:#fff;border:1.5px solid ${color};color:${color};
          border-radius:9999px;padding:2px 9px 2px 3px;
          font:700 11px ${FONT};
          box-shadow:0 2px 8px rgba(43,29,20,0.22)">
          <span style="width:15px;height:15px;border-radius:50%;background:${color};color:#fff;
            display:flex;align-items:center;justify-content:center;font-size:9px;line-height:1">✓</span>
          ${name}
        </div>
        <div style="width:0;height:0;border-left:5px solid transparent;
          border-right:5px solid transparent;border-top:6px solid ${color}"></div>
      </div>`,
  });
}

// Computed once: distance and zone for every locality.
// (Icons are built inside LocalitySigns because the label depends on language.)
// The one sitting on the kitchen itself is skipped (the 🏠 marker covers it).
// `radius` (meters) is carried through from LOCALITIES via the spread.
const SERVED = LOCALITIES.map((l) => {
  const dist = haversineKm(KITCHEN_LAT, KITCHEN_LNG, l.lat, l.lng);
  return { ...l, dist, zone: zoneFromDist(dist) };
}).filter((l) => l.dist > 0.3);

// ── Click handler component ──
// Any free click on the map moves the pin and clears the locality circle.
function ClickToPin({ onFreeClick }) {
  const setPin = useLocationStore((s) => s.setPin);
  useMapEvents({
    click(e) {
      setPin(e.latlng.lat, e.latlng.lng);
      onFreeClick?.(); // random click → no circle
    },
  });
  return null;
}

// ── Recenter map smoothly when store pin changes ──
function MapRecenter({ lat, lng }) {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) {
      map.flyTo([lat, lng], map.getZoom(), { duration: 0.8 });
    }
  }, [lat, lng, map]);
  return null;
}

// ── Signs for every serving locality (click one to select it) ──
function LocalitySigns({ onSelect }) {
  const { t } = useTranslation();
  const pin = useLocationStore((s) => s.pin);
  const setPin = useLocationStore((s) => s.setPin);

  // Rebuilt when the language changes (t changes identity with the language)
  const signs = useMemo(
    () =>
      SERVED.map((l) => {
        const name = t(`localities.${l.name}`, { defaultValue: l.name });
        return {
          ...l,
          label: name,
          icon: localityIcon(name, ZONE_COLOR[l.zone]),
        };
      }),
    [t],
  );

  return (
    signs
      // hide the sign that sits under the user's pin so the two don't overlap
      .filter((l) => haversineKm(pin.lat, pin.lng, l.lat, l.lng) > 0.15)
      .map((l) => (
        <Marker
          key={l.name}
          position={[l.lat, l.lng]}
          icon={l.icon}
          title={t(l.zone === "outer" ? "map.signRequest" : "map.signDeliver", {
            name: l.label,
          })}
          eventHandlers={{
            click: () => {
              setPin(l.lat, l.lng);
              onSelect?.(l); // predefined → show circle
            },
          }}
        />
      ))
  );
}

// ── Main Map component ──
export default function PuneMap() {
  const { t } = useTranslation();
  const pin = useLocationStore((s) => s.pin);
  const geocodeLoading = useLocationStore((s) => s.geocodeLoading);
  const setPin = useLocationStore((s) => s.setPin);
  const markerRef = useRef(null);

  // The predefined locality the user picked (null = none)
  const [activeLocality, setActiveLocality] = useState(null);

  // Show the circle only while the pin is still sitting on that locality.
  // If the pin moves elsewhere (drag, search, geolocate, etc.) it disappears.
  const showCircle =
    activeLocality &&
    Math.abs(pin.lat - activeLocality.lat) < 0.0005 &&
    Math.abs(pin.lng - activeLocality.lng) < 0.0005;

  const pinLabel = t(`localities.${pin.label}`, { defaultValue: pin.label });

  // Sync draggable marker → store
  const onDragEnd = () => {
    const m = markerRef.current;
    if (m) {
      const { lat, lng } = m.getLatLng();
      setPin(lat, lng);
      setActiveLocality(null); // dragged → no circle
    }
  };

  return (
    <div
      style={{
        position: "relative",
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "0 4px 16px rgba(43,29,20,0.1)",
        border: "1px solid #e1bfb5",
      }}
    >
      <MapContainer
        center={[KITCHEN_LAT, KITCHEN_LNG]}
        zoom={13}
        minZoom={10}
        maxBounds={[
          [18.25, 73.55],
          [18.8, 74.15],
        ]}
        style={{ height: 440, width: "100%", cursor: "crosshair" }}
        scrollWheelZoom
        zoomControl
      >
        <MapRecenter lat={pin.lat} lng={pin.lng} />

        {/* OpenStreetMap tiles — free, no key */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {/* Radius circle: only for predefined localities */}
        {showCircle && (
          <Circle
            center={[activeLocality.lat, activeLocality.lng]}
            radius={activeLocality.radius}
            interactive={false}
            pathOptions={{
              color: ZONE_COLOR[activeLocality.zone],
              fillColor: ZONE_COLOR[activeLocality.zone],
              fillOpacity: 0.15,
              weight: 2,
            }}
          />
        )}

        {/* Serving-locality signs */}
        <LocalitySigns onSelect={setActiveLocality} />

        {/* Kitchen hub marker */}
        <Marker
          position={[KITCHEN_LAT, KITCHEN_LNG]}
          icon={kitchenIcon}
          zIndexOffset={500}
        >
          <Popup>
            <div
              style={{
                fontFamily: FONT,
                fontSize: 13,
                minWidth: 160,
              }}
            >
              <strong style={{ color: "#246131" }}>
                {t("map.kitchenName")}
              </strong>
              <br />
              <span style={{ color: "#59413a", fontSize: 12 }}>
                {t("map.kitchenSub")}
              </span>
            </div>
          </Popup>
        </Marker>

        {/* User pin (draggable) — always on top */}
        <Marker
          position={[pin.lat, pin.lng]}
          icon={userIcon}
          draggable
          ref={markerRef}
          zIndexOffset={1000}
          eventHandlers={{ dragend: onDragEnd }}
        >
          <Popup>
            <div
              style={{
                fontFamily: FONT,
                fontSize: 13,
                minWidth: 180,
              }}
            >
              <strong style={{ color: "#9b2f00" }}>
                {geocodeLoading ? t("map.locating") : `📍 ${pinLabel}`}
              </strong>
              <br />
              <span style={{ color: "#59413a", fontSize: 12 }}>
                {t("map.kmFromKitchen", { dist: pin.dist })} ·{" "}
                {pin.zone === "inner"
                  ? t("map.zoneInner")
                  : pin.zone === "mid"
                    ? t("map.zoneMid")
                    : t("map.zoneOuter")}
              </span>
            </div>
          </Popup>
        </Marker>

        <ClickToPin onFreeClick={() => setActiveLocality(null)} />
      </MapContainer>

      {/* Overlay: zone legend */}
      <div
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          zIndex: 1000,
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(8px)",
          borderRadius: 12,
          padding: "10px 14px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
          fontFamily: FONT,
          fontSize: 11,
        }}
      >
        <div
          style={{
            fontWeight: 700,
            marginBottom: 6,
            color: "#261910",
            fontSize: 12,
          }}
        >
          {t("map.legendTitle")}
        </div>
        {[
          { color: ZONE_COLOR.inner, label: t("map.legendInner") },
          { color: ZONE_COLOR.mid, label: t("map.legendMid") },
          { color: ZONE_COLOR.outer, label: t("map.legendOuter") },
        ].map((z) => (
          <div
            key={z.color}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginBottom: 3,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: z.color,
                flexShrink: 0,
              }}
            />
            <span style={{ color: "#59413a" }}>{z.label}</span>
          </div>
        ))}
        <div
          style={{
            marginTop: 6,
            paddingTop: 6,
            borderTop: "1px solid #e1bfb5",
            display: "flex",
            alignItems: "center",
            gap: 6,
            color: "#59413a",
          }}
        >
          <span
            style={{
              width: 13,
              height: 13,
              borderRadius: "50%",
              background: "#246131",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 8,
              flexShrink: 0,
            }}
          >
            ✓
          </span>
          {t("map.weServe")}
        </div>
      </div>

      {/* Instruction pill */}
      <div
        style={{
          position: "absolute",
          bottom: 12,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
          background: "rgba(155,47,0,0.9)",
          color: "#fff",
          borderRadius: 9999,
          padding: "6px 16px",
          fontFamily: FONT,
          fontWeight: 600,
          fontSize: 12,
          boxShadow: "0 4px 12px rgba(155,47,0,0.3)",
          whiteSpace: "nowrap",
        }}
      >
        {t("map.hint")}
      </div>
    </div>
  );
}
