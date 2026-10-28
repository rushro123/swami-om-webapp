import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { waLink } from "./ui";

const INITIAL_FORM = {
  name: "",
  phone: "",
  address: "",
  people: "",
  foodType: "veg",
  date: "",
  description: "",
};

const labelClass =
  "flex min-w-0 flex-col gap-1.5 text-sm font-semibold text-on-surface";
const fieldClass =
  "w-full min-w-0 rounded-md bg-surface-container px-3.5 py-3 font-normal outline-none focus-visible:outline-3 focus-visible:outline-tertiary";

// Escaped so it stays valid under the regex `v` flag browsers now use.
const PHONE_PATTERN = "[0-9+ \\-\\(\\)]{10,}";

// Local-date "today" (toISOString uses UTC and can return yesterday in IST).
const todayLocal = () => {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

export default function CateringEnquiryForm({ open, onClose }) {
  const { t } = useTranslation();
  const [form, setForm] = useState(INITIAL_FORM);
  const nameRef = useRef(null);

  // Escape to close, lock background scroll, focus first field.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    nameRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const updatePeople = (event) => {
    const value = event.target.value;
    if (value === "" || (Number(value) >= 1 && Number(value) <= 50)) {
      setForm((current) => ({ ...current, people: value }));
    }
  };

  const submit = (event) => {
    event.preventDefault();
    const message = t("wa.cateringEnquiry", {
      name: form.name.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
      people: form.people,
      foodType: t(`home.cateringForm.foodTypes.${form.foodType}`),
      date: form.date,
      description: form.description.trim(),
    });

    window.open(waLink(message), "_blank", "noopener,noreferrer");
    setForm(INITIAL_FORM);
    onClose();
  };

  // Rendered into document.body so no transformed/clipped ancestor
  // (cards, carousels) can shrink or reposition the modal.
  return createPortal(
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-on-surface/50"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="flex min-h-full items-center justify-center p-4"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
      >
        <div
          // Plain CSS width so theme tokens (max-w-xl etc.) can't collapse it.
          style={{ width: "min(100%, 36rem)" }}
          className="box-border rounded-lg bg-surface-container-lowest p-6 shadow-[0_20px_60px_rgba(43,29,20,0.25)]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="catering-enquiry-title"
        >
          <div className="mb-5 flex min-w-0 items-start justify-between gap-4">
            <div className="min-w-0">
              <h2
                id="catering-enquiry-title"
                className="font-heading text-2xl font-bold text-on-surface"
              >
                {t("home.cateringForm.title")}
              </h2>
              <p className="mt-1 text-sm text-on-surface-variant">
                {t("home.cateringForm.subtitle")}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label={t("home.cateringForm.close")}
              className="rounded-full px-3 py-1 text-2xl leading-none text-on-surface-variant transition hover:bg-surface-container"
            >
              ×
            </button>
          </div>

          <form onSubmit={submit} className="grid min-w-0 grid-cols-1 gap-4">
            <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
              <label className={labelClass}>
                {t("home.cateringForm.name")}
                <input
                  ref={nameRef}
                  value={form.name}
                  onChange={updateField("name")}
                  required
                  autoComplete="name"
                  className={fieldClass}
                />
              </label>
              <label className={labelClass}>
                {t("home.cateringForm.phone")}
                <input
                  type="tel"
                  inputMode="tel"
                  value={form.phone}
                  onChange={updateField("phone")}
                  required
                  pattern={PHONE_PATTERN}
                  autoComplete="tel"
                  className={fieldClass}
                />
              </label>
            </div>

            <label className={labelClass}>
              {t("home.cateringForm.address")}
              <textarea
                value={form.address}
                onChange={updateField("address")}
                required
                rows={3}
                autoComplete="street-address"
                className={`${fieldClass} resize-y`}
              />
            </label>

            <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-3">
              <label className={labelClass}>
                {t("home.cateringForm.people")}
                <input
                  type="number"
                  inputMode="numeric"
                  min="1"
                  max="50"
                  value={form.people}
                  onChange={updatePeople}
                  required
                  className={fieldClass}
                />
              </label>
              <label className={labelClass}>
                {t("home.cateringForm.foodType")}
                <select
                  value={form.foodType}
                  onChange={updateField("foodType")}
                  className={fieldClass}
                >
                  <option value="veg">
                    {t("home.cateringForm.foodTypes.veg")}
                  </option>
                  <option value="nonVeg">
                    {t("home.cateringForm.foodTypes.nonVeg")}
                  </option>
                  <option value="both">
                    {t("home.cateringForm.foodTypes.both")}
                  </option>
                </select>
              </label>
              <label className={labelClass}>
                {t("home.cateringForm.date")}
                <input
                  type="date"
                  value={form.date}
                  onChange={updateField("date")}
                  required
                  min={todayLocal()}
                  className={fieldClass}
                />
              </label>
            </div>

            <label className={labelClass}>
              {t("home.cateringForm.description")}
              <textarea
                value={form.description}
                onChange={updateField("description")}
                required
                rows={4}
                placeholder={t("home.cateringForm.descriptionPlaceholder")}
                className={`${fieldClass} resize-y`}
              />
            </label>

            <button
              type="submit"
              className="mt-2 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-primary-container px-6 font-bold text-on-primary transition hover:bg-primary focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-tertiary"
            >
              {t("home.cateringForm.submit")}
            </button>
          </form>
        </div>
      </div>
    </div>,
    document.body
  );
}
