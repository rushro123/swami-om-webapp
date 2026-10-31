import { useEffect, useState } from "react";
import {
  Search,
  LocateFixed,
  Sun,
  Moon,
  ThumbsUp,
  ChefHat,
  Package,
  Bike,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import PuneMap from "../components/PuneMap";
import {
  estimatePrice,
  KITCHENS,
  useLocationStore,
} from "../store/locationStore";
import { LOCALITIES } from "../data/localities";
// ── Change these ──
const WHATSAPP_NUMBER = "919763355563";
const KITCHEN_NAME = "Swami Om";

// ── Quick-pick localities (approximate centre points) ──


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
    delivery:     "Delivery for locations outside the 5 km coverage radius is quoted individually.",
  },
};

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
  const { t } = useTranslation();
  const peopleOptions = [1, 2, 3, 4].map((value) => ({
    value,
    label: t(`location.people.${value}`),
  }));
  const freqOptions = ["lunch", "dinner", "both"].map((value) => ({
    value,
    label: t(`location.freq.${value}`),
  }));
  const durationOptions = ["trial", "15days", "monthly"].map((value) => ({
    value,
    label: t(`location.duration.${value}`),
  }));
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

  const price = estimatePrice(pin.price, people, freq, duration);
  const zone = {
    ...ZONE_INFO[pin.zone],
    badge: t(`location.zone.${pin.zone}.badge`),
    note: t(`location.zone.${pin.zone}.note`),
    delivery: t(`location.zone.${pin.zone}.delivery`),
  };
  const activeChip = LOCALITIES.find((l) => l.name === pin.label)?.name;
  const selectedLocationValue = `${pin.lat},${pin.lng}`;

  const selectLocation = (value) => {
    const [lat, lng] = value.split(",").map(Number);
    if (Number.isFinite(lat) && Number.isFinite(lng)) setPin(lat, lng);
  };

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
        setSearchError(t("location.errNotFound"));
    } catch {
      setSearchError(t("location.errSearch"));
    } finally {
      setSearching(false);
    }
  };

  const useGps = () => {
    setGpsError("");
    if (!navigator.geolocation)
      return setGpsError(t("location.errGpsNA"));
    navigator.geolocation.getCurrentPosition(
      (p) => setPin(p.coords.latitude, p.coords.longitude),
      () =>
        setGpsError(t("location.errGps")),
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  const meals = freqOptions.find((f) => f.value === freq)?.label;
  const plan = t(`location.durationShort.${duration}`);
  const waLink = (custom) => {
    const text = t(custom ? "location.waCustom" : "location.waSubscribe", {
      kitchen: KITCHEN_NAME,
      label: pin.label,
      dist: pin.dist,
      people,
      meals,
      plan,
      price: price.toLocaleString("en-IN"),
    });
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
              {t("location.title")}
            </h1>
            <p className="mt-3 max-w-[520px] text-base leading-relaxed text-on-surface-variant">
              {t("location.intro")}
            </p>
          </div>
          <div className="flex items-center gap-3.5 rounded-lg bg-surface-container-lowest px-5 py-3.5 text-primary-container shadow-card">
            <ChefHat size={22} aria-hidden />
            <div className="flex flex-col text-on-surface">
              <small className="text-[0.7rem] text-on-surface-variant">
                {t("location.radiusLabel")}
              </small>
              <strong>{t("location.radiusValue")}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Location search and full-width map ── */}
      <section className="mx-auto flex max-w-[1200px] flex-col gap-6 px-5 pb-14">
        {/* Search and full-width map */}
        <div className="flex min-w-0 flex-col gap-5">
          {/* Search card */}
          <div className={card}>
            <form onSubmit={searchLocality}>
              <label htmlFor="locality" className={label}>
                {t("location.searchLabel")}
              </label>
              <div className="mt-2 flex flex-col gap-2.5 sm:flex-row">
                <div className="flex flex-1 items-center gap-2.5 rounded-md border border-transparent bg-surface-container px-3.5 text-on-surface-variant focus-within:border-primary-container">
                  <Search size={18} aria-hidden />
                  <input
                    id="locality"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t("location.placeholder")}
                    autoComplete="off"
                    className="min-w-0 flex-1 bg-transparent py-3 text-on-surface outline-none"
                  />
                </div>
                <button type="button" onClick={useGps} className={softBtn}>
                  <LocateFixed size={16} aria-hidden /> {t("location.gps")}
                </button>
                <button type="submit" className={softBtn} disabled={searching}>
                  <Search size={16} aria-hidden /> {t("location.search")}
                </button>
              </div>
            </form>

            {searching && (
              <p className="mt-2 text-[0.8rem] text-on-surface-variant">
                {t("location.searching")}
              </p>
            )}
            {(searchError || gpsError) && (
              <p className="mt-2 text-[0.8rem] text-error" role="alert">
                {searchError || gpsError}
              </p>
            )}

            <div className="mt-[18px] flex items-center justify-between">
              <span className={label}>{t("location.popular")}</span>
              <span className="text-xs text-tertiary">
                {t("location.hubs", { count: LOCALITIES.length })}
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
            <PuneMap locations={LOCALITIES} />
            <div className="flex flex-wrap items-center justify-between gap-3 bg-surface-container px-4 py-3 text-[0.78rem] text-on-surface-variant">
              <span className="inline-flex items-center gap-2">
                <Bike
                  size={15}
                  className="shrink-0 text-tertiary"
                  aria-hidden
                />
                {t("location.mapInfo")}
              </span>
              <span className="inline-flex items-center gap-2 font-semibold text-primary">
                <ShieldCheck size={15} aria-hidden /> {t("location.safety")}
              </span>
            </div>
          </div>

        </div>

        {/* Estimator below the full-width map */}
        <aside className="block">
          <div className={card}>
            <h2 className="mt-4 font-heading text-[1.45rem] font-bold">
              {t("location.areaDelivery", { name: pin.label })}
            </h2>
            <p className="mt-2 text-[0.9rem] leading-relaxed text-on-surface-variant">
              {zone.note}
            </p>

            {/* Slots */}
            <div className="mt-4 grid grid-cols-2 gap-3 rounded-md bg-surface-container p-3.5">
              <div className="flex flex-col gap-0.5">
                <span className="inline-flex items-center gap-1.5 text-[0.72rem] text-on-surface-variant">
                  <Sun size={14} aria-hidden /> {t("location.lunchSlot")}
                </span>
                <strong className="font-heading text-[1.1rem]">
                  {t("location.lunchBy")}
                </strong>
                <small className="text-[0.72rem] text-on-surface-variant">
                  {t("location.lunchPrep")}
                </small>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="inline-flex items-center gap-1.5 text-[0.72rem] text-on-surface-variant">
                  <Moon size={14} aria-hidden /> {t("location.dinnerSlot")}
                </span>
                <strong className="font-heading text-[1.1rem]">
                  {t("location.dinnerBy")}
                </strong>
                <small className="text-[0.72rem] text-on-surface-variant">
                  {t("location.dinnerPrep")}
                </small>
              </div>
            </div>

            

            <hr className="my-5 border-0 border-t border-outline-variant/50" />

            {/* Estimator */}
            <div className="mb-3.5 flex items-baseline justify-between gap-2">
              <h3 className="font-heading text-[0.95rem] font-semibold">
                {t("location.estimatorTitle")}
              </h3>
              <small className="text-[0.72rem] text-on-surface-variant">
                {t("location.estimatorSub")}
              </small>
            </div>

            <label htmlFor="estimate-location" className={label}>
              {t("location.estimateLocation")}
            </label>
            <select
              id="estimate-location"
              value={selectedLocationValue}
              onChange={(e) => selectLocation(e.target.value)}
              className="mb-4 mt-2 w-full rounded-md bg-surface-container px-3.5 py-3 text-sm text-on-surface outline-none focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-tertiary"
            >
              {KITCHENS.map((kitchen) => (
                <option
                  key={kitchen.id}
                  value={`${kitchen.lat},${kitchen.lng}`}
                >
                  {kitchen.name}
                </option>
              ))}
              {LOCALITIES.map((locality) => (
                <option
                  key={locality.name}
                  value={`${locality.lat},${locality.lng}`}
                >
                  {locality.name}
                </option>
              ))}
            </select>
            <p className="mb-4 -mt-2 text-[0.72rem] text-on-surface-variant">
              {t("location.estimateKitchen", { name: pin.kitchenName })}
            </p>

            <OptionGroup
              title={t("location.groupPeople")}
              options={peopleOptions}
              value={people}
              onChange={setPeople}
              cols="grid-cols-2 sm:grid-cols-4"
            />
            <OptionGroup
              title={t("location.groupMeals")}
              options={freqOptions}
              value={freq}
              onChange={setFreq}
              cols="grid-cols-1 sm:grid-cols-3"
            />
            <OptionGroup
              title={t("location.groupPlan")}
              options={durationOptions}
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
                <span className={label}>{t("location.priceLabel")}</span>
                <div className="font-heading text-[2rem] font-bold leading-tight text-primary">
                  ₹{price.toLocaleString("en-IN")}
                  <small className="font-body text-[0.8rem] font-normal text-on-surface-variant">
                    {" "}
                    {t(`location.period.${duration}`)}
                  </small>
                </div>
              </div>
              <div className="flex flex-col gap-1 sm:items-end sm:text-right">
                <span className="rounded-sm bg-tertiary-fixed px-2.5 py-0.5 text-[0.7rem] font-semibold text-tertiary">
                  {t("location.directRate")}
                </span>
                <small className="text-[0.72rem] text-on-surface-variant">
                  {t("location.zeroCut")}
                </small>
              </div>
            </div>

            <p className="mb-4 mt-3 text-[0.72rem] italic leading-normal text-on-surface-variant">
              {t("location.disclaimer")}
            </p>

            <a
              href={waLink(false)}
              target="_blank"
              rel="noreferrer"
              className={`mb-2.5 flex min-h-[50px] items-center justify-center gap-2 rounded-full bg-primary-container font-bold text-on-primary shadow-hover transition hover:bg-primary ${focusRing}`}
            >
              {t("location.getPrice")} <ArrowRight size={16} aria-hidden />
            </a>
            <a
              href={waLink(true)}
              target="_blank"
              rel="noreferrer"
              className={`${softBtn} w-full`}
            >
              <MessageSquare size={16} aria-hidden /> {t("location.customQuote")}
            </a>
          </div>

          {/* Fair pricing promise */}
          <div className="flex gap-3.5 rounded-lg bg-surface-container px-5 py-[18px] text-primary-container">
            <ThumbsUp size={22} className="mt-0.5 shrink-0" aria-hidden />
            <div>
              <h3 className="font-heading text-base font-semibold text-on-surface">
                {t("location.promiseTitle")}
              </h3>
              <p className="mt-1.5 text-[0.8rem] leading-relaxed text-on-surface-variant">
                {t("location.promiseBody", { kitchen: KITCHEN_NAME })}
              </p>
            </div>
          </div>
        </aside>
      </section>

      {/* ── 3. How the tiffin reaches you ── */}
      <section className="bg-surface-container-low pb-16 pt-14">
        <div className="mx-auto max-w-[1200px] px-5">
          <h2 className="text-center font-heading text-[clamp(1.5rem,3.5vw,2.1rem)] font-bold">
            {t("location.steps.title")}
          </h2>
          <p className="mt-2 text-center text-[0.9rem] text-on-surface-variant">
            {t("location.steps.sub")}
          </p>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              ["cook", ChefHat],
              ["pack", Package],
              ["deliver", Bike],
            ].map(([step, Icon], i) => (
              <article key={step} className={card}>
                <span className="mb-[18px] grid h-12 w-12 place-items-center rounded-md bg-surface-container text-primary-container">
                  <Icon size={22} aria-hidden />
                </span>
                <small className="block text-[0.7rem] text-on-surface-variant">
                  {t("location.steps.label", {
                    n: String(i + 1).padStart(2, "0"),
                    time: t(`location.steps.${step}.time`),
                  })}
                </small>
                <h3 className="mt-1.5 font-heading text-[1.15rem] font-bold">
                  {t(`location.steps.${step}.title`)}
                </h3>
                <p className="mt-2 text-[0.82rem] leading-relaxed text-on-surface-variant">
                  {t(`location.steps.${step}.text`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
