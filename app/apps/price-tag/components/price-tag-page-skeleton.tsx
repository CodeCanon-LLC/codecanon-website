import { PriceTagGridSkeleton } from "@/apps/price-tag/components/price-tag-grid-skeleton";
import { Page, PageContent } from "@/components/ui/page";

export function PriceTagPageSkeleton() {
  return (
    <Page>
      <PageContent className="gap-8">
        {/* Templates Section */}
        <PriceTagGridSkeleton
          title="Templates"
          description="Create reusable design templates"
          count={4}
        />

        {/* Designs Section */}
        <PriceTagGridSkeleton
          title="Designs"
          description="Your price tag designs and templates"
          count={4}
        />
      </PageContent>
    </Page>
  );
}
