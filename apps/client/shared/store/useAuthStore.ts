import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  role: string | null;
  setAuth: (params: {
    accessToken: string;
    refreshToken: string;
    role: string;
  }) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      role: null,
      setAuth: ({ accessToken, refreshToken, role }) =>
        set({ accessToken, refreshToken, role }),
      clearAuth: () =>
        set({ accessToken: null, refreshToken: null, role: null }),
    }),
    {
      name: "tiktak-client-auth",
    },
  ),
);
