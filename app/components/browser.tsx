import { LinkIcon } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export function Browser({
  children,
  link,
  className,
  ...props
}: React.ComponentProps<"div"> & { link: string }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border shadow-2xl shadow-black/10 dark:shadow-black/40 w-full",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2 bg-muted/70 px-4 py-3 border-b">
        <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
        <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
        <span className="h-3 w-3 rounded-full bg-[#28C840]" />
        <Link
          to={link}
          className="truncate ml-3 flex-1 rounded-md bg-[#e5e5e5] dark:bg-background/70 px-3 py-1 text-xs text-muted-foreground hover:text-primary hover:underline"
        >
          {globalThis.location?.origin}
          {link}
        </Link>

        <Button asChild size="sm" className="h-6">
          <Link to={link}>
            <span>Open</span>
            <LinkIcon className={"size-3"} />
          </Link>
        </Button>
      </div>

      <div className="h-145 bg-background overflow-auto">{children}</div>
    </div>
  );
}
