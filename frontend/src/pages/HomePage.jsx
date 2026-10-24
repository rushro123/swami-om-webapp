import { Link } from "react-router-dom";
import { Badge, Btn, Card, VegDot, Reveal, waLink } from "../components/ui";

/* ─────────────── data ─────────────── */
const DISHES = [
  {
    tag: "Frequently Served",
    tagClass: "bg-secondary text-white",
    img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80",
    title: "Regular Vegetarian Thali",
    desc: "3 Handcrafted Phulkas, Dal Tadka, Seasonal Daily Sabzi, Steamed Rice, Fresh Kachumber Salad & Lemon.",
    badge: "Balanced Everyday Nutrition",
    badgeClass: "bg-secondary-container/20 text-secondary",
  },
  {
    tag: "Weekend Special",
    tagClass: "bg-primary-container text-white",
    img: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600&q=80",
    title: "Special Sunday Thali",
    desc: "Rich Shahi Paneer, Hot Poori or Methi Paratha, Dal Makhani, Peas Pulao, and warm Gulab Jamun.",
    badge: "Festive Weekend Treat",
    badgeClass: "bg-primary/8 text-primary",
  },
  {
    tag: "Daily Favorite",
    tagClass: "bg-secondary text-white",
    img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80",
    title: "Dal-Rice Comfort Meal",
    desc: "Homestyle Yellow Arhar Dal tempered with pure cow ghee & hing, Jeera Rice, roasted papad & pickle.",
    badge: "Light & Soothing",
    badgeClass: "bg-secondary-container/20 text-secondary",
  },
  {
    tag: "Breakfast & Tiffin",
    tagClass: "bg-on-surface-variant text-white",
    img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=80",
    title: "Stuffed Paratha Box",
    desc: "2 Aloo / Gobhi / Paneer Parathas with creamy set curd, fresh butter and spicy lime pickle.",
    badge: "Morning & Lunch",
    badgeClass: "bg-surface-container-highest text-on-surface-variant",
  },
  {
    tag: "Availability Varies",
    tagClass: "bg-on-surface-variant text-white",
    img: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&q=80",
    title: "Homestyle Seasonal Sabzi",
    desc: "Daily rotations: Bhindi Masala, Aloo Gobhi Adraki, Methi Matar Malai, or Lauki Chana Dal.",
    badge: "100% Market-Fresh Daily",
    badgeClass: "bg-secondary-container/20 text-secondary",
  },
];

const PILLARS = [
  {
    icon: "🥗",
    bg: "bg-secondary-container/15",
    title: "Low-Oil Healthy Cooking",
    desc: "No heavy food colors, no artificial tasting powders, strictly measured healthy oils.",
  },
  {
    icon: "📅",
    bg: "bg-primary-fixed",
    title: "Flexible Meal Plans",
    desc: "Daily trials, 15-day passes, or full monthly subscriptions. Pause anytime via WhatsApp.",
  },
  {
    icon: "🛵",
    bg: "bg-secondary-container/15",
    title: "Reliable Local Delivery",
    desc: "Prompt delivery slots for lunchtime and dinner. Thermal insulation keeps meals warm.",
  },
  {
    icon: "💸",
    bg: "bg-primary-fixed",
    title: "Fair Transparent Pricing",
    desc: "Clear monthly estimates based on your route distance. Zero hidden platform charges.",
  },
  {
    icon: "🎉",
    bg: "bg-secondary-container/15",
    title: "Catering for Special Days",
    desc: "House gatherings, poojas, and birthday parties with heartfelt traditional meals.",
  },
  {
    icon: "💬",
    bg: "bg-primary-fixed",
    title: "Direct Cook Communication",
    desc: "No chatbots — WhatsApp our kitchen directly for spice requests or timing updates.",
  },
];

