import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AdminProfile } from "@/types/admin.types";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  profile: AdminProfile | null;
  isAuthenticated: boolean;
  setAuth: (payload: {
    accessToken: string;
    refreshToken: string;
    profile: AdminProfile;
  }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      profile: null,
      isAuthenticated: false,
      setAuth: ({ accessToken, refreshToken, profile }) =>
        set({ accessToken, refreshToken, profile, isAuthenticated: true }),
      logout: () =>
        set({
          accessToken: null,
          refreshToken: null,
          profile: null,
          isAuthenticated: false,
        }),
    }),
    { name: "auth-storage" },
  ),
);
