import { Card, Cards } from "fumadocs-ui/components/card";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { Page, PageContent } from "@/components/ui/page";
import { baseOptions } from "@/lib/layout.shared";
import type { Route } from "./+types";

export function meta(_: Route.MetaArgs) {
  return [{ title: "Next Presets" }];
}

export default function NextPresets() {
  return (
    <HomeLayout {...baseOptions()}>
      <Page>
        <PageContent>
          <Cards>
            <Card title="Documentation" href="/docs/next-presets" />
            <Card title="Presets gallery" href="/docs/next-presets/presets" />
          </Cards>
        </PageContent>
      </Page>
    </HomeLayout>
  );
}
