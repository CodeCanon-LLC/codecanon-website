import { WaraqDemo } from "@/components/waraq-demos";
import type { Route } from "./+types/demo";

export function meta(_: Route.MetaArgs) {
  return [{ title: "Waraq Demo" }];
}

export default function Page() {
  return <WaraqDemo />
}
