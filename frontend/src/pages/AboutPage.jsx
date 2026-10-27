import { useTranslation } from "react-i18next";
import {
  Badge,
  Btn,
  Card,
  Reveal,
  WhatsAppIcon,
  waLink,
} from "../components/ui";

/* ─────────────── static data (text lives in i18n.js) ─────────────── */

const STATS = [
  { val: "3+", key: "years" },
  { val: "100+", key: "meals" },
  { val: "15+", key: "localities" },
  { val: "Veg + Non-Veg", key: "options" },
];

const VALUES = [
  { key: "v1", icon: "🥘", bg: "bg-secondary-container/12" },
  { key: "v2", icon: "🌿", bg: "bg-tertiary/10" },
  { key: "v3", icon: "🏠", bg: "bg-primary/8" },
  { key: "v4", icon: "📅", bg: "bg-secondary-container/12" },
  { key: "v5", icon: "💛", bg: "bg-tertiary/10" },
  { key: "v6", icon: "🤝", bg: "bg-primary/8" },
];

const TEAM = [
  { key: "t1", color: "text-primary" },
  { key: "t2", color: "text-tertiary" },
  { key: "t3", color: "text-secondary" },
  { key: "t4", color: "text-primary" },
];

const MILESTONES = [
  { key: "m1", year: "2016" },
  { key: "m2", year: "2018" },
  { key: "m3", year: "2020" },
  { key: "m4", year: "2022" },
  { key: "m5", year: "2024" },
];

/* ── repeated class strings ── */
const SECTION = "mx-auto mt-14 max-w-[1100px] px-6";
const H2 =
  "font-heading text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold text-on-surface";
const BODY_P = "m-0 text-sm leading-[1.75] text-on-surface-variant";

function SectionHead({ badge, badgeClass, title }) {
  return (
    <div className="mb-10 text-center">
      <Badge className={`mb-2.5 ${badgeClass}`}>{badge}</Badge>
      <h2 className={`${H2} m-0`}>{title}</h2>
    </div>
  );
}