const STEPS = [
  {
    n: "1",
    bg: "bg-primary-fixed/60",
    title: "Tell Us Your Details",
    body: "Share your address, which meals you need (Lunch, Dinner, or both), dietary restrictions, and preferred starting date.",
    note: "📍 Check Delivery Coverage",
  },
  {
    n: "2",
    bg: "bg-secondary-fixed/60",
    title: "We Discuss Menu & Pricing",
    body: "We confirm delivery logistics, share weekly menus, and provide a fair rate quote tailored to your distance.",
    note: "🧾 Honest, Transparent Estimates",
  },
  {
    n: "3",
    bg: "bg-primary-fixed",
    title: "Confirm & Enjoy Warm Meals",
    body: "Start right away! Pause deliveries anytime before 9 AM if traveling without losing meal credits.",
    note: "✅ Pause / Skip Meals Anytime",
  },
];

// Placeholder reviews — replace with real customer reviews
const REVIEWS = [
  {
    initial: "R",
    color: "text-primary",
    text: '"Being away from home for my tech job, I missed simple dal-roti. Swami Om\'s tiffin has been a lifesaver for 6 months. Truly light on the stomach, never greasy!"',
    name: "Rahul Sharma",
    sub: "Daily Dinner Subscriber · 2 weeks ago",
  },
  {
    initial: "P",
    color: "text-secondary",
    text: '"Ordered catering for 35 relatives for our Griha Pravesh pooja. Everyone praised the satvik paneer, pooris, and gulab jamun. Honest homestyle taste!"',
    name: "Pooja Kulkarni",
    sub: "Event Catering · 1 month ago",
  },
  {
    initial: "A",
    color: "text-primary",
    text: '"The ability to pause and skip days via WhatsApp is so convenient. Highly recommended for students and office folks who want home-cooked meals."',
    name: "Amit Saxena",
    sub: "Monthly Tiffin Member · 3 weeks ago",
  },
];

const H2 =
  "font-heading text-[clamp(22px,3vw,30px)] font-bold tracking-[-0.01em] text-on-surface";

