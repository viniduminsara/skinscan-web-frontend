import axios from "axios";
import { toast } from 'sonner';

export const ACCESS_TOKEN_KEY = "accessToken";

const client = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
});

// Attach token automatically
client.interceptors.request.use((config) => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Global error handling
client.interceptors.response.use(
    (response) => response,

    // Handle network/server errors (no response)
    (error) => {
        const message = error.response?.data?.message || error.message || "Network error";
        toast.error(message);
    }
);


export default client;
