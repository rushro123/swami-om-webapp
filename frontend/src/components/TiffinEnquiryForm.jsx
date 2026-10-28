import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { waLink } from "./ui";

const INITIAL_FORM = {
  name: "",
  phone: "",
  address: "",
  people: "1",
  meals: "lunch",
  duration: "monthly",
};

const labelClass =
  "flex min-w-0 flex-col gap-1.5 text-sm font-semibold text-on-surface";
const fieldClass =
  "w-full min-w-0 rounded-md bg-surface-container px-3.5 py-3 font-normal outline-none focus-visible:outline-3 focus-visible:outline-tertiary";

// Escaped so it stays valid under the regex `v` flag browsers now use.
const PHONE_PATTERN = "[0-9+ \\-\\(\\)]{10,}";

export default function TiffinEnquiryForm({ open, onClose }) {
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

  const submit = (event) => {
    event.preventDefault();
    const message = t("wa.formEnquiry", {
      name: form.name.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
      people: t(`location.people.${form.people}`),
      meals: t(`location.freq.${form.meals}`),
      plan: t(`location.durationShort.${form.duration}`),
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
          aria-labelledby="tiffin-enquiry-title"
        >
          <div className="mb-5 flex min-w-0 items-start justify-between gap-4">
            <div className="min-w-0">
              <h2
                id="tiffin-enquiry-title"
                className="font-heading text-2xl font-bold text-on-surface"
              >
                {t("home.enquiry.title")}
              </h2>
              <p className="mt-1 text-sm text-on-surface-variant">
                {t("home.enquiry.subtitle")}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label={t("home.enquiry.close")}
              className="rounded-full px-3 py-1 text-2xl leading-none text-on-surface-variant transition hover:bg-surface-container"
            >
              ×
            </button>
          </div>

          <form onSubmit={submit} className="grid min-w-0 grid-cols-1 gap-4">
            <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
              <label className={labelClass}>
                {t("home.enquiry.name")}
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
                {t("home.enquiry.phone")}
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
              {t("home.enquiry.address")}
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
                {t("location.groupPeople")}
                <select
                  value={form.people}
                  onChange={updateField("people")}
                  className={fieldClass}
                >
                  {[1, 2, 3, 4].map((value) => (
                    <option key={value} value={value}>
                      {t(`location.people.${value}`)}
                    </option>
                  ))}
                </select>
              </label>
              <label className={labelClass}>
                {t("location.groupMeals")}
                <select
                  value={form.meals}
                  onChange={updateField("meals")}
                  className={fieldClass}
                >
                  {["lunch", "dinner", "both"].map((value) => (
                    <option key={value} value={value}>
                      {t(`location.freq.${value}`)}
                    </option>
                  ))}
                </select>
              </label>
              <label className={labelClass}>
                {t("location.groupPlan")}
                <select
                  value={form.duration}
                  onChange={updateField("duration")}
                  className={fieldClass}
                >
                  {["trial", "15days", "monthly"].map((value) => (
                    <option key={value} value={value}>
                      {t(`location.duration.${value}`)}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <button
              type="submit"
              className="mt-2 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-primary-container px-6 font-bold text-on-primary transition hover:bg-primary focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-tertiary"
            >
              {t("home.enquiry.submit")}
            </button>
          </form>
        </div>
      </div>
    </div>,
    document.body
  );
}
