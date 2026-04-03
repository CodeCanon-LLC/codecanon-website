import { PriceTagDesign } from "@/apps/price-tag/price-tag-design";
import type { Route } from "./+types/design";

export function meta(_: Route.MetaArgs) {
  return [{ title: "Waraq Price Tag Demo" }];
}

export default function Page() {
  return <PriceTagDesign />;
}
