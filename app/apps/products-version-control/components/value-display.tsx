import { cn } from "@/lib/cn";
import { getType } from "@/apps/products-version-control/lib/helpers";

const typeColors: Record<string, string> = {
  string: "text-sky-400",
  number: "text-yellow-400",
  boolean: "text-red-400",
  null: "text-fd-muted-foreground italic",
  object: "text-purple-400",
};

const typeBgColors: Record<string, string> = {
  string: "bg-sky-400/10 text-sky-400",
  number: "bg-yellow-400/10 text-yellow-400",
  boolean: "bg-red-400/10 text-red-400",
  null: "bg-fd-muted/50 text-fd-muted-foreground",
  object: "bg-purple-400/10 text-purple-400",
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
