import { Suspense, useEffect, useState } from "react";
import { CanvasDesign } from "@/apps/price-tag/price-tag-design";
import { Loader } from "@/components/loader";
import type { Route } from "../../+types/waraq-price-tag-design";

export function meta(_: Route.MetaArgs) {
  return [{ title: "Waraq Price Tag Demo" }];
}

export default function Page() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  return (
    <div className="size-full flex-1 flex items-center justify-center">
      {isMounted ? (
        <Suspense fallback={<Loader>Loading editor…</Loader>}>
          <CanvasDesign />
        </Suspense>
      ) : (
        <Loader>Loading editor…</Loader>
      )}
    </div>
  );
}
