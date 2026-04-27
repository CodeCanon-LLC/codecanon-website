import { PriceTagDesign } from "@/apps/price-tag/price-tag-design";
import type { Route } from "./+types/design";

export function meta({ matches }: Route.MetaArgs) {
  const parentMeta = matches.flatMap((m) => m?.meta ?? []);
  return [...parentMeta, { title: "Waraq Price Tag — CodeCanon" }];
}

export default function Page() {
  return <PriceTagDesign />;
}
