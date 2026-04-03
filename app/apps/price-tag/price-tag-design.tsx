import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { PriceTagDesigner } from "@/apps/price-tag/components/price-tag-designer";
import { getPriceTagDesign } from "@/apps/price-tag/lib/api";
import { uuid } from "@/lib/uuid";

export function PriceTagDesign() {
  const { id: priceTagDesignId = uuid() } = useParams<{ id: string }>();

  const { data: priceTag, isPending } = useQuery({
    queryKey: ["price-tag-design", priceTagDesignId],
    queryFn: () => (priceTagDesignId ? getPriceTagDesign(priceTagDesignId) : null),
  });

  return (
    <PriceTagDesigner
      initialTool={priceTag?.layers.length ? "select" : "move"}
      priceTagId={priceTagDesignId}
      priceTag={priceTag}
      loading={isPending}
    />
  );
}
