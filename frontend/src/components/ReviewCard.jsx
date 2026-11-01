import { Card } from "./ui";

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

export function ReviewStars({ value }) {
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

export default function ReviewCard({ review, lang }) {
  return (
    <Card className="p-5 sm:p-6">
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
  );
}
