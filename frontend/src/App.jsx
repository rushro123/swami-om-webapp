import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LocationPage from "./pages/LocationPage";
import Reviews from "./pages/Reviews";
import { getReviews } from "./services/reviews";

function App() {
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewsError, setReviewsError] = useState("");

  useEffect(() => {
    let active = true;

    getReviews()
      .then((items) => {
        if (active) setReviews(Array.isArray(items) ? items : []);
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
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Header />
      <main style={{ flex: 1 }}>
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
                loading={reviewsLoading}
                loadError={reviewsError}
              />
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
