import { Paintbrush } from "lucide-react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { cn } from "@/lib/cn";

export function CanvasGrid({
  className,
  children,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section className={cn("flex flex-col gap-4", className)} {...props}>
      {children}
    </section>
  );
}

export function CanvasGridHeader({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col", className)} {...props}>
      {children}
    </div>
  );
}

export function CanvasGridTitle({
  className,
  children,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <h2 className={cn("text-lg font-semibold", className)} {...props}>
      {children}
    </h2>
  );
}

export function CanvasGridDescription({
  className,
  children,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p className={cn("text-muted-foreground text-sm", className)} {...props}>
      {children}
    </p>
  );
}

export function CanvasGridContent({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CanvasGridEmpty({
  title,
  description,
  children,
  ...props
}: React.ComponentProps<typeof Empty> & {
  title: string;
  description: string;
}) {
  return (
    <Empty {...props}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Paintbrush />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>description</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>{children}</EmptyContent>
    </Empty>
  );
}
