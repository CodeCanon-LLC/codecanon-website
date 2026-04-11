import { NextPresetsDemo } from "@/apps/products-next-presets";
import type { Route } from "./+types/demo";

export function meta(_: Route.MetaArgs) {
  return [{ title: "Next Presets Demo" }];
}

export default function Page() {
  return <NextPresetsDemo />;
}
