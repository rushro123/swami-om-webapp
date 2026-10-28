import { create } from "zustand";
import { LOCALITIES } from "../data/localities";

// ── Kitchen locations ──
// Keep the first kitchen as the pricing reference until per-kitchen pricing is added.
export const KITCHENS = [
  {
    id: "central",
    name: "Swami Om Central Kitchen",
    lat: 18.513048865500668,
    lng: 73.68414165344626,
    primary: true,
  },
  {
    id: "Peth",
    name: "Swami Peth Kitchen",
    lat: 18.51681155759573, 
    lng: 73.84990072315956,
    primary: false,
  },
];

export const [PRIMARY_KITCHEN] = KITCHENS;
export const KITCHEN_LAT = PRIMARY_KITCHEN.lat;
export const KITCHEN_LNG = PRIMARY_KITCHEN.lng;

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

export function nearestKitchen(lat, lng) {
  return KITCHENS.reduce((nearest, kitchen) => {
    const distance = haversineKm(kitchen.lat, kitchen.lng, lat, lng);
    if (!nearest || distance < nearest.dist) {
      return { kitchen, dist: distance };
    }
    return nearest;
  }, null);
}

const DEFAULT_LOCATION_PRICE = 2700;

function priceForLocation(lat, lng) {
  return (
    LOCALITIES.find((locality) => locality.lat === lat && locality.lng === lng)
      ?.price ?? DEFAULT_LOCATION_PRICE
  );
}

export function estimatePrice(monthlyLocationPrice, people, freq, duration) {
  const mealsPerDay = freq === "both" ? 2 : 1;
  const monthlyPrice = monthlyLocationPrice * people * mealsPerDay;
  const durationFactor = {
    trial: 1 / 30,
    "15days": 15 / 30,
    monthly: 1,
  }[duration];

  return Math.round(monthlyPrice * (durationFactor ?? 1));
}

// ── Zustand store ──
export const useLocationStore = create((set, get) => ({
  // Selected pin on map
  pin: {
    lat: KITCHEN_LAT,
    lng: KITCHEN_LNG,
    label: "Swami Om Central Kitchen",
    dist: 0,
    zone: "inner",
    kitchenId: PRIMARY_KITCHEN.id,
    kitchenName: PRIMARY_KITCHEN.name,
    price: DEFAULT_LOCATION_PRICE,
  },

  // Meal estimator selections
  people: 1,
  freq: "lunch", // 'lunch' | 'dinner' | 'both'
  duration: "monthly", // 'trial' | '15days' | 'monthly'

  // Reverse-geocode result (Nominatim)
  geocodeLoading: false,

  // ── Actions ──
  setPin: (lat, lng) => {
    const nearest = nearestKitchen(lat, lng);
    const dist = nearest.dist;
    const zone = zoneFromDist(dist);
    set({
      pin: {
        lat,
        lng,
        label: "Locating…",
        dist: parseFloat(dist.toFixed(1)),
        zone,
        kitchenId: nearest.kitchen.id,
        kitchenName: nearest.kitchen.name,
        price: priceForLocation(lat, lng),
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
  getPrice: () => get().pin.price,
}));
