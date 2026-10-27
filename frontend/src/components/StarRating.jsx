import { useTranslation } from "react-i18next";

export default function StarRating({ value, onChange }) {
  const { t } = useTranslation();
  return (
    <div className="flex gap-1" role="radiogroup" aria-label={t("rev.rating")}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          type="button"
          key={n}
          role="radio"
          aria-checked={value === n}
          aria-label={`${n} ${t("stars")}`}
          className={`text-2xl leading-none transition ${n <= value ? "text-secondary" : "text-outline-variant"} ${onChange ? "cursor-pointer hover:scale-110" : "cursor-default"}`}
          onClick={() => onChange && onChange(n)}
          disabled={!onChange}
        >
          ★
        </button>
      ))}
    </div>
  );
}
