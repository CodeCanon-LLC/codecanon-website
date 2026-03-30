import { CanvasGridSkeleton } from "@/apps/price-tag/components/price-tag-grid-skeleton";
import { Page, PageContent } from "@/components/ui/page";

export function CanvasPageSkeleton() {
  return (
    <Page>
      <PageContent className="gap-8">
        {/* Templates Section */}
        <CanvasGridSkeleton
          title="Templates"
          description="Create reusable design templates"
          count={4}
        />

        {/* Designs Section */}
        <CanvasGridSkeleton
          title="Designs"
          description="Your canvas designs and documents"
          count={4}
        />
      </PageContent>
    </Page>
  );
}
