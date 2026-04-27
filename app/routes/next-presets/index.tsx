import { Card, Cards } from "fumadocs-ui/components/card";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { Page, PageContent } from "@/components/ui/page";
import { baseOptions } from "@/lib/layout.shared";
import { getNextPresetsDemoLink } from "@/lib/links";
import type { Route } from "./+types";

export function meta({ matches }: Route.MetaArgs) {
  const parentMeta = matches.flatMap((m) => m?.meta ?? []);
  return [...parentMeta, { title: "Next Presets — CodeCanon" }];
}

export default function NextPresets() {
  return (
    <HomeLayout {...baseOptions()}>
      <Page>
        <PageContent>
          <Cards>
            <Card title="Documentation" href="/docs/next-presets" />
            <Card title="Presets gallery" href="/docs/next-presets/presets" />
            <Card title="Live demo" href={getNextPresetsDemoLink()} />
          </Cards>
        </PageContent>
      </Page>
    </HomeLayout>
  );
}
