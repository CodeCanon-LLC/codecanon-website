import { Suspense, useEffect, useState } from "react";
import { Loader } from "@/components/loader";
import { WaraqDemoFull } from "@/components/waraq-demo-full";
import type { Route } from "../+types/waraq-demo";

export function meta(_: Route.MetaArgs) {
  return [{ title: "Waraq Demo" }];
}

export default function Page() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  return (
    <div className="size-full flex-1">
      {isMounted ? (
        <Suspense fallback={<Loader>Loading editor…</Loader>}>
          <WaraqDemoFull />
        </Suspense>
      ) : (
        <Loader>Loading editor…</Loader>
      )}
    </div>
  );
}
