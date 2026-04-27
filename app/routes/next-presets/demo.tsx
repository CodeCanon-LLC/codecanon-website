import { NextPresetsDemo } from "@/apps/next-presets";
import type { Route } from "./+types/demo";

export function meta({ matches }: Route.MetaArgs) {
  const parentMeta = matches.flatMap((m) => m?.meta ?? []);
  return [...parentMeta, { title: "Next Presets Demo — CodeCanon" }];
}

export default function Page() {
  return <NextPresetsDemo />;
}
