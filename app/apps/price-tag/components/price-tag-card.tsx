import {
  WaraqPreview,
  WaraqStaticFrame,
} from "@codecanon/waraq";
import { PlusIcon } from "lucide-react";
import { Link, type LinkProps } from "react-router";
import { PRICE_TAG_LAYER_TYPES } from "@/apps/price-tag/components/price-tag-layer-types";
import { cn } from "@/lib/cn";
import { X_SYMBOL } from "@/lib/symbols";
import type { PriceTag } from "@/types/price-tag";

export function PriceTagCardContainer({
  to,
  className,
  children,
  ...props
}: Partial<LinkProps>) {
  const Comp = (to ? Link : "div") as React.ComponentType<Partial<LinkProps>>;

  return (
    <Comp
      to={to}
      className={cn(
        "group/price-tag-card flex cursor-pointer flex-col gap-2",
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

export function PriceTagCardPreview({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "bg-muted relative overflow-hidden rounded-md border",
        "group-hover/price-tag-card:bg-accent transition-colors",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function PriceTagCardInfo({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-1 px-1", className)} {...props}>
      {children}
    </div>
  );
}

export function PriceTagCardTitle({
  className,
  children,
  ...props
}: React.ComponentProps<"h3">) {
  return (
    <h3
      className={cn("truncate text-sm leading-tight font-medium", className)}
      {...props}
    >
      {children}
    </h3>
  );
}

export function PriceTagCardDescription({
  className,
  children,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p className={cn("text-muted-foreground text-xs", className)} {...props}>
      {children}
    </p>
  );
}

export function PriceTagCardNew({
  title,
  description,
  className,
  ...props
}: React.ComponentProps<typeof PriceTagCardContainer> & {
  title: string;
  description: string;
}) {
  return (
    <PriceTagCardContainer className={cn("flex flex-col", className)} {...props}>
      {/* Preview */}
      <PriceTagCardPreview className="bg-card group-hover/price-tag-card:border-primary group-hover/price-tag-card:bg-accent/50 relative flex aspect-video w-full flex-1 flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed transition-all">
        <div className="bg-muted group-hover/price-tag-card:border-primary group-hover/price-tag-card:bg-primary/10 flex size-12 items-center justify-center rounded-full border-2 border-dashed transition-all">
          <PlusIcon className="text-muted-foreground group-hover/price-tag-card:text-primary size-6 transition-colors" />
        </div>
      </PriceTagCardPreview>

      {/* Info */}
      <PriceTagCardInfo>
        <PriceTagCardTitle>{title}</PriceTagCardTitle>
        <PriceTagCardDescription>{description}</PriceTagCardDescription>
      </PriceTagCardInfo>
    </PriceTagCardContainer>
  );
}

export function PriceTagCard({
  priceTag,
  ...props
}: React.ComponentProps<typeof PriceTagCardContainer> & { priceTag: PriceTag }) {
  return (
    <PriceTagCardContainer {...props}>
      {/* Preview */}
      <PriceTagCardPreview>
        <WaraqPreview frameSize={priceTag.frameSize}>
          {(style) => (
            <WaraqStaticFrame
              data={priceTag}
              layerTypes={PRICE_TAG_LAYER_TYPES}
              style={style}
            />
          )}
        </WaraqPreview>
      </PriceTagCardPreview>

      {/* Info */}
      <PriceTagCardInfo>
        <PriceTagCardTitle>{priceTag.name}</PriceTagCardTitle>
        <PriceTagCardDescription>
          {priceTag.frameSize.width.toFixed(0)} {X_SYMBOL}{" "}
          {priceTag.frameSize.height.toFixed(0)}
        </PriceTagCardDescription>
      </PriceTagCardInfo>
    </PriceTagCardContainer>
  );
}
