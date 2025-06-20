import { create } from "zustand";
import { persist } from "zustand/middleware";

const STORAGE_KEY = "scheduo-auth";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;

  setAuth: (accessToken: string, refreshToken: string) => void;
  clearAuth: () => void;
  updateAccessToken: (accessToken: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,

      setAuth: (accessToken, refreshToken) =>
        set({
          accessToken,
          refreshToken,
        }),

      clearAuth: () =>
        set({
          accessToken: null,
          refreshToken: null,
        }),

      updateAccessToken: (accessToken) => set({ accessToken }),
    }),
    {
      name: STORAGE_KEY,
    },
  ),
);
