import { axiosInstance } from "@/shared/api";
import { useAuthStore } from "@/shared/stores";

export const requestLogIn = (provider: "google" | "kakao") => {
  window.location.href = `${import.meta.env.VITE_API_BASE_URL}/oauth2/authorization/${provider}`;
};

export const requestLogOut = () => {
  const { refreshToken, clearAuth } = useAuthStore.getState();

  axiosInstance.post("/auth/logout", {
    refreshToken,
  });
  clearAuth();
};
