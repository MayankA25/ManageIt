import { baseURL } from "@/utils/baseURL";
import axios from "axios";

export const axiosClient = axios.create({
    baseURL: `${baseURL}`,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
})