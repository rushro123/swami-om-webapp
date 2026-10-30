import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/getReviews": {
        target: "https://swamiomtiffinservicebackend.onrender.com",
        changeOrigin: true,
        secure: true,
      },
      "/storeReview": {
        target: "https://swamiomtiffinservicebackend.onrender.com",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
