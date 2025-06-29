import type { Member } from "@/entities/member";
import { useAuthStore } from "@/shared/stores";

interface UseAuthGuardReturn {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: Member | null;
}

/**
 * 인증 상태를 확인하고 라우트 가드에 필요한 정보를 제공합니다.
 */
export const useAuthGuard = (): UseAuthGuardReturn => {
  const { accessToken, user } = useAuthStore();

  const isAuthenticated = Boolean(accessToken);
  const isLoading = false;

  return {
    isAuthenticated,
    isLoading,
    user,
  };
};
