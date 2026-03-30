import {
  WaraqPreview as DesignerPreview,
  WaraqStaticFrame as DesignerStaticFrame,
} from "@codecanon/waraq";
import { PlusIcon } from "lucide-react";
import { Link, type LinkProps } from "react-router";
import { CANVAS_LAYER_TYPES } from "@/apps/price-tag/components/price-tag-layer-types";
import { cn } from "@/lib/cn";
import { X_SYMBOL } from "@/lib/symbols";
import type { Canvas } from "@/types/canvas";

export function CanvasCardContainer({
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

export function CanvasCardPreview({
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

export function CanvasCardInfo({
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

export function CanvasCardTitle({
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

export function CanvasCardDescription({
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

export function CanvasCardNew({
  title,
  description,
  className,
  ...props
}: React.ComponentProps<typeof CanvasCardContainer> & {
  title: string;
  description: string;
}) {
  return (
    <CanvasCardContainer className={cn("flex flex-col", className)} {...props}>
      {/* Preview */}
      <CanvasCardPreview className="bg-card group-hover/price-tag-card:border-primary group-hover/price-tag-card:bg-accent/50 relative flex aspect-video w-full flex-1 flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed transition-all">
        <div className="bg-muted group-hover/price-tag-card:border-primary group-hover/price-tag-card:bg-primary/10 flex size-12 items-center justify-center rounded-full border-2 border-dashed transition-all">
          <PlusIcon className="text-muted-foreground group-hover/price-tag-card:text-primary size-6 transition-colors" />
        </div>
      </CanvasCardPreview>

      {/* Info */}
      <CanvasCardInfo>
        <CanvasCardTitle>{title}</CanvasCardTitle>
        <CanvasCardDescription>{description}</CanvasCardDescription>
      </CanvasCardInfo>
    </CanvasCardContainer>
  );
}

export function CanvasCard({
  canvas,
  ...props
}: React.ComponentProps<typeof CanvasCardContainer> & { canvas: Canvas }) {
  return (
    <CanvasCardContainer {...props}>
      {/* Preview */}
      <CanvasCardPreview>
        <DesignerPreview frameSize={canvas.frameSize}>
          {(style) => (
            <DesignerStaticFrame
              data={canvas}
              layerTypes={CANVAS_LAYER_TYPES}
              style={style}
            />
          )}
        </DesignerPreview>
      </CanvasCardPreview>

      {/* Info */}
      <CanvasCardInfo>
        <CanvasCardTitle>{canvas.name}</CanvasCardTitle>
        <CanvasCardDescription>
          {canvas.frameSize.width.toFixed(0)} {X_SYMBOL}{" "}
          {canvas.frameSize.height.toFixed(0)}
        </CanvasCardDescription>
      </CanvasCardInfo>
    </CanvasCardContainer>
  );
}
