import { useAuthStore } from "@/shared/stores";
import axios, { type AxiosError, type AxiosResponse } from "axios";
import { toast } from "sonner";
import type { ErrorResponse, SuccessResponse } from "./types";

const DEFAULT_API_TIMEOUT = 10000;

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: DEFAULT_API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  <T = unknown>(response: AxiosResponse<SuccessResponse<T>>) => response,
  async (error: AxiosError<ErrorResponse>) => {
    const errorData = error.response?.data;

    if (error.config?.url?.includes("/auth/logout")) {
      return Promise.reject(error);
    }

    if (errorData?.code === 401) {
      const { refreshToken, setAuth, clearAuth } = useAuthStore.getState();

      if (refreshToken) {
        try {
          const response = await axios.post<SuccessResponse<{ accessToken: string; refreshToken: string }>>(
            `${import.meta.env.VITE_API_BASE_URL}/auth/token`,
            {
              refreshToken,
            },
          );
          setAuth(response.data.data.accessToken, response.data.data.refreshToken);
          return Promise.reject(error);
        } catch {
          clearAuth();
          window.location.href = "/login";
          return Promise.reject(error);
        }
      } else {
        clearAuth();
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }

    if (errorData?.code && errorData.code >= 400) {
      toast.error(errorData.message || "오류가 발생했습니다.");
    }

    if (!error.response) {
      toast.error("네트워크 오류가 발생했습니다.");
    }

    return Promise.reject(error);
  },
);
