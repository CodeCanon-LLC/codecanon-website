import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router";

const queryClient = new QueryClient();

export default function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-background w-screen h-screen flex items-center justify-center">
        <Outlet />
      </div>
    </QueryClientProvider>
  );
}
