import { WaraqPerformanceDemo } from "@/components/waraq-demos";
import type { Route } from "./+types/demo";

export function meta({ matches }: Route.MetaArgs) {
  const parentMeta = matches.flatMap((m) => m?.meta ?? []);
  return [...parentMeta, { title: "Waraq Performance Demo — CodeCanon" }];
}

export default function Page() {
  return <WaraqPerformanceDemo />;
}
