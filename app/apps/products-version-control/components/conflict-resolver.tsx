import type { ConflictResolution, PullRequest } from "@codecanon/nuska";
import { useState } from "react";
import { IconAlert } from "@/apps/products-version-control/lib/icons";
import type { NuskaDemoReturn } from "@/apps/products-version-control/use-nuska";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export function ConflictResolver({
  pr,
  nuska,
}: {
  pr: PullRequest;
  nuska: NuskaDemoReturn;
}) {
  const [choices, setChoices] = useState<Record<string, { type: string }>>({});
  const [applying, setApplying] = useState(false);
  const conflicts = nuska.conflicts;
  const allResolved =
    conflicts.length > 0 && conflicts.every((c) => choices[c.key]);

  async function applyResolutions() {
    setApplying(true);
    const resolutions: ConflictResolution[] = conflicts.map((c) => {
      const ch = choices[c.key];
      if (!ch || ch.type === "delete")
        return { key: c.key, deleted: true as const };
      if (ch.type === "ours") return { key: c.key, value: c.oursValue };
      if (ch.type === "theirs") return { key: c.key, value: c.theirsValue };
      return { key: c.key, value: c.baseValue };
    });
    await nuska.resolveConflicts(resolutions);
    setApplying(false);
  }

  return (
    <div className="mb-3 overflow-hidden rounded-lg border border-red-500/40">
      <div className="flex items-center gap-2 border-b border-red-400/30 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 dark:bg-red-500/5 dark:border-red-500/20 dark:text-red-500">
        <IconAlert />
        {conflicts.length} merge conflict{conflicts.length !== 1 ? "s" : ""} —
        resolve each key to continue
      </div>
      {conflicts.map((c) => {
        const ch = choices[c.key];
        const options = [
          { type: "ours", label: `Ours (${pr.toBranch})`, val: c.oursValue },
          {
            type: "theirs",
            label: `Theirs (${pr.fromBranch})`,
            val: c.theirsValue,
          },
          { type: "delete", label: "Delete key", val: undefined },
        ];
        return (
          <div
            key={c.key}
            className="border-b border-border/50 px-3 py-3 last:border-0"
          >
            <div className="mb-2 flex items-center gap-2">
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs text-primary">
                {c.key}
              </code>
              {ch && (
                <span className="text-[11px] text-green-500">✓ resolved</span>
              )}
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {options.map(({ type, label, val }) => (
                <button
                  key={type}
                  onClick={() =>
                    setChoices((prev) => ({ ...prev, [c.key]: { type } }))
                  }
                  className={cn(
                    "rounded-md border px-2 py-2 text-left text-xs transition-colors",
                    ch?.type === type
                      ? "border-green-500 bg-green-500/8"
                      : "border-border bg-muted/30 hover:border-primary",
                    type === "delete" && "text-red-500",
                  )}
                >
                  <div className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                    {label}
                  </div>
                  <code className="text-[11px]">
                    {val !== undefined ? JSON.stringify(val) : "—"}
                  </code>
                </button>
              ))}
            </div>
          </div>
        );
      })}
      <div className="flex justify-end gap-2 border-t border-border px-3 py-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => nuska.clearConflicts()}
        >
          Discard
        </Button>
        <Button
          size="sm"
          disabled={!allResolved || applying}
          onClick={applyResolutions}
        >
          {applying ? "Applying…" : "Apply & merge"}
        </Button>
      </div>
    </div>
  );
}
