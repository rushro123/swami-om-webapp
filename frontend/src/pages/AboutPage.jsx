import {
  Badge,
  Btn,
  Card,
  Reveal,
  WhatsAppIcon,
  waLink,
} from "../components/ui";

/* ─────────────── data ───────────────
   NOTE: names, years, numbers and bios below are placeholders from your
   draft. Replace them with your real story before launch. */

const STATS = [
  { val: "8+", label: "Years of Service" },
  { val: "1,200+", label: "Daily Meals Served" },
  { val: "15+", label: "Pune Localities" },
  { val: "100%", label: "Pure Vegetarian" },
];

const VALUES = [
  {
    icon: "🥘",
    bg: "bg-secondary-container/12",
    title: "Pure Vegetarian Always",
    desc: "Every dish at Swami Om is 100% vegetarian — no eggs, no non-veg contamination. Our kitchen, utensils, and ingredients are strictly satvik and pure.",
  },
  {
    icon: "🌿",
    bg: "bg-tertiary/10",
    title: "No Artificial Additives",
    desc: "We use only hand-pounded homemade masalas, cold-pressed groundnut oil, and pure desi ghee. Zero food colors, zero MSG, zero palm oil.",
  },
  {
    icon: "🏠",
    bg: "bg-primary/8",
    title: "Cooked Like Home",
    desc: "Our kitchen follows the same recipes used in traditional Pune households — slow-cooked Katachi Amti, soft hand-pressed phulkas, and seasonal bhajis.",
  },
  {
    icon: "📅",
    bg: "bg-secondary-container/12",
    title: "Fresh Every Meal",
    desc: "We cook fresh twice daily — morning batch for lunch tiffins and evening batch for dinner. Meals are never reheated or stored overnight.",
  },
  {
    icon: "💛",
    bg: "bg-tertiary/10",
    title: "Honest Pricing",
    desc: "No hidden charges, no intermediary platform fees. You pay directly for your food and delivery. Simple, fair, transparent — always.",
  },
  {
    icon: "🤝",
    bg: "bg-primary/8",
    title: "Personal Care",
    desc: "We remember your preferences, pause your subscription when you travel, and adjust spice levels on request — because you're not a customer, you're family.",
  },
];

const TEAM = [
  {
    name: "Sudha Tai",
    role: "Head Cook & Founder",
    initials: "ST",
    color: "text-primary",
    bio: "With 30+ years of home cooking experience in Kothrud, Sudha Tai started Swami Om to bring authentic Maharashtrian taste to working professionals and students who miss home-cooked food.",
  },
  {
    name: "Santosh Bhaiya",
    role: "Delivery & Operations",
    initials: "SB",
    color: "text-tertiary",
    bio: "Managing timely dispatch across all Pune delivery routes since 2018. Santosh ensures your tiffin reaches you hot and on time, every single day.",
  },
  {
    name: "Priya Tai",
    role: "Catering & Events Coordinator",
    initials: "PT",
    color: "text-secondary",
    bio: "Priya handles all catering enquiries, manages special event menus, and ensures every family function we cater for feels like a personal celebration.",
  },
];

