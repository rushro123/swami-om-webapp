import { useTranslation } from "react-i18next";

const LANGS = [
  { code: "en", label: "EN" },
  { code: "mr", label: "मराठी" },
];

export default function LanguageSwitcher({ className = "" }) {
  const { i18n, t } = useTranslation();
  const current = i18n.language;

  return (
    <div
      role="group"
      aria-label={t("nav.language")}
      className={`inline-flex overflow-hidden rounded-full border border-outline-variant bg-white/90 text-xs font-semibold ${className}`}
    >
      {LANGS.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => i18n.changeLanguage(l.code)}
          aria-pressed={current === l.code}
          className={`px-3 py-1.5 transition ${
            current === l.code
              ? "bg-primary-container text-white"
              : "text-on-surface hover:bg-surface-container-high"
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
