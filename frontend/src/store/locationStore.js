import { create } from "zustand";

// ── Kitchen coordinates (central Pune) ──
export const KITCHEN_LAT = 18.512734;
export const KITCHEN_LNG = 73.68412; // ~Kothrud area

// ── Haversine distance in km ──
export function haversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ── Zone from distance ──
export function zoneFromDist(km) {
  if (km <= 5) return "inner";
  if (km <= 12) return "mid";
  return "outer";
}

// ── Price calculator ──
export function calcPrice({ zone, people, freq, duration }) {
  const base = 115;
  const mealsPerDay = freq === "both" ? 2 : 1;
  const days = duration === "trial" ? 1 : duration === "15days" ? 15 : 30;
  const durMult =
    duration === "trial" ? 1.15 : duration === "15days" ? 1.05 : 1.0;
  const headMult =
    people >= 4 ? 3.6 : people === 3 ? 2.8 : people === 2 ? 1.95 : 1;
  const delivery =
    zone === "mid"
      ? duration === "monthly"
        ? 200
        : 350
      : zone === "outer"
        ? 600
        : 0;
  return Math.round(base * mealsPerDay * days * headMult * durMult + delivery);
}

// ── Zustand store ──
export const useLocationStore = create((set, get) => ({
  // Selected pin on map
  pin: {
    lat: KITCHEN_LAT,
    lng: KITCHEN_LNG,
    label: "Kothrud, Pune",
    dist: 0,
    zone: "inner",
  },

  // Meal estimator selections
  people: 1,
  freq: "lunch", // 'lunch' | 'dinner' | 'both'
  duration: "monthly", // 'trial' | '15days' | 'monthly'

  // Reverse-geocode result (Nominatim)
  geocodeLoading: false,

  // ── Actions ──
  setPin: (lat, lng) => {
    const dist = haversineKm(KITCHEN_LAT, KITCHEN_LNG, lat, lng);
    const zone = zoneFromDist(dist);
    set({
      pin: {
        lat,
        lng,
        label: "Locating…",
        dist: parseFloat(dist.toFixed(1)),
        zone,
      },
    });

    // Reverse geocode via Nominatim (free, no key)
    set({ geocodeLoading: true });
    fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&zoom=16`,
      { headers: { "Accept-Language": "en" } },
    )
      .then((r) => r.json())
      .then((data) => {
        const addr = data.address || {};
        const label =
          addr.suburb ||
          addr.neighbourhood ||
          addr.village ||
          addr.town ||
          addr.city_district ||
          addr.city ||
          "Selected Location";
        set((s) => ({ pin: { ...s.pin, label }, geocodeLoading: false }));
      })
      .catch(() => {
        set((s) => ({
          pin: { ...s.pin, label: "Selected Location" },
          geocodeLoading: false,
        }));
      });
  },

  setPeople: (v) => set({ people: v }),
  setFreq: (v) => set({ freq: v }),
  setDuration: (v) => set({ duration: v }),

  // Computed
  getPrice: () => {
    const { pin, people, freq, duration } = get();
    return calcPrice({ zone: pin.zone, people, freq, duration });
  },
}));
