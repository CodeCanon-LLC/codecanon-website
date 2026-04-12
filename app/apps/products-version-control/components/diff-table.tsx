import type { Diff } from "@codecanon/nuska";
import { renderVal } from "@/apps/products-version-control/lib/helpers";
import { cn } from "@/lib/cn";

export function DiffTable({
  diff,
  loading,
}: {
  diff: Diff | null;
  loading?: boolean;
}) {
  if (loading)
    return (
      <p className="px-4 py-6 text-center text-xs text-fd-muted-foreground">
        Loading diff…
      </p>
    );
  if (!diff) return null;
  if (diff.entries.length === 0)
    return (
      <p className="px-4 py-6 text-center text-xs text-fd-muted-foreground">
        No changes in this commit.
      </p>
    );

  return (
    <table className="w-full text-xs">
      <thead>
        <tr className="border-b border-fd-border bg-fd-muted/30">
          <th className="w-5 px-3 py-1.5 text-left font-medium text-fd-muted-foreground"></th>
          <th className="px-3 py-1.5 text-left font-medium text-fd-muted-foreground">
            Key
          </th>
          <th className="px-3 py-1.5 text-left font-medium text-fd-muted-foreground">
            Before
          </th>
          <th className="px-3 py-1.5 text-left font-medium text-fd-muted-foreground">
            After
          </th>
        </tr>
      </thead>
      <tbody>
        {diff.entries.map((e) => (
          <tr
            key={e.key}
            className={cn(
              e.type === "added" && "bg-green-100 dark:bg-green-500/8",
              e.type === "removed" && "bg-red-100 dark:bg-red-500/8",
              e.type === "modified" && "bg-amber-100 dark:bg-yellow-500/8",
            )}
          >
            <td
              className={cn(
                "px-3 py-1.5 font-bold",
                e.type === "added" && "text-green-600 dark:text-green-500",
                e.type === "removed" && "text-red-600 dark:text-red-500",
                e.type === "modified" && "text-amber-600 dark:text-yellow-500",
              )}
            >
              {e.type === "added" ? "+" : e.type === "removed" ? "−" : "~"}
            </td>
            <td className="px-3 py-1.5 font-mono">{e.key}</td>
            <td className="px-3 py-1.5 font-mono text-fd-muted-foreground">
              {e.type === "added" ? "—" : renderVal(e.oldValue)}
            </td>
            <td className="px-3 py-1.5 font-mono">
              {e.type === "removed" ? "—" : renderVal(e.newValue)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
