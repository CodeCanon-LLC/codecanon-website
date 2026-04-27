import { HomeLayout } from "fumadocs-ui/layouts/home";
import { PriceTag } from "@/apps/price-tag";
import { baseOptions } from "@/lib/layout.shared";
import type { Route } from "./+types/index";

export function meta({ matches }: Route.MetaArgs) {
  const parentMeta = matches.flatMap((m) => m?.meta ?? []);
  return [...parentMeta, { title: "Waraq Price Tag — CodeCanon" }];
}

export default function Page() {
  return (
    <div className="size-full flex-1">
      <HomeLayout {...baseOptions()}>
        <PriceTag />
      </HomeLayout>
    </div>
  );
}
