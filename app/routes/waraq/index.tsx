import { Card, Cards } from "fumadocs-ui/components/card";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { Page, PageContent } from "@/components/ui/page";
import { baseOptions } from "@/lib/layout.shared";
import { getWaraqDemoLink, getWaraqPriceTagLink } from "@/lib/links";

export function meta() {
  return [{ title: "Waraq — CodeCanon" }];
}

export default function Waraq() {
  return (
    <HomeLayout {...baseOptions()}>
      <Page>
        <PageContent>
          <Cards>
            <Card title="Demo" href={getWaraqDemoLink()} />
            <Card title="Price Tag" href={getWaraqPriceTagLink()} />
          </Cards>
        </PageContent>
      </Page>
    </HomeLayout>
  );
}
