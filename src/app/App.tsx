import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router";
import { queryClient } from "@/shared/tanstack-query";
import { Toaster } from "@/shared/ui";
import { Router } from "./routes";

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Router />
        <Toaster />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
