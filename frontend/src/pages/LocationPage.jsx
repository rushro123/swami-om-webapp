import { useEffect, useState } from "react";
import {
  Search,
  LocateFixed,
  Sun,
  Moon,
  BadgeCheck,
  ThumbsUp,
  ChefHat,
  Package,
  Bike,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import PuneMap from "../components/PuneMap";
import { useLocationStore, calcPrice } from "../store/locationStore";

// ── Change these ──
const WHATSAPP_NUMBER = "919763355563";
const KITCHEN_NAME = "Swami Om";

// ── Quick-pick localities (approximate centre points) ──
const LOCALITIES = [
  { name: "Kothrud", lat: 18.5074, lng: 73.8077 },
  { name: "Baner", lat: 18.559, lng: 73.7868 },
  { name: "Aundh", lat: 18.558, lng: 73.8075 },
  { name: "Viman Nagar", lat: 18.5679, lng: 73.9143 },
  { name: "Hinjawadi Phase 1", lat: 18.5912, lng: 73.7389 },
  { name: "Kalyani Nagar", lat: 18.5463, lng: 73.9033 },
  { name: "Hadapsar", lat: 18.5089, lng: 73.926 },
];

const PEOPLE_OPTIONS = [
  { value: 1, label: "1 Person" },
  { value: 2, label: "2 People" },
  { value: 3, label: "3 People" },
  { value: 4, label: "4+ Family" },
];
const FREQ_OPTIONS = [
  { value: "lunch", label: "Lunch Only" },
  { value: "dinner", label: "Dinner Only" },
  { value: "both", label: "Both (2 Meals)" },
];
const DURATION_OPTIONS = [
  { value: "trial", label: "Daily Trial" },
  { value: "15days", label: "15 Days" },
  { value: "monthly", label: "30 Days (Best)" },
];
const PERIOD_LABEL = {
  trial: "/ day",
  "15days": "/ 15 days",
  monthly: "/ month",
};

const ZONE_INFO = {
  inner: {
    badge: "Service Available — Priority Route",
    badgeClass: "bg-tertiary-fixed text-tertiary",
    note: "Your address falls in our primary kitchen corridor. Hot home-style lunch and dinner can be dispatched reliably to your doorstep.",
    delivery:
      "Free delivery on 15 & 30-day plans! Since your locality is within 5 km of our central kitchen, daily transport fees are waived completely.",
  },
  mid: {
    badge: "Service Available — Standard Route",
    badgeClass: "bg-primary-fixed text-primary",
    note: "Your address is within our standard delivery range. Tiffins are dispatched in scheduled batches along your route.",
    delivery:
      "A small delivery charge applies for your distance. It is lower on the monthly plan.",
  },
  outer: {
    badge: "On Request — Custom Delivery",
    badgeClass: "bg-surface-variant text-on-surface-variant",
    note: "This location is outside our daily delivery zone. We can still serve you on request, so message us to confirm.",
    delivery: "Delivery for locations beyond 12 km is quoted individually.",
  },
};

const STEPS = [
  {
    icon: ChefHat,
    time: "10:30 AM",
    title: "Daily Fresh Cooking",
    text: "Vegetables chopped at dawn, hand-roasted spice blends, and warm rotis prepared in small rounds per route zone.",
  },
  {
    icon: Package,
    time: "11:45 AM",
    title: "Insulated Stainless Packing",
    text: "Packed boiling hot into sanitized 3-4 tier stainless dabbas or microwave-safe eco trays with heat-retention wraps.",
  },
  {
    icon: Bike,
    time: "12:30 PM",
    title: "Punctual Handover",
    text: "Dedicated neighbourhood delivery riders drop off directly to your apartment security, reception, or flat door.",
  },
];

// ── Repeated class strings (all values come from your @theme tokens) ──
const card = "rounded-lg bg-surface-container-lowest p-5 shadow-card";
const label = "block text-[0.78rem] font-semibold text-on-surface";
const focusRing =
  "focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-tertiary";
const softBtn = `inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-surface-container px-4 text-sm font-semibold text-primary transition hover:bg-surface-container-high ${focusRing}`;

// ── Option group (people / meals / duration) ──
// `cols` must be a full class string so Tailwind can see it at build time
function OptionGroup({ title, options, value, onChange, cols }) {
  return (
    <div className="mb-4">
      <div className={label} id={`lbl-${title}`}>
        {title}
      </div>
      <div
        className={`mt-2 grid gap-2 ${cols}`}
        role="radiogroup"
        aria-labelledby={`lbl-${title}`}
      >
        {options.map((o) => {
          const active = value === o.value;
          return (
            <button
              key={o.value}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(o.value)}
              className={`rounded-md px-1.5 py-2.5 text-[0.8rem] transition ${focusRing} ${
                active
                  ? "bg-primary-container font-semibold text-on-primary"
                  : "bg-surface-container text-on-surface hover:bg-surface-container-high"
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function LocationPage() {
  const pin = useLocationStore((s) => s.pin);
  const people = useLocationStore((s) => s.people);
  const freq = useLocationStore((s) => s.freq);
  const duration = useLocationStore((s) => s.duration);
  const setPin = useLocationStore((s) => s.setPin);
  const setPeople = useLocationStore((s) => s.setPeople);
  const setFreq = useLocationStore((s) => s.setFreq);
  const setDuration = useLocationStore((s) => s.setDuration);

  const [query, setQuery] = useState(pin.label);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [gpsError, setGpsError] = useState("");

  // Keep the input in sync when the pin moves (map click, drag, chip)
  useEffect(() => {
    setQuery(pin.label);
  }, [pin.label]);

  // Subscribing to the pieces and calling calcPrice here makes the price
  // re-render on every change (store.getPrice() would not).
  const price = calcPrice({ zone: pin.zone, people, freq, duration });
  const zone = ZONE_INFO[pin.zone];
  const activeChip = LOCALITIES.find((l) => l.name === pin.label)?.name;

  // Type a locality and press Enter → look it up (Nominatim, limited to Pune)
  const searchLocality = async (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    setSearching(true);
    setSearchError("");
    try {
      const url =
        "https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=in" +
        "&viewbox=73.55,18.80,74.15,18.25&bounded=1&q=" +
        encodeURIComponent(q + ", Pune");
      const data = await (await fetch(url)).json();
      if (data[0]) setPin(parseFloat(data[0].lat), parseFloat(data[0].lon));
      else
        setSearchError(
          "Locality not found in Pune. Try a nearby landmark or drop a pin on the map.",
        );
    } catch {
      setSearchError(
        "Search failed. Check your connection or drop a pin on the map.",
      );
    } finally {
      setSearching(false);
    }
  };

  const useGps = () => {
    setGpsError("");
    if (!navigator.geolocation)
      return setGpsError("GPS is not available on this device.");
    navigator.geolocation.getCurrentPosition(
      (p) => setPin(p.coords.latitude, p.coords.longitude),
      () =>
        setGpsError(
          "Could not get your location. Allow location access or drop a pin.",
        ),
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  const meals = FREQ_OPTIONS.find((f) => f.value === freq)?.label;
  const plan = DURATION_OPTIONS.find(
    (d) => d.value === duration,
  )?.label.replace(" (Best)", "");
  const waLink = (custom) => {
    const text = custom
      ? `Hello ${KITCHEN_NAME}, I would like a custom quote.\nLocation: ${pin.label} (${pin.dist} km)`
      : `Hello ${KITCHEN_NAME}, I'd like to subscribe.\nLocation: ${pin.label} (${pin.dist} km)\nPeople: ${people}\nMeals: ${meals}\nPlan: ${plan}\nEstimated price: ₹${price.toLocaleString("en-IN")}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  return (
    // flex-1 pushes the footer to the bottom (your #root is a flex column)
    <main className="flex-1 bg-background text-on-surface">
      {/* ── 1. Page intro ── */}
      <section className="hero-glow pb-7 pt-12">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-end justify-between gap-6 px-5">
          <div>
            <h1 className="font-display text-[clamp(1.9rem,4.5vw,3rem)] font-bold leading-[1.1]">
              Check Tiffin Service in Your Area
            </h1>
            <p className="mt-3 max-w-[520px] text-base leading-relaxed text-on-surface-variant">
              Enter your locality or pin your address to check delivery
              coverage, delivery slots, and request transparent location-based
              pricing.
            </p>
          </div>
          <div className="flex items-center gap-3.5 rounded-lg bg-surface-container-lowest px-5 py-3.5 text-primary-container shadow-card">
            <ChefHat size={22} aria-hidden />
            <div className="flex flex-col text-on-surface">
              <small className="text-[0.7rem] text-on-surface-variant">
                Central kitchen radius
              </small>
              <strong>12 km Guaranteed Fresh</strong>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Two-column tool: left = find, right = result ── */}
      <section className="mx-auto grid max-w-[1200px] grid-cols-1 items-start gap-6 px-5 pb-14 lg:grid-cols-[1.1fr_0.9fr]">
        {/* LEFT COLUMN */}
        <div className="flex min-w-0 flex-col gap-5">
          {/* Search card */}
          <div className={card}>
            <form onSubmit={searchLocality}>
              <label htmlFor="locality" className={label}>
                Locality, Apartment, or Landmark
              </label>
              <div className="mt-2 flex flex-col gap-2.5 sm:flex-row">
                <div className="flex flex-1 items-center gap-2.5 rounded-md border border-transparent bg-surface-container px-3.5 text-on-surface-variant focus-within:border-primary-container">
                  <Search size={18} aria-hidden />
                  <input
                    id="locality"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="e.g. Kothrud"
                    autoComplete="off"
                    className="min-w-0 flex-1 bg-transparent py-3 text-on-surface outline-none"
                  />
                </div>
                <button type="button" onClick={useGps} className={softBtn}>
                  <LocateFixed size={16} aria-hidden /> Use GPS
                </button>
              </div>
            </form>

            {searching && (
              <p className="mt-2 text-[0.8rem] text-on-surface-variant">
                Searching…
              </p>
            )}
            {(searchError || gpsError) && (
              <p className="mt-2 text-[0.8rem] text-error" role="alert">
                {searchError || gpsError}
              </p>
            )}

            <div className="mt-[18px] flex items-center justify-between">
              <span className={label}>Popular coverage sectors</span>
              <span className="text-xs text-tertiary">
                {LOCALITIES.length} hubs online
              </span>
            </div>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {LOCALITIES.map((l) => (
                <button
                  key={l.name}
                  type="button"
                  onClick={() => setPin(l.lat, l.lng)}
                  className={`rounded-full px-3.5 py-2 text-[0.8rem] transition ${focusRing} ${
                    activeChip === l.name
                      ? "bg-primary-container font-semibold text-on-primary"
                      : "bg-surface-container text-on-surface hover:bg-surface-container-high"
                  }`}
                >
                  {l.name}
                </button>
              ))}
            </div>
          </div>

          {/* Map (your existing component) + info strip */}
          <div className="overflow-hidden rounded-lg bg-surface-container-lowest shadow-card">
            <PuneMap />
            <div className="flex flex-wrap items-center justify-between gap-3 bg-surface-container px-4 py-3 text-[0.78rem] text-on-surface-variant">
              <span className="inline-flex items-center gap-2">
                <Bike
                  size={15}
                  className="shrink-0 text-tertiary"
                  aria-hidden
                />
                Hot-insulated tiffin carriers deployed directly at 11:45 AM
                &amp; 7:15 PM
              </span>
              <span className="inline-flex items-center gap-2 font-semibold text-primary">
                <ShieldCheck size={15} aria-hidden /> Tiffin Safety Guarantee
              </span>
            </div>
          </div>

          {/* Photos */}
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            {[
              {
                src: "/images/steel-dabbas.jpg",
                alt: "Stainless steel tiffin boxes",
                caption: "Clean Stainless Dabbas",
              },
              {
                src: "/images/fresh-rotis.jpg",
                alt: "Rotis being cooked on a tawa",
                caption: "Rotis Made Fresh 30m Prior",
              },
            ].map((p) => (
              <figure
                key={p.src}
                className="relative m-0 aspect-video overflow-hidden rounded-lg bg-surface-container"
              >
                <img
                  src={p.src}
                  alt={p.alt}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-on-surface/75 to-transparent px-3 pb-2.5 pt-6 text-[0.78rem] font-semibold text-white">
                  {p.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <aside className="flex min-w-0 flex-col gap-5">
          <div className={`${card} lg:sticky lg:top-24`}>
            <div className="flex flex-wrap items-center justify-between gap-2.5">
              <span
                className={`rounded-full px-3 py-1.5 text-[0.72rem] font-semibold ${zone.badgeClass}`}
              >
                {zone.badge}
              </span>
              <span className="text-xs text-on-surface-variant">
                {pin.dist} km from kitchen
              </span>
            </div>

            <h2 className="mt-4 font-heading text-[1.45rem] font-bold">
              {pin.label} Area Delivery
            </h2>
            <p className="mt-2 text-[0.9rem] leading-relaxed text-on-surface-variant">
              {zone.note}
            </p>

            {/* Slots */}
            <div className="mt-4 grid grid-cols-2 gap-3 rounded-md bg-surface-container p-3.5">
              <div className="flex flex-col gap-0.5">
                <span className="inline-flex items-center gap-1.5 text-[0.72rem] text-on-surface-variant">
                  <Sun size={14} aria-hidden /> Lunch Slot
                </span>
                <strong className="font-heading text-[1.1rem]">
                  By 12:30 PM
                </strong>
                <small className="text-[0.72rem] text-on-surface-variant">
                  Prep at 10:45 AM
                </small>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="inline-flex items-center gap-1.5 text-[0.72rem] text-on-surface-variant">
                  <Moon size={14} aria-hidden /> Dinner Slot
                </span>
                <strong className="font-heading text-[1.1rem]">
                  By 7:45 PM
                </strong>
                <small className="text-[0.72rem] text-on-surface-variant">
                  Prep at 5:30 PM
                </small>
              </div>
            </div>

            <p className="mt-3.5 flex gap-2.5 rounded-md bg-surface-container px-3.5 py-3 text-[0.8rem] leading-normal text-primary">
              <BadgeCheck size={16} className="mt-0.5 shrink-0" aria-hidden />
              <span>{zone.delivery}</span>
            </p>

            <hr className="my-5 border-0 border-t border-outline-variant/50" />

            {/* Estimator */}
            <div className="mb-3.5 flex items-baseline justify-between gap-2">
              <h3 className="font-heading text-[0.95rem] font-semibold">
                Customise Meal Estimator
              </h3>
              <small className="text-[0.72rem] text-on-surface-variant">
                Instant transparent quote
              </small>
            </div>

            <OptionGroup
              title="Number of people"
              options={PEOPLE_OPTIONS}
              value={people}
              onChange={setPeople}
              cols="grid-cols-2 sm:grid-cols-4"
            />
            <OptionGroup
              title="Meal timing"
              options={FREQ_OPTIONS}
              value={freq}
              onChange={setFreq}
              cols="grid-cols-1 sm:grid-cols-3"
            />
            <OptionGroup
              title="Duration plan"
              options={DURATION_OPTIONS}
              value={duration}
              onChange={setDuration}
              cols="grid-cols-1 sm:grid-cols-3"
            />

            {/* Price */}
            <div
              className="mt-1 flex flex-col justify-between gap-3 rounded-md bg-surface-container px-4 py-3.5 sm:flex-row sm:items-center"
              aria-live="polite"
            >
              <div>
                <span className={label}>Estimated kitchen price</span>
                <div className="font-heading text-[2rem] font-bold leading-tight text-primary">
                  ₹{price.toLocaleString("en-IN")}
                  <small className="font-body text-[0.8rem] font-normal text-on-surface-variant">
                    {" "}
                    {PERIOD_LABEL[duration]}
                  </small>
                </div>
              </div>
              <div className="flex flex-col gap-1 sm:items-end sm:text-right">
                <span className="rounded-sm bg-tertiary-fixed px-2.5 py-0.5 text-[0.7rem] font-semibold text-tertiary">
                  Direct Kitchen Rate
                </span>
                <small className="text-[0.72rem] text-on-surface-variant">
                  Zero aggregator cut
                </small>
              </div>
            </div>

            <p className="mb-4 mt-3 text-[0.72rem] italic leading-normal text-on-surface-variant">
              *Prices depend on meal requirements, quantity of rotis, and
              delivery cadence. Daily trial and monthly subscription estimates
              available upon request.
            </p>

            <a
              href={waLink(false)}
              target="_blank"
              rel="noreferrer"
              className={`mb-2.5 flex min-h-[50px] items-center justify-center gap-2 rounded-full bg-primary-container font-bold text-on-primary shadow-hover transition hover:bg-primary ${focusRing}`}
            >
              Get Price for This Location <ArrowRight size={16} aria-hidden />
            </a>
            <a
              href={waLink(true)}
              target="_blank"
              rel="noreferrer"
              className={`${softBtn} w-full`}
            >
              <MessageSquare size={16} aria-hidden /> Ask for a Custom Quote on
              WhatsApp
            </a>
          </div>

          {/* Fair pricing promise */}
          <div className="flex gap-3.5 rounded-lg bg-surface-container px-5 py-[18px] text-primary-container">
            <ThumbsUp size={22} className="mt-0.5 shrink-0" aria-hidden />
            <div>
              <h3 className="font-heading text-base font-semibold text-on-surface">
                Our Fair Pricing Promise
              </h3>
              <p className="mt-1.5 text-[0.8rem] leading-relaxed text-on-surface-variant">
                {KITCHEN_NAME} does not believe in hidden delivery markups or
                arbitrary app platform commissions. Every quote is direct from
                our kitchen to you. You pay strictly for quality whole grains,
                fresh vegetables, cold-pressed oils, and fair courier
                compensation.
              </p>
            </div>
          </div>
        </aside>
      </section>

      {/* ── 3. How the tiffin reaches you ── */}
      <section className="bg-surface-container-low pb-16 pt-14">
        <div className="mx-auto max-w-[1200px] px-5">
          <h2 className="text-center font-heading text-[clamp(1.5rem,3.5vw,2.1rem)] font-bold">
            From Our Kadai to Your Dining Table
          </h2>
          <p className="mt-2 text-center text-[0.9rem] text-on-surface-variant">
            We cook in small, staggered batches so your tiffin never sits in
            transit for hours.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {STEPS.map(({ icon: Icon, time, title, text }, i) => (
              <article key={title} className={card}>
                <span className="mb-[18px] grid h-12 w-12 place-items-center rounded-md bg-surface-container text-primary-container">
                  <Icon size={22} aria-hidden />
                </span>
                <small className="block text-[0.7rem] text-on-surface-variant">
                  Step {String(i + 1).padStart(2, "0")} — {time}
                </small>
                <h3 className="mt-1.5 font-heading text-[1.15rem] font-bold">
                  {title}
                </h3>
                <p className="mt-2 text-[0.82rem] leading-relaxed text-on-surface-variant">
                  {text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
