import { WaraqPerformanceDemo } from "@/components/waraq-demos";
import type { Route } from "./+types/demo";

export function meta(_: Route.MetaArgs) {
  return [{ title: "Waraq Performance Demo" }];
}

export default function Page() {
  return <WaraqPerformanceDemo />;
}