/* ─────────────── page ─────────────── */
export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <main className="flex-1 bg-surface pb-16">
      {/* ── HERO BANNER ── */}
      <section className="relative overflow-hidden border-b border-outline-variant bg-linear-to-br from-surface-container-highest to-surface-container-low px-6 py-[clamp(3rem,8vw,5rem)]">
        <div className="pointer-events-none absolute -right-16 -top-16 size-[280px] rounded-full bg-primary-fixed-dim/30 blur-[50px]" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 size-[220px] rounded-full bg-secondary-container/12 blur-[40px]" />

        <div className="relative mx-auto max-w-[900px] text-center">
          <Badge size="lg" className="mb-4 bg-primary-fixed text-primary">
            {t("about.hero.badge")}
          </Badge>
          <h1 className="mb-5 font-heading text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.15] tracking-[-0.02em] text-primary">
            {t("about.hero.title")}
          </h1>
          <p className="mx-auto mb-8 max-w-[680px] text-[clamp(14px,2.2vw,17px)] leading-[1.75] text-on-surface-variant">
            {t("about.hero.desc")}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {STATS.map((s) => (
              <div
                key={s.key}
                className="min-w-[110px] rounded-md border border-outline-variant bg-white/85 px-6 py-4 text-center shadow-card backdrop-blur-sm"
              >
                <div className="font-heading text-[28px] font-extrabold leading-none text-primary">
                  {s.val}
                </div>
                <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.05em] text-on-surface-variant">
                  {t(`about.stats.${s.key}`)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ORIGIN STORY ── */}
      <section className={SECTION}>
        <Reveal className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-10">
          <div>
            <Badge
              size="sm"
              className="mb-3 bg-secondary-container/20 text-secondary"
            >
              {t("about.origin.badge")}
            </Badge>
            <h2 className={`${H2} mb-5 leading-[1.25]`}>
              {t("about.origin.title")}
            </h2>
            <div className="flex flex-col gap-3.5">
              <p className={BODY_P}>{t("about.origin.p1")}</p>
              <p className={BODY_P}>{t("about.origin.p2")}</p>
              <p className={BODY_P}>{t("about.origin.p3")}</p>
            </div>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute -inset-3 rounded-xl bg-linear-to-br from-primary-fixed to-secondary-container opacity-30 blur-[24px]" />
            <div className="relative overflow-hidden rounded-xl shadow-[0_20px_50px_rgba(43,29,20,0.15)]">
              <img
                src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=700&q=80"
                alt={t("about.origin.imgAlt")}
                loading="lazy"
                className="h-[350px] w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 to-transparent px-5 py-6">
                <p className="m-0 text-[13px] italic text-white">
                  {t("about.origin.quote")}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── CORE VALUES ── */}
      <section className={SECTION}>
        <Reveal>
          <SectionHead
            badge={t("about.values.badge")}
            badgeClass="bg-primary-fixed text-primary"
            title={t("about.values.title")}
          />
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">
            {VALUES.map((v) => (
              <Card key={v.key} className="p-6">
                <div
                  className={`mb-3 flex size-[50px] items-center justify-center rounded-md text-2xl ${v.bg}`}
                >
                  {v.icon}
                </div>
                <h3 className="mb-2 font-heading text-base font-bold text-on-surface">
                  {t(`about.values.${v.key}.title`)}
                </h3>
                <p className="m-0 text-[13px] leading-[1.65] text-on-surface-variant">
                  {t(`about.values.${v.key}.desc`)}
                </p>
              </Card>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── JOURNEY TIMELINE ── */}
      

      {/* ── TEAM ── */}
      <section className={SECTION}>
        <Reveal>
          <SectionHead
            badge={t("about.team.badge")}
            badgeClass="bg-secondary-container/20 text-secondary"
            title={t("about.team.title")}
          />
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6">
            {TEAM.map((m) => (
              <Card key={m.key} className="px-6 py-8 text-center">
                <div
                  className={`mx-auto mb-4 flex size-[72px] items-center justify-center rounded-full bg-surface-container-highest font-heading text-[22px] font-extrabold shadow-[0_4px_12px_rgba(43,29,20,0.1)] ${m.color}`}
                >
                  {t(`about.team.${m.key}.initials`)}
                </div>
                <h3 className="mb-1 font-heading text-[17px] font-bold text-on-surface">
                  {t(`about.team.${m.key}.name`)}
                </h3>
                <span
                  className={`mb-2.5 inline-block text-[11px] font-bold uppercase tracking-[0.06em] ${m.color}`}
                >
                  {t(`about.team.${m.key}.role`)}
                </span>
                <p className="m-0 text-[13px] leading-[1.65] text-on-surface-variant">
                  {t(`about.team.${m.key}.bio`)}
                </p>
              </Card>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── CTA ── */}
      <section className={SECTION}>
        <div className="rounded-xl bg-linear-to-br from-primary to-primary-container px-8 py-[clamp(2rem,5vw,3rem)] text-center shadow-[0_12px_40px_rgba(155,47,0,0.25)]">
          <Badge className="mb-3 bg-primary-fixed/25 text-primary-fixed">
            {t("about.cta.badge")}
          </Badge>
          <h2 className="mb-3 font-heading text-[clamp(1.5rem,3.5vw,2.25rem)] font-extrabold tracking-[-0.01em] text-white">
            {t("about.cta.title")}
          </h2>
          <p className="mx-auto mb-7 max-w-[500px] text-sm leading-[1.7] text-primary-fixed">
            {t("about.cta.desc")}
          </p>
          <Btn href={waLink(t("wa.enquiry"))} variant="white" size="lg">
            <WhatsAppIcon /> {t("about.cta.btn")}
          </Btn>
        </div>
      </section>
    </main>
  );
}