/* ─────────────── page ─────────────── */
export default function HomePage() {
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
              🍲 Traditional Kitchen Warmth
            </Badge>
            <h1 className="mb-4 mt-4 font-heading text-[clamp(32px,5vw,52px)] font-bold leading-[1.1] tracking-[-0.02em] text-on-surface">
              Homemade Meals,
              <br />
              <span className="italic text-primary-container">
                Made with Care.
              </span>
            </h1>
            <p className="mb-7 max-w-[480px] text-[15px] leading-[1.7] text-on-surface-variant">
              Authentic Maharashtrian home cooking delivered to your doorstep.
              Pure vegetarian meals made fresh daily — आईच्या हातचं जेवण.
            </p>

            <div className="mb-8 flex flex-wrap gap-3">
              <Btn
                href={waLink(
                  "Hi Swami Om, I want to enquire about your tiffin service.",
                )}
              >
                💬 WhatsApp Enquiry
              </Btn>
              <Btn to="/about" variant="outline">
                🙏 About Us
              </Btn>
            </div>

            {/* Trust badges */}
            <div className="grid max-w-[420px] grid-cols-2 gap-2">
              {[
                ["🥘", "Everyday Tiffin"],
                ["🌿", "Fresh & Homestyle"],
                ["🎉", "Special Catering"],
                ["💰", "Transparent Rates"],
              ].map(([icon, label]) => (
                <div
                  key={label}
                  className="flex items-center gap-2 rounded-md border border-outline-variant bg-white/90 px-3 py-2 text-xs font-semibold text-on-surface shadow-card"
                >
                  <span className="text-base">{icon}</span>
                  {label}
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
                alt="Traditional Indian thali"
                className="h-[400px] w-full object-cover object-center"
              />
              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-md bg-white/95 px-3.5 py-2.5 shadow-card backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-tertiary" />
                  <span className="text-[13px] font-semibold">
                    Freshly Prepared Daily
                  </span>
                </div>
                <span className="rounded-full bg-secondary-container/20 px-2.5 py-[3px] text-[11px] font-bold text-secondary">
                  100% Homestyle
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────── SERVICES ────────────── */}
      <section className="bg-surface px-8 py-16">
        <Reveal className="mx-auto max-w-[1200px]">
          <Badge>Tailored Kitchen Services</Badge>
          <h2 className={`${H2} mb-8 mt-2`}>
            Wholesome Meals For Every Daily Routine
          </h2>

          <div className="grid items-stretch gap-6 lg:grid-cols-[5fr_3fr]">
            {/* Primary service */}
            <Card className="group">
              <div className="relative h-[280px] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&q=80"
                  alt="Daily tiffin"
                  className="size-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute left-3 top-3 rounded-full bg-primary-container px-3 py-1 text-[11px] font-bold text-white">
                  ⭐ Primary Offering
                </div>
              </div>
              <div className="p-6">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <h3 className="font-heading text-[22px] font-bold text-on-surface">
                    Daily Tiffin Service
                  </h3>
                  <span className="shrink-0 rounded-md bg-secondary-container/20 px-2.5 py-1 text-[11px] font-semibold text-secondary">
                    Lunch & Dinner
                  </span>
                </div>
                <p className="mb-4 text-[13.5px] leading-[1.7] text-on-surface-variant">
                  Regular wholesome meals for students, IT professionals,
                  bachelors, and elderly families. Warm handmade phulkas,
                  home-churned dal, light seasonal sabzi, and fragrant rice.
                  Transparent monthly & daily plans without long lock-ins.
                </p>
                <div className="mb-5 flex flex-wrap gap-2">
                  {[
                    "Low-oil preparation",
                    "Custom spice levels",
                    "Pause / Resume flexibly",
                  ].map((f) => (
                    <span
                      key={f}
                      className="flex items-center gap-1.5 rounded-full bg-surface-container-highest px-3 py-[5px] text-xs text-on-surface-variant"
                    >
                      <span className="text-tertiary">✓</span>
                      {f}
                    </span>
                  ))}
                </div>
                <Btn to="/enquiry">Enquire for Tiffin →</Btn>
              </div>
            </Card>

            {/* Catering */}
            <Card className="group">
              <div className="relative h-[220px] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80"
                  alt="Catering"
                  className="size-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-on-surface">
                  Advance Booking
                </div>
              </div>
              <div className="p-5">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <h3 className="font-heading text-xl font-bold text-on-surface">
                    Catering Services
                  </h3>
                  <span className="text-[11px] text-on-surface-variant">
                    15 to 150 Pax
                  </span>
                </div>
                <p className="mb-4 text-[13px] leading-[1.7] text-on-surface-variant">
                  Food for housewarmings, birthday celebrations, poojas, and
                  weekend gatherings. Warm, authentic party spreads with genuine
                  mother's hand touch.
                </p>
                <ul className="mb-5 flex list-none flex-col gap-1.5 p-0">
                  {[
                    ["🍽", "Bespoke Indian menus (North & South)"],
                    ["✅", "Fresh cold-pressed oils & hand-ground masalas"],
                    ["⏰", "Minimum 48 hours advance notice required"],
                  ].map(([icon, txt]) => (
                    <li
                      key={txt}
                      className="flex gap-2 text-[12.5px] text-on-surface-variant"
                    >
                      <span>{icon}</span>
                      <span>{txt}</span>
                    </li>
                  ))}
                </ul>
                <Btn to="/enquiry" variant="outline">
                  Plan Your Catering →
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
              <Badge>Authentic Indian Flavors</Badge>
              <h2 className={`${H2} mt-2`}>
                Frequently Served Homestyle Dishes
              </h2>
            </div>
            <Btn
              href={waLink("Hi Swami Om, what is today's menu?")}
              variant="green"
              size="sm"
            >
              💬 Ask Today's Menu via WhatsApp
            </Btn>
          </div>

          {/* Seasonal notice */}
          <div className="mb-6 flex items-start gap-4 rounded-md border border-outline-variant bg-surface-container-lowest px-5 py-4 shadow-card">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary-container/20 text-xl">
              ℹ️
            </div>
            <div>
              <div className="mb-1 font-heading text-sm font-semibold text-on-surface">
                Seasonal Daily Rotation
              </div>
              <div className="text-[12.5px] leading-[1.6] text-on-surface-variant">
                Our kitchen runs strictly on seasonal bazaar sourcing without
                frozen preservatives. Contact us every morning by 10:00 AM to
                see today's curated lunch sabzis!
              </div>
            </div>
          </div>

          {/* Dish grid */}
          <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5">
            {DISHES.map((dish) => (
              <Card
                key={dish.title}
                className="group flex flex-col justify-between"
              >
                <div className="relative h-[180px] overflow-hidden">
                  <img
                    src={dish.img}
                    alt={dish.title}
                    loading="lazy"
                    className="size-full object-cover transition duration-500 group-hover:scale-[1.08]"
                  />
                  <div
                    className={`absolute left-2.5 top-2.5 rounded-md px-2.5 py-[3px] text-[10px] font-bold ${dish.tagClass}`}
                  >
                    {dish.tag}
                  </div>
                </div>
                <div className="p-4">
                  <div className="mb-1.5 flex items-center justify-between gap-2">
                    <h3 className="font-heading text-[15px] font-semibold text-on-surface">
                      {dish.title}
                    </h3>
                    <VegDot />
                  </div>
                  <p className="mb-2.5 text-[12.5px] leading-[1.6] text-on-surface-variant">
                    {dish.desc}
                  </p>
                  <span
                    className={`rounded-md px-2.5 py-[3px] text-[11px] font-semibold ${dish.badgeClass}`}
                  >
                    {dish.badge}
                  </span>
                </div>
                <div className="px-4 pb-4">
                  <Link
                    to="/enquiry"
                    className="block rounded-full border-[1.5px] border-outline-variant py-[9px] text-center text-[12.5px] font-semibold text-primary no-underline transition hover:border-primary-container hover:bg-primary-container hover:text-white"
                  >
                    Request in Plan
                  </Link>
                </div>
              </Card>
            ))}

            {/* Custom tiffin card */}
            <div className="flex flex-col justify-between rounded-lg border border-outline-variant bg-linear-to-br from-primary-fixed to-surface-container-highest p-6">
              <div>
                <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary-container text-[22px]">
                  🥣
                </div>
                <h3 className="mb-2 font-heading text-base font-bold text-on-surface">
                  Dietary Needs or Custom Tiffin?
                </h3>
                <p className="text-[12.5px] leading-[1.6] text-on-surface-variant">
                  Require Jain meals, diabetic-friendly low-carb rotis, or extra
                  protein bowls? Just tell us your diet preferences.
                </p>
              </div>
              <div className="mt-5">
                <Btn
                  href={waLink(
                    "Hi Swami Om, I have a dietary requirement for my tiffin.",
                  )}
                  size="xs"
                >
                  Tell Us Your Preference →
                </Btn>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ────────────── HOW IT WORKS ────────────── */}
      <section className="bg-surface px-8 py-16">
        <Reveal className="mx-auto max-w-[1200px]">
          <div className="mx-auto mb-10 max-w-[560px] text-center">
            <Badge>Zero Hassle Experience</Badge>
            <h2 className={`${H2} mb-2 mt-2`}>
              Simple Steps to Fresh Home Food
            </h2>
            <p className="text-sm text-on-surface-variant">
              No complicated app subscriptions or lock-ins. Direct, personal
              kitchen coordination.
            </p>
          </div>

          <div className="mb-8 grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5">
            {STEPS.map((step) => (
              <Card key={step.n} className="p-6">
                <div
                  className={`mb-4 flex size-12 items-center justify-center rounded-full font-heading text-xl font-bold text-primary ${step.bg}`}
                >
                  {step.n}
                </div>
                <h3 className="mb-2 font-heading text-base font-semibold text-on-surface">
                  {step.title}
                </h3>
                <p className="mb-4 text-[13px] leading-[1.7] text-on-surface-variant">
                  {step.body}
                </p>
                <span className="text-xs font-semibold text-secondary">
                  {step.note}
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
                  Ready to start today or tomorrow?
                </div>
                <div className="text-[12.5px] text-on-surface-variant">
                  Next-day meal activations cut off at 8:00 PM every evening.
                </div>
              </div>
            </div>
            <Btn to="/enquiry">Submit Quick Enquiry →</Btn>
          </div>
        </Reveal>
      </section>

      {/* ────────────── WHY CHOOSE US ────────────── */}
      <section className="bg-surface-container-low px-8 py-16">
        <Reveal className="mx-auto max-w-[1200px]">
          <Badge>Our Food Philosophy</Badge>
          <h2 className={`${H2} mb-8 mt-2`}>
            Why Neighborhoods Trust Swami Om
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">
            {PILLARS.map((p) => (
              <Card key={p.title} className="p-6">
                <div
                  className={`mb-3.5 flex size-[42px] items-center justify-center rounded-full text-xl ${p.bg}`}
                >
                  {p.icon}
                </div>
                <h3 className="mb-1.5 font-heading text-[15px] font-semibold text-on-surface">
                  {p.title}
                </h3>
                <p className="text-[12.5px] leading-[1.7] text-on-surface-variant">
                  {p.desc}
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
                  4.9 / 5.0
                </span>
                <span className="text-[12.5px] text-on-surface-variant">
                  (180+ Local Regulars)
                </span>
              </div>
              <h2 className={H2}>Loved By Daily Diners</h2>
            </div>
            <div className="flex gap-2.5">
              <Link
                to="/about"
                className="rounded-full bg-surface-container-highest px-[18px] py-2 text-[13px] font-semibold text-on-surface no-underline transition hover:bg-surface-container-high"
              >
                Learn About Us
              </Link>
              <Btn href={waLink()} variant="green" size="sm">
                💬 WhatsApp Us
              </Btn>
            </div>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
            {REVIEWS.map((r) => (
              <Card key={r.name} className="flex flex-col justify-between p-6">
                <div>
                  <span
                    className="text-base text-amber-500"
                    aria-label="5 out of 5 stars"
                  >
                    ★★★★★
                  </span>
                  <p className="mb-5 mt-3 text-[13.5px] italic leading-[1.75] text-on-surface">
                    {r.text}
                  </p>
                </div>
                <div className="flex items-center gap-3 border-t border-surface-container-highest pt-3.5">
                  <div
                    className={`flex size-10 shrink-0 items-center justify-center rounded-full bg-surface-container-highest font-heading text-base font-bold ${r.color}`}
                  >
                    {r.initial}
                  </div>
                  <div>
                    <div className="text-[13px] font-bold text-on-surface">
                      {r.name}
                    </div>
                    <div className="text-[11.5px] text-on-surface-variant">
                      {r.sub}
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
              Personal Kitchen Care
            </Badge>
            <h2 className="my-3 font-heading text-[clamp(22px,3.5vw,32px)] font-bold tracking-[-0.01em] text-white">
              Craving Genuine Ghar Ka Khana Today?
            </h2>
            <p className="max-w-[560px] text-[14.5px] leading-[1.7] text-primary-fixed">
              Tell us your preferred address and whether you need lunch, dinner,
              or custom party boxes. We'll verify delivery availability and send
              fresh menu options right away.
            </p>
          </div>
          <div className="flex min-w-[220px] flex-col gap-3">
            <Btn to="/about" variant="white" size="block">
              🙏 Know Our Story
            </Btn>
            <Btn href={waLink()} variant="green" size="block">
              💬 WhatsApp Kitchen Directly
            </Btn>
          </div>
        </div>
      </section>
    </main>
  );
}
