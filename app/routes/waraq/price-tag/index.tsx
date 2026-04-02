import { HomeLayout } from "fumadocs-ui/layouts/home";
import { Canvas } from "@/apps/price-tag";
import { baseOptions } from "@/lib/layout.shared";
import type { Route } from "./+types/index";

export function meta(_: Route.MetaArgs) {
  return [{ title: "Waraq Price Tag Demo" }];
}

export default function Page() {
  return (
    <div className="size-full flex-1">
      <HomeLayout {...baseOptions()}>
        <Canvas />
      </HomeLayout>
    </div>
  );
}
