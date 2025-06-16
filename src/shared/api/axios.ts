import axios, { type AxiosError, type AxiosResponse } from "axios";

const DEFAULT_API_TIMEOUT = 10000;

/**
 * API 요청을 위한 기본 Axios 인스턴스입니다.
 * baseURL, timeout, 기본 헤더 및 인증 정보 포함 설정이 적용되어 있습니다.
 */
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: DEFAULT_API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    // access 토큰 만료 시 재발급
    // access & refresh 토큰 만료 시 로그인 페이지로 이동
    // 이외의 에러 발생 시 토스트 메시지
    return Promise.reject(error);
  },
);
