import { getType } from "@/apps/products-version-control/lib/helpers";
import { cn } from "@/lib/cn";

const typeColors: Record<string, string> = {
  string: "text-sky-600 dark:text-sky-400",
  number: "text-amber-600 dark:text-yellow-400",
  boolean: "text-rose-600 dark:text-red-400",
  null: "text-fd-muted-foreground italic",
  object: "text-violet-600 dark:text-purple-400",
};

const typeBgColors: Record<string, string> = {
  string: "bg-sky-100 text-sky-700 dark:bg-sky-400/10 dark:text-sky-400",
  number:
    "bg-amber-100 text-amber-700 dark:bg-yellow-400/10 dark:text-yellow-400",
  boolean: "bg-rose-100 text-rose-700 dark:bg-red-400/10 dark:text-red-400",
  null: "bg-fd-muted/50 text-fd-muted-foreground",
  object:
    "bg-violet-100 text-violet-700 dark:bg-purple-400/10 dark:text-purple-400",
};

export function ValueDisplay({ value }: { value: unknown }) {
  const t = getType(value);
  const color = typeColors[t] ?? "text-fd-foreground";
  const display =
    t === "string"
      ? `"${value}"`
      : t === "object"
        ? JSON.stringify(value)
        : String(value ?? "");
  return <span className={cn("font-mono text-xs", color)}>{display}</span>;
}

export function TypeBadge({ value }: { value: unknown }) {
  const t = getType(value);
  return (
    <span
      className={cn(
        "rounded-full px-1.5 py-0.5 font-mono text-[10px] font-semibold",
        typeBgColors[t] ?? "bg-fd-muted/50",
      )}
    >
      {t}
    </span>
  );
}
