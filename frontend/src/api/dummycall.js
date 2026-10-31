import { api } from "./axiosinstance";

export function startRender(){
    const response=api.get("/api/render/startServer")
    console.log(response.data)
}
