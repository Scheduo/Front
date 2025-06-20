import { useAuthStore } from "@/shared/stores";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";

/**
 * 소셜 로그인 리다이렉션을 처리하는 페이지입니다.
 * URL 파라미터에서 토큰을 추출하여 스토어에 저장합니다.
 */
export const OAuthRedirectPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");

    if (accessToken && refreshToken) {
      setAuth(accessToken, refreshToken);
      navigate("/", { replace: true });
    } else {
      toast.error("소셜 로그인 실패");
      navigate("/login", { replace: true });
    }
  }, [searchParams, setAuth, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <p>로그인 처리 중...</p>
      </div>
    </div>
  );
};
