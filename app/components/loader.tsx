import { cn } from "@/lib/cn";

export function Loader({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "h-full w-full flex items-center justify-center bg-fd-muted/20",
        className,
      )}
      {...props}
    >
      <div className="flex flex-col items-center gap-3 text-fd-muted-foreground">
        <div className="h-8 w-8 rounded-full border-2 border-fd-muted-foreground/30 border-t-fd-primary animate-spin" />
        <span className="text-sm">{children}</span>
      </div>
    </div>
  );
}
