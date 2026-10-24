import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

// ── One place for the WhatsApp number (replaces the 9198765… placeholders) ──
export const WHATSAPP_NUMBER = "919763355563";
export const waLink = (text = "") =>
  `https://wa.me/${WHATSAPP_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

const focusRing =
  "focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-tertiary";

/* ── Badge: pass colour classes via `className` ── */
const BADGE_SIZES = {
  sm: "px-3 py-1 text-[11px]",
  md: "px-3.5 py-[5px] text-[11px]",
  lg: "px-[18px] py-1.5 text-xs",
};

export function Badge({
  children,
  size = "md",
  className = "bg-primary-fixed text-primary",
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-body font-semibold uppercase tracking-[0.08em] ${BADGE_SIZES[size]} ${className}`}
    >
      {children}
    </span>
  );
}

/* ── Button / link ──
   href → external link (new tab) · to → react-router Link · neither → <button> */
const BTN_VARIANTS = {
  primary:
    "bg-primary-container text-on-primary shadow-[0_4px_14px_rgba(194,65,12,0.3)] hover:bg-primary",
  outline:
    "border-[1.5px] border-outline-variant bg-surface-container-lowest text-secondary hover:bg-surface-container",
  green:
    "bg-tertiary text-on-tertiary shadow-[0_4px_12px_rgba(36,97,49,0.25)] hover:bg-tertiary-container",
  white:
    "bg-white text-primary shadow-[0_4px_16px_rgba(0,0,0,0.15)] hover:bg-primary-fixed",
};

// Sizes set padding + font size + gap, so don't pass px-/py-/text- through className
const BTN_SIZES = {
  xs: "gap-1.5 px-[18px] py-[9px] text-[12.5px]",
  sm: "gap-1.5 px-[18px] py-2 text-[13px]",
  md: "gap-2 px-6 py-3 text-[13px]",
  block: "gap-2 px-6 py-[13px] text-[13.5px]",
  lg: "gap-2.5 px-[30px] py-3.5 text-sm",
};

export function Btn({
  children,
  href,
  to,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) {
  const cls = `inline-flex items-center justify-center rounded-full font-body font-bold no-underline transition ${BTN_SIZES[size]} ${BTN_VARIANTS[variant]} ${focusRing} ${className}`;
  if (href)
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
        {...props}
      >
        {children}
      </a>
    );
  if (to)
    return (
      <Link to={to} className={cls} {...props}>
        {children}
      </Link>
    );
  return (
    <button type="button" className={`cursor-pointer ${cls}`} {...props}>
      {children}
    </button>
  );
}

/* ── Card ── */
export function Card({ children, className = "" }) {
  return (
    <div
      className={`overflow-hidden rounded-lg border border-outline-variant bg-surface-container-lowest shadow-card ${className}`}
    >
      {children}
    </div>
  );
}

/* ── Veg marker (green dot in a green square) ── */
export function VegDot() {
  return (
    <span
      title="Pure Veg"
      className="inline-flex size-4 shrink-0 items-center justify-center rounded-[3px] border-2 border-tertiary"
    >
      <span className="size-[7px] rounded-full bg-tertiary" />
    </span>
  );
}

/* ── Scroll reveal (replaces the ref/style juggling). Respects reduced motion. ── */
export function Reveal({ children, className = "" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      setShown(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition duration-500 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
        shown ? "translate-y-0 opacity-100" : "translate-y-7 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function WhatsAppIcon({ className = "size-[18px] fill-tertiary" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
