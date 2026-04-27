import { Card, Cards } from "fumadocs-ui/components/card";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { Page, PageContent } from "@/components/ui/page";
import { baseOptions } from "@/lib/layout.shared";
import { getNuskaDemoLink } from "@/lib/links";
import type { Route } from "./+types";

export function meta({ matches }: Route.MetaArgs) {
  const parentMeta = matches.flatMap((m) => m?.meta ?? []);
  return [...parentMeta, { title: "Nuska — CodeCanon" }];
}

export default function Nuska() {
  return (
    <HomeLayout {...baseOptions()}>
      <Page>
        <PageContent>
          <Cards>
            <Card title="Demo" href={getNuskaDemoLink()} />
            <Card title="Documentation" href="/docs/nuska" />
          </Cards>
        </PageContent>
      </Page>
    </HomeLayout>
  );
}
