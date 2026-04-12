import { HomeLayout } from "fumadocs-ui/layouts/home";
import { lazy, Suspense } from "react";
import { Loader } from "@/components/loader";
import { baseOptions } from "@/lib/layout.shared";
import type { Route } from "./+types/demo";

const NuskaDemo = lazy(() =>
  import("@/apps/products-version-control").then((m) => ({
    default: m.NuskaDemo,
  })),
);

export function meta(_: Route.MetaArgs) {
  return [{ title: "Nuska Demo" }];
}

export default function Page() {
  return (
    <HomeLayout {...baseOptions()}>
      <Suspense fallback={<Loader className="m-auto">Loading demo…</Loader>}>
        <NuskaDemo />
      </Suspense>
    </HomeLayout>
  );
}
