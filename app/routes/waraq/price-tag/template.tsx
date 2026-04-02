import { CanvasTemplate } from "@/apps/price-tag/price-tag-template";
import type { Route } from "./+types/template";

export function meta(_: Route.MetaArgs) {
  return [{ title: "Waraq Price Tag Demo" }];
}

export default function Page() {
  return (
    <div className="size-full flex-1">
      <CanvasTemplate />
    </div>
  );
}
