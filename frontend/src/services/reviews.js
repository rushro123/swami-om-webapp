// src/services/reviews.js
import axios from "axios";

// In dev, requests go through the Vite proxy (see vite.config.js), which avoids CORS.
// In production builds, they go straight to VITE_API_URL.
const baseURL = import.meta.env.DEV
  ? ""
  : (
      import.meta.env.VITE_API_URL ||
      "https://swamiomtiffinservicebackend.onrender.com"
    ).replace(/\/$/, "");

const api = axios.create({
  baseURL,
  timeout: 90000, // Render free tier can take ~60s to wake up
});

function explain(err) {
  console.error("API error:", err);
  if (err.response) return `Server returned ${err.response.status}`;
  if (err.code === "ECONNABORTED")
    return "Timed out (server may be waking up, try again)";
  return "Network or CORS error (see browser console)";
}

// Backend -> page shape
function toPageReview(r, index) {
  return {
    id: r.id ?? `${r.email || "review"}-${index}`,
    firstName: r.firstName || "",
    lastName: r.lastName || "",
    text: r.message || "",
    rating: Number(r.stars) || 0,
    date: r.createdAt,
  };
}

export async function getReviews() {
  try {
    const { data } = await api.get("/api/review/getReviews");
    return Array.isArray(data) ? data.map(toPageReview) : [];
  } catch (err) {
    throw new Error(explain(err));
  }
}

// Page shape -> backend (same body that works in Postman)
export async function addReview({ firstName, lastName, email, text, rating }) {
  try {
    const { data } = await api.post("/api/review/storeReview", {
      email,
      firstName,
      lastName,
      message: text,
      stars: rating,
    });
    return data;
  } catch (err) {
    throw new Error(explain(err));
  }
}
