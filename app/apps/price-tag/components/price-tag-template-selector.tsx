import {
  DEFAULT_FRAME_BACKGROUND_COLOR,
  DOCUMENT_SIZES,
} from "@codecanon/waraq/lib";
import { useQuery } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { PriceTagCard } from "@/apps/price-tag/components/price-tag-card";
import {
  PriceTagGrid,
  PriceTagGridContent,
  PriceTagGridDescription,
  PriceTagGridEmpty,
  PriceTagGridHeader,
  PriceTagGridTitle,
} from "@/apps/price-tag/components/price-tag-grid";
import { PriceTagGridSkeleton } from "@/apps/price-tag/components/price-tag-grid-skeleton";
import { getPriceTagTemplates } from "@/apps/price-tag/lib/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Scroller } from "@/components/ui/scroller";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/cn";
import { getWaraqPriceTagTemplateLink } from "@/lib/links";
import { uuid } from "@/lib/uuid";
import type { PriceTag } from "@/types/price-tag";

const PRICE_TAG_BUILTIN_TEMPLATES: PriceTag[] = DOCUMENT_SIZES.map(
  ([id, { label, frameSize }]) => ({
    id,
    name: label,
    layers: [],
    frameBackgroundColor: DEFAULT_FRAME_BACKGROUND_COLOR,
    frameSize,
  }),
);

interface PriceTagTemplateSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (template: PriceTag) => void;
}

export function PriceTagTemplateSelector({
  open,
  onOpenChange,
  onSelect,
}: PriceTagTemplateSelectorProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const { data: templates = [], isPending } = useQuery({
    queryKey: ["price-tag-templates"],
    queryFn: () => getPriceTagTemplates(),
  });

  const handleSelect = () => {
    const selectedTemplate =
      templates.find((t) => t.id === selected) ||
      PRICE_TAG_BUILTIN_TEMPLATES.find((t) => t.id === selected);

    if (selectedTemplate) {
      onSelect(selectedTemplate);
      onOpenChange(false);
      setSelected(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onOpenAutoFocus={(event) => event.preventDefault()}
        className="flex max-h-11/12 max-w-screen min-w-screen flex-col xl:min-w-7xl"
      >
        <DialogHeader className="px-2">
          <DialogTitle>Create Design</DialogTitle>
          <DialogDescription>
            Select template to create new design
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <Scroller className="min-h-0 flex-1 space-y-8 px-2 pb-8">
          {isPending ? (
            <PriceTagGridSkeleton
              title="Custom Templates"
              description="Use pre-made templates or your own saved templates to start designing quickly."
              count={3}
            />
          ) : (
            <PriceTagGrid>
              <PriceTagGridHeader>
                <PriceTagGridTitle>Custom Templates</PriceTagGridTitle>
                <PriceTagGridDescription>
                  Use pre-made templates or your own saved templates to start
                  designing quickly.
                </PriceTagGridDescription>
              </PriceTagGridHeader>

              <PriceTagGridContent>
                {templates.length ? (
                  templates.map((template) => (
                    <PriceTagCard
                      key={template.id}
                      priceTag={template}
                      onClick={() => setSelected(template.id)}
                      className={cn(
                        "ring-primary ring-offset-background rounded-md rounded-bl-xs ring-offset-4",
                        selected === template.id && "ring-2",
                      )}
                    />
                  ))
                ) : (
                  <PriceTagGridEmpty
                    title="No templates"
                    description="Create your first custom template"
                  >
                    <Button asChild>
                      <Link to={getWaraqPriceTagTemplateLink(uuid())}>
                        <PlusIcon />
                        <span>Create Template</span>
                      </Link>
                    </Button>
                  </PriceTagGridEmpty>
                )}
              </PriceTagGridContent>
            </PriceTagGrid>
          )}
          <PriceTagGrid>
            <PriceTagGridHeader>
              <PriceTagGridTitle>Built-in Templates</PriceTagGridTitle>
              <PriceTagGridDescription>
                Create reusable design templates
              </PriceTagGridDescription>
            </PriceTagGridHeader>

            <PriceTagGridContent>
              {PRICE_TAG_BUILTIN_TEMPLATES.map((template) => (
                <PriceTagCard
                  key={template.id}
                  priceTag={template}
                  onClick={() => setSelected(template.id)}
                  className={cn(
                    "ring-primary ring-offset-background rounded-md rounded-bl-xs ring-offset-4",
                    selected === template.id && "ring-2",
                  )}
                />
              ))}
            </PriceTagGridContent>
          </PriceTagGrid>
        </Scroller>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              onOpenChange(false);
              setSelected(null);
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleSelect} disabled={!selected}>
            Create Design
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