const MILESTONES = [
  {
    year: "2016",
    label: "Founded in Kothrud",
    desc: "Started with 5 tiffin subscriptions to neighbors",
  },
  {
    year: "2018",
    label: "50+ daily subscribers",
    desc: "Expanded delivery across Kothrud & Karve Nagar",
  },
  {
    year: "2020",
    label: "Community Support",
    desc: "Served 300+ families through the pandemic with home delivery",
  },
  {
    year: "2022",
    label: "Catering Launch",
    desc: "Added corporate office lunch catering to IT parks",
  },
  {
    year: "2024",
    label: "1,200+ Daily Meals",
    desc: "Serving 1,200+ meals daily across 15+ Pune localities",
  },
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
  return (
    <main className="flex-1 bg-surface pb-16">
      {/* ── HERO BANNER ── */}
      <section className="relative overflow-hidden border-b border-outline-variant bg-linear-to-br from-surface-container-highest to-surface-container-low px-6 py-[clamp(3rem,8vw,5rem)]">
        <div className="pointer-events-none absolute -right-16 -top-16 size-[280px] rounded-full bg-primary-fixed-dim/30 blur-[50px]" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 size-[220px] rounded-full bg-secondary-container/12 blur-[40px]" />

        <div className="relative mx-auto max-w-[900px] text-center">
          <Badge size="lg" className="mb-4 bg-primary-fixed text-primary">
            🍲 Our Story & Values
          </Badge>
          <h1 className="mb-5 font-heading text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.15] tracking-[-0.02em] text-primary">
            About Swami Om Tiffin Services
          </h1>
          <p className="mx-auto mb-8 max-w-[680px] text-[clamp(14px,2.2vw,17px)] leading-[1.75] text-on-surface-variant">
            Born in a Kothrud kitchen, built on decades of Maharashtrian
            culinary tradition, and driven by a single belief — every person
            deserves to eat like they're home, no matter how far they've come.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="min-w-[110px] rounded-md border border-outline-variant bg-white/85 px-6 py-4 text-center shadow-card backdrop-blur-sm"
              >
                <div className="font-heading text-[28px] font-extrabold leading-none text-primary">
                  {s.val}
                </div>
                <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.05em] text-on-surface-variant">
                  {s.label}
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
              Our Origin Story
            </Badge>
            <h2 className={`${H2} mb-5 leading-[1.25]`}>
              Started from Sudha Tai's Kitchen in Kothrud
            </h2>
            <div className="flex flex-col gap-3.5">
              <p className={BODY_P}>
                In 2016, Sudha Tai — a homemaker with 30 years of cooking for
                her large joint family in Kothrud — began making tiffins for 5
                students who had moved to Pune from small towns. They missed the
                taste of home-cooked dal, soft phulkas, and the fragrance of
                Goda Masala bhaji.
              </p>
              <p className={BODY_P}>
                Word spread quickly. Within a year, 50 families and working
                professionals were relying on Sudha Tai's kitchen for their
                daily meals. No restaurant could replicate the care that went
                into each stainless steel dabba — the perfectly balanced Katachi
                Amti, the warm Puran Poli on Sundays, the fiery Thecha alongside
                Zunka Bhakar on rainy days.
              </p>
              <p className={BODY_P}>
                Today, Swami Om Tiffin Services prepares over 1,200 meals a day
                — but every meal still carries that same kitchen warmth, the
                same fresh ingredients, and the same commitment that Sudha Tai
                started with in her small home kitchen on Paud Road.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute -inset-3 rounded-xl bg-linear-to-br from-primary-fixed to-secondary-container opacity-30 blur-[24px]" />
            <div className="relative overflow-hidden rounded-xl shadow-[0_20px_50px_rgba(43,29,20,0.15)]">
              <img
                src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=700&q=80"
                alt="Authentic Maharashtrian meal spread"
                loading="lazy"
                className="h-[350px] w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 to-transparent px-5 py-6">
                <p className="m-0 text-[13px] italic text-white">
                  "आईच्या हातचं जेवण" — taste of mother's home cooking,
                  delivered to your door.
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
            badge="Our Commitments"
            badgeClass="bg-primary-fixed text-primary"
            title="What Makes Swami Om Different"
          />
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">
            {VALUES.map((v) => (
              <Card key={v.title} className="p-6">
                <div
                  className={`mb-3 flex size-[50px] items-center justify-center rounded-md text-2xl ${v.bg}`}
                >
                  {v.icon}
                </div>
                <h3 className="mb-2 font-heading text-base font-bold text-on-surface">
                  {v.title}
                </h3>
                <p className="m-0 text-[13px] leading-[1.65] text-on-surface-variant">
                  {v.desc}
                </p>
              </Card>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── JOURNEY TIMELINE ── */}
      <section className="mx-auto mt-14 max-w-[900px] px-6">
        <Reveal>
          <SectionHead
            badge="Our Journey"
            badgeClass="bg-tertiary/10 text-tertiary"
            title="8 Years of Growth in Pune"
          />

          <div className="relative pl-8">
            {/* Vertical line */}
            <div className="absolute bottom-0 left-[0.6rem] top-0 w-0.5 rounded-[1px] bg-linear-to-b from-primary to-tertiary" />

            <div className="flex flex-col gap-8">
              {MILESTONES.map((m, i) => {
                const warm = i % 2 === 0;
                return (
                  <div key={m.year} className="relative pl-4">
                    {/* Dot */}
                    <div
                      className={`absolute -left-[1.85rem] top-1 size-3.5 rounded-full border-2 border-white ring-[3px] ${
                        warm
                          ? "bg-primary ring-primary-fixed"
                          : "bg-tertiary ring-tertiary/20"
                      }`}
                    />
                    <div className="rounded-md border border-outline-variant bg-surface-container-lowest px-5 py-4 shadow-card">
                      <div className="mb-1 flex items-center justify-between gap-3">
                        <span
                          className={`font-heading text-sm font-extrabold ${warm ? "text-primary" : "text-tertiary"}`}
                        >
                          {m.year}
                        </span>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                            warm
                              ? "bg-primary-fixed text-primary"
                              : "bg-tertiary/10 text-tertiary"
                          }`}
                        >
                          {m.label}
                        </span>
                      </div>
                      <p className="m-0 text-[13px] leading-normal text-on-surface-variant">
                        {m.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── TEAM ── */}
      <section className={SECTION}>
        <Reveal>
          <SectionHead
            badge="Meet the People Behind Every Meal"
            badgeClass="bg-secondary-container/20 text-secondary"
            title="Our Dedicated Team"
          />
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6">
            {TEAM.map((t) => (
              <Card key={t.name} className="px-6 py-8 text-center">
                <div
                  className={`mx-auto mb-4 flex size-[72px] items-center justify-center rounded-full bg-surface-container-highest font-heading text-[22px] font-extrabold shadow-[0_4px_12px_rgba(43,29,20,0.1)] ${t.color}`}
                >
                  {t.initials}
                </div>
                <h3 className="mb-1 font-heading text-[17px] font-bold text-on-surface">
                  {t.name}
                </h3>
                <span
                  className={`mb-2.5 inline-block text-[11px] font-bold uppercase tracking-[0.06em] ${t.color}`}
                >
                  {t.role}
                </span>
                <p className="m-0 text-[13px] leading-[1.65] text-on-surface-variant">
                  {t.bio}
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
            Join Our Pune Family
          </Badge>
          <h2 className="mb-3 font-heading text-[clamp(1.5rem,3.5vw,2.25rem)] font-extrabold tracking-[-0.01em] text-white">
            Ready to Experience Ghar Ka Khana?
          </h2>
          <p className="mx-auto mb-7 max-w-[500px] text-sm leading-[1.7] text-primary-fixed">
            WhatsApp us today to start your tiffin subscription or enquire about
            catering for your next event in Pune.
          </p>
          <Btn
            href={waLink(
              "Hi Swami Om, I would like to enquire about your tiffin service.",
            )}
            variant="white"
            size="lg"
          >
            <WhatsAppIcon /> WhatsApp Us Now
          </Btn>
        </div>
      </section>
    </main>
  );
}
