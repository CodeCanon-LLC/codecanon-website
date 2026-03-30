import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router";
import { TooltipProvider } from "@/components/ui/tooltip";

const queryClient = new QueryClient();

export default function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="bg-background w-screen h-screen flex items-center justify-center">
          <Outlet />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
