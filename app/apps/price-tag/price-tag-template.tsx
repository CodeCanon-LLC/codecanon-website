import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { PriceTagDesigner } from "@/apps/price-tag/components/price-tag-designer";
import { getPriceTagTemplate } from "@/apps/price-tag/lib/api";
import { uuid } from "@/lib/uuid";

export function PriceTagTemplate() {
  const { id: priceTagTemplateId = uuid() } = useParams<{
    id: string;
  }>();

  const { data: priceTag, isPending } = useQuery({
    queryKey: ["price-tag-template", priceTagTemplateId],
    queryFn: () =>
      priceTagTemplateId ? getPriceTagTemplate(priceTagTemplateId) : null,
  });

  return (
    <PriceTagDesigner
      priceTagId={priceTagTemplateId}
      priceTag={priceTag}
      loading={isPending}
    />
  );
}
