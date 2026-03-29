import { useEffect, useState } from "react";
import { Link } from "react-router";
import { cn } from "@/lib/cn";

export function Browser({
  children,
  link,
  className,
  ...props
}: React.ComponentProps<"div"> & { link: string }) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border shadow-2xl shadow-black/10 dark:shadow-black/40 w-full",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2 bg-fd-muted/70 px-4 py-3 border-b">
        <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
        <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
        <span className="h-3 w-3 rounded-full bg-[#28C840]" />
        <Link
          to={link}
          className="ml-3 flex-1 rounded-md bg-fd-background/70 px-3 py-1 text-xs text-fd-muted-foreground hover:underline"
        >
          {isMounted && window.location.origin}
          {link}
        </Link>
      </div>

      <div className="h-145 bg-fd-background">{children}</div>
    </div>
  );
}
