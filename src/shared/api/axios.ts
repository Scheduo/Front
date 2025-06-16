import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // access 토큰 만료 시 재발급
    // access & refresh 토큰 만료 시 로그인 페이지로 이동
    // 이외의 에러 발생 시 토스트 메시지
    return Promise.reject(error);
  },
);
