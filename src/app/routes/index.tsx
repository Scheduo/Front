import { LogIn } from "@/pages/login";
import { Main } from "@/pages/main";
import { OAuthRedirectPage } from "@/pages/oauth-redirect";
import { Route, Routes } from "react-router";
import { ProtectedRoute } from "./ProtectedRoute";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute requireAuth={true} />}>
        <Route index element={<Main />} />
      </Route>

      <Route path="/" element={<ProtectedRoute requireAuth={false} />}>
        <Route path="login" element={<LogIn />} />
      </Route>

      <Route path="/oauth2/redirect" element={<OAuthRedirectPage />} />
    </Routes>
  );
};
