"use client";

import { useState, type ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@/shared/lib/queryClient";
import { configureApiClient } from "@tiktak/api-client";
import { useAuthStore } from "@/shared/store/useAuthStore";

configureApiClient({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL!,
  getToken: () => useAuthStore.getState().accessToken,
});

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => getQueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
