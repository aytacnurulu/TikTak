import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";
import { getApiErrorMessage, notifyError } from "./notify";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      notifyError("Sessiya bitdi. Yenidən daxil olun.");
      window.location.href = "/login";
      return Promise.reject(error);
    }

    notifyError(getApiErrorMessage(error, "Xəta baş verdi"));
    return Promise.reject(error);
  },
);
