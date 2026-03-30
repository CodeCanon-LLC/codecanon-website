import {
  CanvasGrid,
  CanvasGridContent,
  CanvasGridDescription,
  CanvasGridHeader,
  CanvasGridTitle,
} from "@/apps/price-tag/components/price-tag-grid";
import { Skeleton } from "@/components/ui/skeleton";

export function CanvasCardSkeleton() {
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

export function CanvasGridSkeleton({
  title,
  description,
  count = 3,
}: {
  title: string;
  description: string;
  count?: number;
}) {
  return (
    <CanvasGrid>
      <CanvasGridHeader>
        <CanvasGridTitle>{title}</CanvasGridTitle>
        <CanvasGridDescription>{description}</CanvasGridDescription>
      </CanvasGridHeader>

      <CanvasGridContent>
        {Array.from({ length: count }).map((_, index) => (
          <CanvasCardSkeleton key={index} />
        ))}
      </CanvasGridContent>
    </CanvasGrid>
  );
}
