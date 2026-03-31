import { HomeLayout } from "fumadocs-ui/layouts/home";
import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@/apps/price-tag";
import { Loader } from "@/components/loader";
import { baseOptions } from "@/lib/layout.shared";
import type { Route } from "./+types/index"

export function meta(_: Route.MetaArgs) {
  return [{ title: "Waraq Price Tag Demo" }];
}

export default function Page() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  return (
    <div className="size-full flex-1">
      <HomeLayout {...baseOptions()}>
        {isMounted ? (
          <Suspense fallback={<Loader>Loading editor…</Loader>}>
            <Canvas />
          </Suspense>
        ) : (
          <Loader>Loading editor…</Loader>
        )}
      </HomeLayout>
    </div>
  );
}
