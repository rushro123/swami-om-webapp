import { api } from "./axiosinstance";

export async function startRender() {
  const response = await api.get("/api/render/startServer");
  console.log(response.data);
  return response.data;
}
