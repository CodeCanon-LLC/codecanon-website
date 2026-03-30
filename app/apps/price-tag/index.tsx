import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  CanvasCard,
  CanvasCardNew,
} from "@/apps/price-tag/components/price-tag-card";
import {
  CanvasGrid,
  CanvasGridContent,
  CanvasGridDescription,
  CanvasGridHeader,
  CanvasGridTitle,
} from "@/apps/price-tag/components/price-tag-grid";
import { CanvasPageSkeleton } from "@/apps/price-tag/components/price-tag-page-skeleton";
import { CanvasTemplateSelector } from "@/apps/price-tag/components/price-tag-template-selector";
import {
  createCanvasDesign,
  createCanvasTemplate,
  getCanvasDesigns,
  getCanvasTemplates,
} from "@/apps/price-tag/lib/api";
import { CANVAS_TEMPLATE_MOCKS } from "@/apps/price-tag/lib/mocks";
import { Loader } from "@/components/loader";
import { Page, PageContent } from "@/components/ui/page";
import {
  getWaraqPriceTagDesignLink,
  getWaraqPriceTagTemplateLink,
} from "@/lib/links";
import type { Canvas as CanvasType } from "@/types/canvas";

export function Canvas() {
  const navigate = useNavigate();
  const [isTemplateSelectorOpen, setIsTemplateSelectorOpen] = useState(false);

  const { data: templates, isPending: isLoadingTemplates } = useQuery({
    queryKey: ["canvas-templates"],
    queryFn: () => getCanvasTemplates(),
  });

  const { data: records, isPending: isLoadingRecords } = useQuery({
    queryKey: ["canvas-items"],
    queryFn: () => getCanvasDesigns(),
  });

  const handleCreateTemplate = async () => {
    const id = await createCanvasTemplate();
    navigate(getWaraqPriceTagTemplateLink(id));
  };

  const handleCreateDesign = async (template: CanvasType) => {
    const id = await createCanvasDesign(template);
    navigate(getWaraqPriceTagDesignLink(id));
  };

  const isPending = isLoadingTemplates || isLoadingRecords;

  if (isPending) {
    return <CanvasPageSkeleton />;
  }

  return (
    <Page>
      <PageContent className="gap-8">
        {/* Designs Section */}
        <CanvasGrid>
          <CanvasGridHeader>
            <CanvasGridTitle>Designs</CanvasGridTitle>
            <CanvasGridDescription>
              Your canvas designs and documents
            </CanvasGridDescription>
          </CanvasGridHeader>

          <CanvasGridContent>
            <CanvasCardNew
              onClick={() => setIsTemplateSelectorOpen(true)}
              title="New Design"
              description="Create new design"
            />
            {records?.map((canvas) => (
              <CanvasCard
                key={canvas.id}
                canvas={canvas}
                to={getWaraqPriceTagDesignLink(canvas.id)}
              />
            ))}
          </CanvasGridContent>
        </CanvasGrid>

        {/* Templates Section */}
        <CanvasGrid>
          <CanvasGridHeader>
            <CanvasGridTitle>Templates</CanvasGridTitle>
            <CanvasGridDescription>
              Create reusable design templates
            </CanvasGridDescription>
          </CanvasGridHeader>

          <CanvasGridContent>
            <CanvasCardNew
              onClick={handleCreateTemplate}
              title="New Template"
              description="Create new template"
            />
            {templates?.map((canvas) => (
              <CanvasCard
                key={canvas.id}
                canvas={canvas}
                to={getWaraqPriceTagTemplateLink(canvas.id)}
              />
            ))}
          </CanvasGridContent>
        </CanvasGrid>
      </PageContent>
      {/* Template Selector Dialog */}
      <CanvasTemplateSelector
        open={isTemplateSelectorOpen}
        onOpenChange={setIsTemplateSelectorOpen}
        onSelect={handleCreateDesign}
      />
    </Page>
  );
}

export function CanvasDemo() {
  const [isMounted, setIsMounted] = useState(false);

  const records: CanvasType[] = [];
  const templates = CANVAS_TEMPLATE_MOCKS;

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) {
    return <Loader>Loading editor…</Loader>;
  }

  return (
    <Page>
      <PageContent className="gap-8">
        {/* Designs Section */}
        <CanvasGrid>
          <CanvasGridHeader>
            <CanvasGridTitle>Designs</CanvasGridTitle>
            <CanvasGridDescription>
              Your canvas designs and documents
            </CanvasGridDescription>
          </CanvasGridHeader>

          <CanvasGridContent>
            <CanvasCardNew title="New Design" description="Create new design" />
            {records?.map((canvas) => (
              <CanvasCard
                key={canvas.id}
                canvas={canvas}
                to={getWaraqPriceTagDesignLink(canvas.id)}
              />
            ))}
          </CanvasGridContent>
        </CanvasGrid>

        {/* Templates Section */}
        <CanvasGrid>
          <CanvasGridHeader>
            <CanvasGridTitle>Templates</CanvasGridTitle>
            <CanvasGridDescription>
              Create reusable design templates
            </CanvasGridDescription>
          </CanvasGridHeader>

          <CanvasGridContent>
            <CanvasCardNew
              title="New Template"
              description="Create new template"
            />
            {templates?.map((canvas) => (
              <CanvasCard
                key={canvas.id}
                canvas={canvas}
                to={getWaraqPriceTagTemplateLink(canvas.id)}
              />
            ))}
          </CanvasGridContent>
        </CanvasGrid>
      </PageContent>
    </Page>
  );
}
