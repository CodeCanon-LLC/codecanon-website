import { PriceTagTemplate } from "@/apps/price-tag/price-tag-template";
import type { Route } from "./+types/template";

export function meta({ matches }: Route.MetaArgs) {
  const parentMeta = matches.flatMap((m) => m?.meta ?? []);
  return [...parentMeta, { title: "Waraq Price Tag — CodeCanon" }];
}

export default function Page() {
  return (
    <div className="size-full flex-1">
      <PriceTagTemplate />
    </div>
  );
}
