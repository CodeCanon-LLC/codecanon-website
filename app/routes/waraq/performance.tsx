import { Suspense, useEffect, useState } from "react";
import { Loader } from "@/components/loader";
import { WaraqPerformanceDemo } from "@/components/waraq-demos";
import type { Route } from "./+types/demo";

export function meta(_: Route.MetaArgs) {
  return [{ title: "Waraq Performance Demo" }];
}

export default function Page() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  return (
    <div className="h-screen w-screen flex items-center justify-center flex-1">
      {isMounted ? (
        <Suspense fallback={<Loader>Loading editor…</Loader>}>
          <WaraqPerformanceDemo />
        </Suspense>
      ) : (
        <Loader>Loading editor…</Loader>
      )}
    </div>
  );
}
