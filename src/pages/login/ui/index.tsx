import { Google, Kakao } from "@/shared/ui";
import { useEffect, useState } from "react";

export const LogIn = () => {
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    const animationSequence = [
      { step: 1, delay: 500 },
      { step: 2, delay: 1000 },
      { step: 3, delay: 1800 },
    ];

    const timers = animationSequence.map(({ step, delay }) => setTimeout(() => setAnimationStep(step), delay));

    return () => timers.forEach(clearTimeout);
  }, []);

  const handleGoogleLogin = () => {
    console.log("Google 로그인 클릭");
  };

  const handleKakaoLogin = () => {
    console.log("카카오 로그인 클릭");
  };

  return (
    <div className="relative h-screen overflow-hidden bg-background">
      <div
        className={`login-bg-slide fixed top-0 left-0 h-full w-full bg-gradient-to-br from-primary-main to-primary-dark ${
          animationStep >= 2 ? "login-bg-slide-left" : ""
        }`}
      />

      <div className="pointer-events-none fixed inset-0 flex items-center justify-center">
        <h1
          className={`login-logo-animate text-6xl text-bold-l text-grayscale-white ${
            animationStep >= 2 ? "login-logo-move" : animationStep >= 1 ? "login-logo-show" : ""
          }`}
        >
          Scheduo
        </h1>
      </div>

      <div
        className={`absolute top-0 right-0 flex h-full w-1/2 items-center justify-center bg-background p-8 transition-opacity duration-800 ${
          animationStep >= 3 ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="flex w-full max-w-md flex-col gap-4">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="hover:-translate-y-0.5 flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-border bg-card px-5 py-4 text-card-foreground text-medium-m transition-all duration-200 hover:shadow-lg"
          >
            <Google />
            <div className="flex flex-1 justify-center">Sign in with Google</div>
          </button>

          <button
            type="button"
            onClick={handleKakaoLogin}
            className="hover:-translate-y-0.5 flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-[#FEE500] bg-[#FEE500] px-5 py-4 text-[#191919] text-medium-m transition-all duration-200 hover:shadow-lg"
          >
            <Kakao />
            <div className="flex flex-1 justify-center">카카오 로그인</div>
          </button>
        </div>
      </div>
    </div>
  );
};
