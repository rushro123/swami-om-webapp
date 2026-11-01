import axios from "axios";

const baseURL =import.meta.env.VITE_API_URL
export const api = axios.create({
  baseURL,
  timeout: 90000, // Render free tier can take ~60s to wake up
});