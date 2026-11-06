import { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import { getReviews } from "./services/reviews";

const AboutPage = lazy(() => import("./pages/AboutPage"));
const LocationPage = lazy(() => import("./pages/LocationPage"));
const Reviews = lazy(() => import("./pages/Reviews"));

function PageLoader() {
  return (
    <div
      className="flex min-h-[60vh] flex-col items-center justify-center gap-3"
      role="status"
      aria-live="polite"
    >
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-turmeric-200 border-t-chili-600" />
      <p className="font-display text-maroon-800">Loading…</p>
    </div>
  );
}

function NotFound() {
  return (
    <section className="mx-auto max-w-xl px-4 py-20 text-center">
      <title>Page not found | Swami Om Tiffin Service</title>
      <meta name="robots" content="noindex" />
      <h1 className="font-display text-4xl text-maroon-800">Page not found</h1>
      <p className="mt-3 text-charcoal/80">
        This page doesn't exist. Head back home to see today's tiffin options.
      </p>
      <a href="/" className="btn-primary mt-6 inline-block">
        Back to Home
      </a>
    </section>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const [reviews, setReviews] = useState([]);
  const [reviewSummary, setReviewSummary] = useState({
    averageRating: null,
    totalReviews: null,
  });
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewsError, setReviewsError] = useState("");

  useEffect(() => {
    let active = true;

    getReviews()
      .then((result) => {
        if (active) {
          setReviews(Array.isArray(result?.reviews) ? result.reviews : []);
          setReviewSummary({
            averageRating: result?.averageRating ?? null,
            totalReviews: result?.totalReviews ?? null,
          });
        }
      })
      .catch((error) => {
        console.error("Could not load reviews:", error);
        if (active) setReviewsError(error.message);
      })
      .finally(() => {
        if (active) setReviewsLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-cream text-charcoal">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage reviews={reviews} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/location" element={<LocationPage />} />
            <Route
              path="/reviews"
              element={
                <Reviews
                  reviews={reviews}
                  setReviews={setReviews}
                  reviewSummary={reviewSummary}
                  loading={reviewsLoading}
                  loadError={reviewsError}
                />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
