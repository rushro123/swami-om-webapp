import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Badge, Btn, Card, Reveal, waLink } from "../components/ui";
import TiffinEnquiryForm from "../components/TiffinEnquiryForm";
import CateringEnquiryForm from "../components/CateringEnquiryForm";

/* ─────────────── static data (text lives in i18n.js) ─────────────── */
const DISHES = [
  {
    key: "regular",
    tagClass: "bg-secondary text-white",
    img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80",
    badgeClass: "bg-secondary-container/20 text-secondary",
  },
  {
    key: "thursday",
    tagClass: "bg-primary-container text-white",
    img: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600&q=80",
    badgeClass: "bg-primary/8 text-primary",
  },
  {
    key: "sabzi",
    tagClass: "bg-on-surface-variant text-white",
    img: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&q=80",
    badgeClass: "bg-secondary-container/20 text-secondary",
  },
  {
    key: "sunday",
    tagClass: "bg-primary-container text-white",
    img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80",
    badgeClass: "bg-primary/8 text-primary",
  },
];

const PILLARS = [
  { key: "p1", icon: "🥗", bg: "bg-secondary-container/15" },
  { key: "p2", icon: "📅", bg: "bg-primary-fixed" },
  { key: "p3", icon: "🛵", bg: "bg-secondary-container/15" },
  { key: "p4", icon: "💸", bg: "bg-primary-fixed" },
  { key: "p5", icon: "🎉", bg: "bg-secondary-container/15" },
  { key: "p6", icon: "💬", bg: "bg-primary-fixed" },
];

const STEPS = [
  { key: "s1", n: "1", bg: "bg-primary-fixed/60" },
  { key: "s2", n: "2", bg: "bg-secondary-fixed/60" },
  { key: "s3", n: "3", bg: "bg-primary-fixed" },
];

// Placeholder reviews — replace with real customer reviews
const REVIEWS = [
  { key: "r1", color: "text-primary" },
  { key: "r2", color: "text-secondary" },
  { key: "r3", color: "text-primary" },
];

const TRUST = [
  ["🥘", "everyday"],
  ["🌿", "fresh"],
  ["🎉", "catering"],
  ["💰", "rates"],
];

const H2 =
  "font-heading text-[clamp(22px,3vw,30px)] font-bold tracking-[-0.01em] text-on-surface";

