import { OAuthRedirectPage } from "@/pages/auth";
import { LogIn } from "@/pages/login";
import { Main } from "@/pages/main";
import { Route, Routes } from "react-router";

export const Router = () => {
  return (
    <Routes>
      <Route index element={<Main />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/oauth2/redirect" element={<OAuthRedirectPage />} />
    </Routes>
  );
};
