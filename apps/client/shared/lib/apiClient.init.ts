import { configureApiClient } from "@tiktak/api-client";
import { useAuthStore } from "@/shared/store/useAuthStore";

configureApiClient({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL!,
  getToken: () => useAuthStore.getState().accessToken,
});