/* ─────────────── page ─────────────── */
export default function HomePage() {
  const { t } = useTranslation();
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [cateringOpen, setCateringOpen] = useState(false);

  return (
    // flex-1 keeps the footer at the bottom (your #root is a flex column)
    <main className="flex-1 bg-surface">
      {/* ────────────── HERO ────────────── */}
      <section className="relative overflow-hidden bg-linear-to-br from-surface-container-highest via-surface-container-low to-white px-8 pb-14 pt-16">
        {/* Ambient orbs */}
        <div className="pointer-events-none absolute -right-20 -top-20 size-[340px] rounded-full bg-primary-fixed-dim/30 blur-[60px]" />
        <div className="pointer-events-none absolute -bottom-14 -left-14 size-[260px] rounded-full bg-secondary-container/15 blur-[50px]" />

        <div className="relative mx-auto grid max-w-[1200px] items-center gap-12 md:grid-cols-2">
          {/* Left copy */}
          <div>
            <Badge className="bg-surface-container-highest text-secondary">
              {t("home.hero.badge")}
            </Badge>
            <h1 className="mb-4 mt-4 font-heading text-[clamp(32px,5vw,52px)] font-bold leading-[1.1] tracking-[-0.02em] text-on-surface">
              {t("home.hero.title1")}
              <br />
              <span className="mt-4 block italic text-primary-container">
                {t("home.hero.title2")}
              </span>
            </h1>
            <p className="mb-7 max-w-[480px] text-[15px] leading-[1.7] text-on-surface-variant">
              {t("home.hero.desc")}
            </p>

            <div className="mb-8 flex flex-wrap gap-3">
              <Btn href={waLink(t("wa.enquiry"))}>
                {t("home.hero.btnWhatsapp")}
              </Btn>
              <Btn to="/about" variant="outline">
                {t("home.hero.btnAbout")}
              </Btn>
            </div>

            {/* Trust badges */}
            <div className="grid max-w-[420px] grid-cols-2 gap-2">
              {TRUST.map(([icon, k]) => (
                <div
                  key={k}
                  className="flex items-center gap-2 rounded-md border border-outline-variant bg-white/90 px-3 py-2 text-xs font-semibold text-on-surface shadow-card"
                >
                  <span className="text-base">{icon}</span>
                  {t(`home.hero.trust.${k}`)}
                </div>
              ))}
            </div>
          </div>

          {/* Right image */}
          <div className="relative">
            <div className="pointer-events-none absolute -inset-4 rounded-xl bg-linear-to-br from-primary-fixed to-secondary-container opacity-35 blur-[30px]" />
            <div className="relative overflow-hidden rounded-xl shadow-[0_20px_50px_rgba(43,29,20,0.15)]">
              <img
                src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=700&q=80"
                alt={t("home.hero.imgAlt")}
                className="h-[400px] w-full object-cover object-center"
              />
              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-md bg-white/95 px-3.5 py-2.5 shadow-card backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-tertiary" />
                  <span className="text-[13px] font-semibold">
                    {t("home.hero.freshDaily")}
                  </span>
                </div>
                <span className="rounded-full bg-secondary-container/20 px-2.5 py-[3px] text-[11px] font-bold text-secondary">
                  {t("home.hero.homestyle")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────── SERVICES ────────────── */}
      <section className="bg-surface px-8 py-16">
        <Reveal className="mx-auto max-w-[1200px]">
          <Badge>{t("home.services.badge")}</Badge>
          <h2 className={`${H2} mb-8 mt-2`}>{t("home.services.title")}</h2>

          <div className="grid items-stretch gap-6 lg:grid-cols-[5fr_3fr]">
            {/* Primary service */}
            <Card className="group">
              <div className="relative h-[280px] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&q=80"
                  alt={t("home.services.primaryImgAlt")}
                  className="size-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute left-3 top-3 rounded-full bg-primary-container px-3 py-1 text-[11px] font-bold text-white">
                  {t("home.services.primaryTag")}
                </div>
              </div>
              <div className="p-6">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <h3 className="font-heading text-[22px] font-bold text-on-surface">
                    {t("home.services.primaryTitle")}
                  </h3>
                  <span className="shrink-0 rounded-md bg-secondary-container/20 px-2.5 py-1 text-[11px] font-semibold text-secondary">
                    {t("home.services.primaryMeals")}
                  </span>
                </div>
                <p className="mb-4 text-[13.5px] leading-[1.7] text-on-surface-variant">
                  {t("home.services.primaryDesc")}
                </p>
                <div className="mb-5 flex flex-wrap gap-2">
                  {["f1", "f2", "f3"].map((f) => (
                    <span
                      key={f}
                      className="flex items-center gap-1.5 rounded-full bg-surface-container-highest px-3 py-[5px] text-xs text-on-surface-variant"
                    >
                      <span className="text-tertiary">✓</span>
                      {t(`home.services.${f}`)}
                    </span>
                  ))}
                </div>
                <Btn onClick={() => setEnquiryOpen(true)}>
                  {t("home.services.primaryCta")}
                </Btn>
              </div>
            </Card>

            {/* Catering */}
            <Card className="group">
              <div className="relative h-[220px] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80"
                  alt={t("home.services.cateringImgAlt")}
                  className="size-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-on-surface">
                  {t("home.services.cateringTag")}
                </div>
              </div>
              <div className="p-5">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <h3 className="font-heading text-xl font-bold text-on-surface">
                    {t("home.services.cateringTitle")}
                  </h3>
                  <span className="text-[11px] text-on-surface-variant">
                    {t("home.services.cateringPax")}
                  </span>
                </div>
                <p className="mb-4 text-[13px] leading-[1.7] text-on-surface-variant">
                  {t("home.services.cateringDesc")}
                </p>
                <ul className="mb-5 flex list-none flex-col gap-1.5 p-0">
                  {[
                    ["🍽", "c1"],
                    ["✅", "c2"],
                    ["⏰", "c3"],
                  ].map(([icon, k]) => (
                    <li
                      key={k}
                      className="flex gap-2 text-[12.5px] text-on-surface-variant"
                    >
                      <span>{icon}</span>
                      <span>{t(`home.services.${k}`)}</span>
                    </li>
                  ))}
                </ul>
                <Btn
                  onClick={() => setCateringOpen(true)}
                  variant="outline"
                >
                  {t("home.services.cateringCta")}
                </Btn>
              </div>
            </Card>
          </div>
        </Reveal>
      </section>

      {/* ────────────── DISHES ────────────── */}
      <section className="bg-surface-container-low px-8 py-16">
        <Reveal className="mx-auto max-w-[1200px]">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
            <div>
              <Badge>{t("home.dishes.badge")}</Badge>
              <h2 className={`${H2} mt-2`}>{t("home.dishes.title")}</h2>
            </div>
            <Btn href={waLink(t("wa.menu"))} variant="green" size="sm">
              {t("home.dishes.askMenu")}
            </Btn>
          </div>

          {/* Seasonal notice */}
          <div className="mb-6 flex items-start gap-4 rounded-md border border-outline-variant bg-surface-container-lowest px-5 py-4 shadow-card">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary-container/20 text-xl">
              ℹ️
            </div>
            <div>
              <div className="mb-1 font-heading text-sm font-semibold text-on-surface">
                {t("home.dishes.noticeTitle")}
              </div>
              <div className="text-[12.5px] leading-[1.6] text-on-surface-variant">
                {t("home.dishes.noticeBody")}
              </div>
            </div>
          </div>

          {/* Dish grid */}
          <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5">
            {DISHES.map((dish) => {
              const title = t(`home.dishes.${dish.key}.title`);
              return (
                <Card
                  key={dish.key}
                  className="group flex flex-col justify-between"
                >
                  <div className="relative h-[180px] overflow-hidden">
                    <img
                      src={dish.img}
                      alt={title}
                      loading="lazy"
                      className="size-full object-cover transition duration-500 group-hover:scale-[1.08]"
                    />
                    <div
                      className={`absolute left-2.5 top-2.5 rounded-md px-2.5 py-[3px] text-[10px] font-bold ${dish.tagClass}`}
                    >
                      {t(`home.dishes.${dish.key}.tag`)}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="mb-1.5 flex items-center justify-between gap-2">
                      <h3 className="font-heading text-[15px] font-semibold text-on-surface">
                        {title}
                      </h3>
                      
                    </div>
                    <p className="mb-2.5 text-[12.5px] leading-[1.6] text-on-surface-variant">
                      {t(`home.dishes.${dish.key}.desc`)}
                    </p>
                    <span
                      className={`rounded-md px-2.5 py-[3px] text-[11px] font-semibold ${dish.badgeClass}`}
                    >
                      {t(`home.dishes.${dish.key}.badge`)}
                    </span>
                  </div>
                  
                </Card>
              );
            })}

          </div>
        </Reveal>
      </section>

      {/* ────────────── HOW IT WORKS ────────────── */}
      <section className="bg-surface px-8 py-16">
        <Reveal className="mx-auto max-w-[1200px]">
          <div className="mx-auto mb-10 max-w-[560px] text-center">
            <Badge>{t("home.how.badge")}</Badge>
            <h2 className={`${H2} mb-2 mt-2`}>{t("home.how.title")}</h2>
            <p className="text-sm text-on-surface-variant">
              {t("home.how.desc")}
            </p>
          </div>

          <div className="mb-8 grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5">
            {STEPS.map((step) => (
              <Card key={step.key} className="p-6">
                <div
                  className={`mb-4 flex size-12 items-center justify-center rounded-full font-heading text-xl font-bold text-primary ${step.bg}`}
                >
                  {step.n}
                </div>
                <h3 className="mb-2 font-heading text-base font-semibold text-on-surface">
                  {t(`home.how.${step.key}.title`)}
                </h3>
                <p className="mb-4 text-[13px] leading-[1.7] text-on-surface-variant">
                  {t(`home.how.${step.key}.body`)}
                </p>
                <span className="text-xs font-semibold text-secondary">
                  {t(`home.how.${step.key}.note`)}
                </span>
              </Card>
            ))}
          </div>

          {/* CTA strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-outline-variant bg-surface-container-highest px-8 py-6">
            <div className="flex items-center gap-4">
              <span className="text-4xl">⏰</span>
              <div>
                <div className="font-heading text-base font-semibold text-on-surface">
                  {t("home.how.ctaTitle")}
                </div>
                <div className="text-[12.5px] text-on-surface-variant">
                  {t("home.how.ctaDesc")}
                </div>
              </div>
            </div>
            <Btn onClick={() => setEnquiryOpen(true)}>
              {t("home.how.ctaBtn")}
            </Btn>
          </div>
        </Reveal>
      </section>

      {/* ────────────── WHY CHOOSE US ────────────── */}
      <section className="bg-surface-container-low px-8 py-16">
        <Reveal className="mx-auto max-w-[1200px]">
          <Badge>{t("home.why.badge")}</Badge>
          <h2 className={`${H2} mb-8 mt-2`}>{t("home.why.title")}</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">
            {PILLARS.map((p) => (
              <Card key={p.key} className="p-6">
                <div
                  className={`mb-3.5 flex size-[42px] items-center justify-center rounded-full text-xl ${p.bg}`}
                >
                  {p.icon}
                </div>
                <h3 className="mb-1.5 font-heading text-[15px] font-semibold text-on-surface">
                  {t(`home.why.${p.key}.title`)}
                </h3>
                <p className="text-[12.5px] leading-[1.7] text-on-surface-variant">
                  {t(`home.why.${p.key}.desc`)}
                </p>
              </Card>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ────────────── REVIEWS ────────────── */}
      <section className="bg-surface px-8 py-16">
        <Reveal className="mx-auto max-w-[1200px]">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="mb-1.5 flex flex-wrap items-center gap-2">
                <span className="text-lg text-amber-500" aria-hidden="true">
                  ★★★★★
                </span>
                <span className="font-heading text-[15px] font-bold text-on-surface">
                  {t("home.reviews.rating")}
                </span>
                <span className="text-[12.5px] text-on-surface-variant">
                  {t("home.reviews.regulars")}
                </span>
              </div>
              <h2 className={H2}>{t("home.reviews.title")}</h2>
            </div>
            <div className="flex gap-2.5">
              <Link
                to="/about"
                className="rounded-full bg-surface-container-highest px-[18px] py-2 text-[13px] font-semibold text-on-surface no-underline transition hover:bg-surface-container-high"
              >
                {t("home.reviews.learn")}
              </Link>
              <Btn href={waLink(t("wa.general"))} variant="green" size="sm">
                {t("home.reviews.whatsapp")}
              </Btn>
            </div>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
            {REVIEWS.map((r) => (
              <Card key={r.key} className="flex flex-col justify-between p-6">
                <div>
                  <span
                    className="text-base text-amber-500"
                    aria-label={t("home.reviews.stars")}
                  >
                    ★★★★★
                  </span>
                  <p className="mb-5 mt-3 text-[13.5px] italic leading-[1.75] text-on-surface">
                    {t(`home.reviews.${r.key}.text`)}
                  </p>
                </div>
                <div className="flex items-center gap-3 border-t border-surface-container-highest pt-3.5">
                  <div
                    className={`flex size-10 shrink-0 items-center justify-center rounded-full bg-surface-container-highest font-heading text-base font-bold ${r.color}`}
                  >
                    {t(`home.reviews.${r.key}.initial`)}
                  </div>
                  <div>
                    <div className="text-[13px] font-bold text-on-surface">
                      {t(`home.reviews.${r.key}.name`)}
                    </div>
                    <div className="text-[11.5px] text-on-surface-variant">
                      {t(`home.reviews.${r.key}.sub`)}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ────────────── CTA BANNER ────────────── */}
      <section className="bg-linear-to-br from-primary to-primary-container px-8 py-16">
        <div className="mx-auto grid max-w-[1200px] items-center gap-8 md:grid-cols-[1fr_auto]">
          <div>
            <Badge className="bg-primary-fixed/25 text-primary-fixed">
              {t("home.cta.badge")}
            </Badge>
            <h2 className="my-3 font-heading text-[clamp(22px,3.5vw,32px)] font-bold tracking-[-0.01em] text-white">
              {t("home.cta.title")}
            </h2>
            <p className="max-w-[560px] text-[14.5px] leading-[1.7] text-primary-fixed">
              {t("home.cta.desc")}
            </p>
          </div>
          <div className="flex min-w-[220px] flex-col gap-3">
            <Btn to="/about" variant="white" size="block">
              {t("home.cta.story")}
            </Btn>
            <Btn href={waLink(t("wa.general"))} variant="green" size="block">
              {t("home.cta.whatsapp")}
            </Btn>
          </div>
        </div>
      </section>
      <TiffinEnquiryForm
        open={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
      />
      <CateringEnquiryForm
        open={cateringOpen}
        onClose={() => setCateringOpen(false)}
      />
    </main>
  );
}
