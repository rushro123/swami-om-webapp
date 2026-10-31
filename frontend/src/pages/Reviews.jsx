import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import StarRating from "../components/StarRating";
import { Badge, Btn, Card } from "../components/ui";
import { addReview } from "../services/reviews";

const EMPTY_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  text: "",
  rating: 5,
};

const INPUT_CLASS =
  "mt-1.5 w-full rounded-md border border-outline-variant bg-white px-3.5 py-2.5 font-body text-sm font-normal outline-none transition focus:border-primary focus:ring-2 focus:ring-primary-fixed";

function getReviewName(review) {
  return review.firstName || review.lastName
    ? `${review.firstName || ""} ${review.lastName || ""}`.trim()
    : review.name || "";
}

function getReviewInitials(review) {
  const name = getReviewName(review);
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
  return initials || "?";
}

function formatDate(value, lang) {
  if (!value) return "";
  try {
    return new Intl.DateTimeFormat(lang === "mr" ? "mr-IN" : "en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(value));
  } catch {
    return "";
  }
}

function ReviewStars({ value }) {
  return (
    <div
      className="flex gap-0.5 text-lg leading-none text-secondary"
      aria-label={`${value} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} aria-hidden="true">
          {star <= value ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
}

export default function Reviews({
  reviews,
  setReviews,
  loading,
  loadError,
}) {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState(""); // form errors

  const average = useMemo(() => {
    if (!reviews.length) return "—";
    return (
      reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0) /
      reviews.length
    ).toFixed(1);
  }, [reviews]);

  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
    setNotice("");
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const firstName = form.firstName.trim();
    const lastName = form.lastName.trim();
    const email = form.email.trim();
    const text = form.text.trim();

    if (!firstName || !lastName || !email || !text || !form.rating) {
      setError(t("fix"));
      return;
    }

    setSaving(true);
    setNotice("");
    setError("");
    try {
      const review = {
        firstName,
        lastName,
        email,
        text,
        rating: Number(form.rating),
      };
      await addReview(review);
      setReviews((current) => [
        { ...review, id: Date.now(), date: new Date().toISOString() },
        ...current,
      ]);
      setForm(EMPTY_FORM);
      setNotice(t("rev.ok"));
    } catch (err) {
      setError(`${t("rev.fail")} (${err.message})`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-full bg-surface">
      <section className="relative overflow-hidden bg-linear-to-br from-surface-container-highest via-surface-container-low to-white px-5 pb-14 pt-14 sm:px-8">
        <div className="pointer-events-none absolute -right-20 -top-24 size-[340px] rounded-full bg-primary-fixed-dim/25 blur-[60px]" />
        <div className="pointer-events-none absolute -bottom-28 left-10 size-[260px] rounded-full bg-secondary-container/15 blur-[55px]" />
        <div className="relative mx-auto max-w-[1200px]">
          <Badge className="bg-surface-container-highest text-secondary">
            💬 {t("rev.badge")}
          </Badge>
          <div className="mt-4 max-w-2xl">
            <h1 className="font-heading text-[clamp(34px,5vw,56px)] font-bold leading-[1.08] tracking-[-0.03em] text-on-surface">
              {t("rev.h")}
            </h1>
            <p className="mt-3 text-base leading-7 text-on-surface-variant">
              {t("rev.intro")}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1200px] gap-6 px-5 py-10 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
            <Card className="px-5 py-5">
              <div className="font-heading text-3xl font-bold text-primary">
                {average}
              </div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-[0.08em] text-on-surface-variant">
                {t("rev.avg")}
              </div>
              <ReviewStars value={Math.round(Number(average) || 0)} />
            </Card>
            <Card className="px-5 py-5">
              <div className="font-heading text-3xl font-bold text-primary">
                {reviews.length}
              </div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-[0.08em] text-on-surface-variant">
                {t("rev.total")}
              </div>
            </Card>
            <div className="col-span-2 flex items-center rounded-lg border border-outline-variant bg-secondary-fixed/35 px-5 py-4 text-sm leading-6 text-on-surface-variant sm:col-span-1">
              <span className="mr-3 text-2xl" aria-hidden="true">
                🌿
              </span>
              <span>{t("rev.promise")}</span>
            </div>
          </div>

          {loading ? (
            <Card className="p-8 text-center text-on-surface-variant">
              {t("rev.load")}
            </Card>
          ) : loadError && !reviews.length ? (
            <Card className="p-8 text-center">
              <p role="alert" className="text-sm text-on-error-container">
                {t("rev.fail")} ({loadError})
              </p>
            </Card>
          ) : reviews.length ? (
            <div className="space-y-4">
              {reviews.map((review) => (
                <Card key={review.id} className="p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary-fixed text-lg font-bold text-primary">
                        {getReviewInitials(review)}
                      </div>
                      <div className="min-w-0">
                        <div className="truncate font-heading font-bold text-on-surface">
                          {getReviewName(review)}
                        </div>
                        <div className="text-xs text-on-surface-variant">
                          {formatDate(review.date, lang)}
                        </div>
                      </div>
                    </div>
                    <ReviewStars value={Number(review.rating)} />
                  </div>
                  <p className="mt-2 whitespace-pre-wrap text-[13.5px] leading-6 text-on-surface-variant">
                    {review.text}
                  </p>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-dashed p-10 text-center">
              <div className="text-4xl" aria-hidden="true">
                🍱
              </div>
              <h2 className="mt-3 font-heading text-xl font-bold text-on-surface">
                {t("rev.empty")}
              </h2>
              <p className="mt-2 text-sm text-on-surface-variant">
                {t("rev.emptyHint")}
              </p>
            </Card>
          )}
        </div>

        <Card className="h-fit p-6 sm:p-7">
          <div className="mb-6">
            <Badge>✍️ {t("rev.experience")}</Badge>
            <h2 className="mt-3 font-heading text-2xl font-bold tracking-[-0.02em] text-on-surface">
              {t("rev.write")}
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-sm font-semibold text-on-surface">
              {t("rev.firstName")} <span className="text-primary">*</span>
              <input
                name="firstName"
                autoComplete="given-name"
                value={form.firstName}
                onChange={updateField("firstName")}
                maxLength={60}
                required
                className={INPUT_CLASS}
              />
            </label>
            <label className="block text-sm font-semibold text-on-surface">
              {t("rev.lastName")} <span className="text-primary">*</span>
              <input
                name="lastName"
                autoComplete="family-name"
                value={form.lastName}
                onChange={updateField("lastName")}
                maxLength={60}
                required
                className={INPUT_CLASS}
              />
            </label>
            <label className="block text-sm font-semibold text-on-surface">
              {t("rev.email")} <span className="text-primary">*</span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={updateField("email")}
                maxLength={254}
                required
                className={INPUT_CLASS}
              />
            </label>
            <div>
              <div className="text-sm font-semibold text-on-surface">
                {t("rev.rating")} <span className="text-primary">*</span>
              </div>
              <StarRating
                value={Number(form.rating)}
                onChange={(rating) =>
                  setForm((current) => ({ ...current, rating }))
                }
              />
            </div>
            <label className="block text-sm font-semibold text-on-surface">
              {t("rev.text")} <span className="text-primary">*</span>
              <textarea
                name="text"
                value={form.text}
                onChange={updateField("text")}
                maxLength={500}
                required
                rows={5}
                className={`${INPUT_CLASS} resize-y`}
              />
            </label>
            {error && (
              <p
                role="alert"
                className="rounded-md bg-error-container px-3 py-2 text-sm text-on-error-container"
              >
                {error}
              </p>
            )}
            {notice && (
              <p
                role="status"
                className="rounded-md bg-tertiary-fixed px-3 py-2 text-sm text-on-surface"
              >
                {notice}
              </p>
            )}
            <Btn type="submit" size="block" className="w-full" disabled={saving}>
              {saving ? t("rev.saving") : t("rev.submit")}
            </Btn>
          </form>
        </Card>
      </section>
    </main>
  );
}
