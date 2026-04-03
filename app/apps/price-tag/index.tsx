import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  PriceTagCard,
  PriceTagCardNew,
} from "@/apps/price-tag/components/price-tag-card";
import {
  PriceTagGrid,
  PriceTagGridContent,
  PriceTagGridDescription,
  PriceTagGridHeader,
  PriceTagGridTitle,
} from "@/apps/price-tag/components/price-tag-grid";
import { PriceTagPageSkeleton } from "@/apps/price-tag/components/price-tag-page-skeleton";
import { PriceTagTemplateSelector } from "@/apps/price-tag/components/price-tag-template-selector";
import {
  createPriceTagDesign,
  createPriceTagTemplate,
  getPriceTagDesigns,
  getPriceTagTemplates,
} from "@/apps/price-tag/lib/api";
import { PRICE_TAG_DESIGN_MOCKS, PRICE_TAG_TEMPLATE_MOCKS } from "@/lib/mocks";
import { Page, PageContent } from "@/components/ui/page";
import {
  getWaraqPriceTagDesignLink,
  getWaraqPriceTagTemplateLink,
} from "@/lib/links";
import type { PriceTag as PriceTagType } from "@/types/price-tag";

export function PriceTag() {
  const navigate = useNavigate();
  const [isTemplateSelectorOpen, setIsTemplateSelectorOpen] = useState(false);

  const { data: templates, isPending: isLoadingTemplates } = useQuery({
    queryKey: ["price-tag-templates"],
    queryFn: () => getPriceTagTemplates(),
  });

  const { data: designs, isPending: isLoadingDesigns } = useQuery({
    queryKey: ["price-tag-designs"],
    queryFn: () => getPriceTagDesigns(),
  });

  const handleCreateTemplate = async () => {
    const id = await createPriceTagTemplate();
    navigate(getWaraqPriceTagTemplateLink(id));
  };

  const handleCreateDesign = async (template: PriceTagType) => {
    const id = await createPriceTagDesign(template);
    navigate(getWaraqPriceTagDesignLink(id));
  };

  const isPending = isLoadingTemplates || isLoadingDesigns;

  if (isPending) {
    return <PriceTagPageSkeleton />;
  }

  return (
    <Page>
      <PageContent className="gap-8">
        {/* Designs Section */}
        <PriceTagGrid>
          <PriceTagGridHeader>
            <PriceTagGridTitle>Designs</PriceTagGridTitle>
            <PriceTagGridDescription>
              Your price tag designs and templates
            </PriceTagGridDescription>
          </PriceTagGridHeader>

          <PriceTagGridContent>
            <PriceTagCardNew
              onClick={() => setIsTemplateSelectorOpen(true)}
              title="New Design"
              description="Create new design"
            />
            {designs?.map((priceTag) => (
              <PriceTagCard
                key={priceTag.id}
                priceTag={priceTag}
                to={getWaraqPriceTagDesignLink(priceTag.id)}
              />
            ))}
          </PriceTagGridContent>
        </PriceTagGrid>

        {/* Templates Section */}
        <PriceTagGrid>
          <PriceTagGridHeader>
            <PriceTagGridTitle>Templates</PriceTagGridTitle>
            <PriceTagGridDescription>
              Create reusable design templates
            </PriceTagGridDescription>
          </PriceTagGridHeader>

          <PriceTagGridContent>
            <PriceTagCardNew
              onClick={handleCreateTemplate}
              title="New Template"
              description="Create new template"
            />
            {templates?.map((priceTag) => (
              <PriceTagCard
                key={priceTag.id}
                priceTag={priceTag}
                to={getWaraqPriceTagTemplateLink(priceTag.id)}
              />
            ))}
          </PriceTagGridContent>
        </PriceTagGrid>
      </PageContent>
      {/* Template Selector Dialog */}
      <PriceTagTemplateSelector
        open={isTemplateSelectorOpen}
        onOpenChange={setIsTemplateSelectorOpen}
        onSelect={handleCreateDesign}
      />
    </Page>
  );
}

export function PriceTagDemo() {
  const designs = PRICE_TAG_DESIGN_MOCKS;
  const templates = PRICE_TAG_TEMPLATE_MOCKS;

  return (
    <Page>
      <PageContent className="gap-8">
        {/* Designs Section */}
        <PriceTagGrid>
          <PriceTagGridHeader>
            <PriceTagGridTitle>Designs</PriceTagGridTitle>
            <PriceTagGridDescription>
              Your price tag designs and templates
            </PriceTagGridDescription>
          </PriceTagGridHeader>

          <PriceTagGridContent>
            <PriceTagCardNew title="New Design" description="Create new design" />
            {designs?.map((priceTag) => (
              <PriceTagCard
                key={priceTag.id}
                priceTag={priceTag}
                to={getWaraqPriceTagDesignLink(priceTag.id)}
              />
            ))}
          </PriceTagGridContent>
        </PriceTagGrid>

        {/* Templates Section */}
        <PriceTagGrid>
          <PriceTagGridHeader>
            <PriceTagGridTitle>Templates</PriceTagGridTitle>
            <PriceTagGridDescription>
              Create reusable design templates
            </PriceTagGridDescription>
          </PriceTagGridHeader>

          <PriceTagGridContent>
            <PriceTagCardNew
              title="New Template"
              description="Create new template"
            />
            {templates?.map((priceTag) => (
              <PriceTagCard
                key={priceTag.id}
                priceTag={priceTag}
                to={getWaraqPriceTagTemplateLink(priceTag.id)}
              />
            ))}
          </PriceTagGridContent>
        </PriceTagGrid>
      </PageContent>
    </Page>
  );
}
