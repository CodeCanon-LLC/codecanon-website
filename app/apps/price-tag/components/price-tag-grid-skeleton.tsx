import {
  PriceTagGrid,
  PriceTagGridContent,
  PriceTagGridDescription,
  PriceTagGridHeader,
  PriceTagGridTitle,
} from "@/apps/price-tag/components/price-tag-grid";
import { Skeleton } from "@/components/ui/skeleton";

export function PriceTagCardSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      {/* Preview */}
      <Skeleton className="aspect-video w-full rounded-md" />

      {/* Info */}
      <div className="flex flex-col gap-1 px-1">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}

export function PriceTagGridSkeleton({
  title,
  description,
  count = 3,
}: {
  title: string;
  description: string;
  count?: number;
}) {
  return (
    <PriceTagGrid>
      <PriceTagGridHeader>
        <PriceTagGridTitle>{title}</PriceTagGridTitle>
        <PriceTagGridDescription>{description}</PriceTagGridDescription>
      </PriceTagGridHeader>

      <PriceTagGridContent>
        {Array.from({ length: count }).map((_, index) => (
          <PriceTagCardSkeleton key={index} />
        ))}
      </PriceTagGridContent>
    </PriceTagGrid>
  );
}
