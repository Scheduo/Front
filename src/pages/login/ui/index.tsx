import { Google, Kakao } from "@/shared/ui";
import { useEffect, useState } from "react";

export const LogIn = () => {
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setAnimationStep(1), 500);
    const timer2 = setTimeout(() => setAnimationStep(2), 1000);
    const timer3 = setTimeout(() => setAnimationStep(3), 1800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleGoogleLogin = () => {
    console.log("Google 로그인 클릭");
  };

  const handleKakaoLogin = () => {
    console.log("카카오 로그인 클릭");
  };

  return (
    <div className="relative h-screen overflow-hidden bg-white">
      <div
        className={`fixed top-0 left-0 h-full w-full bg-gradient-to-br from-primary-main to-primary-dark transition-transform duration-800 ease-in-out ${
          animationStep >= 2 ? "-translate-x-1/2" : "translate-x-0"
        }`}
      />

      <div className="fixed inset-0 flex items-center justify-center">
        <h1
          className={`font-bold text-6xl text-grayscale-white transition-all duration-800 ease-out ${
            animationStep >= 1 ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          } ${animationStep >= 2 ? "-translate-x-[25vw]" : ""}`}
        >
          Scheduo
        </h1>
      </div>

      <div
        className={`absolute top-0 right-0 flex h-full w-1/2 items-center justify-center bg-white p-8 transition-all duration-800 ${
          animationStep >= 3 ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex w-full max-w-md flex-col gap-4">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="hover:-translate-y-0.5 flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white px-5 py-4 text-black text-xl transition-all duration-200 hover:shadow-lg"
          >
            <Google />
            <div className="flex flex-1 justify-center">Sign in with Google</div>
          </button>

          <button
            type="button"
            onClick={handleKakaoLogin}
            className="hover:-translate-y-0.5 flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-[#FEE500] bg-[#FEE500] px-5 py-4 text-[#191919] text-xl transition-all duration-200 hover:shadow-lg"
          >
            <Kakao />
            <div className="flex flex-1 justify-center">카카오 로그인</div>
          </button>
        </div>
      </div>
    </div>
  );
};
