import type { Commit, Diff } from "@codecanon/nuska";
import { useState } from "react";
import { DiffTable } from "@/apps/products-version-control/components/diff-table";
import {
  avatarColor,
  timeAgo,
} from "@/apps/products-version-control/lib/helpers";
import type { NuskaDemoReturn } from "@/apps/products-version-control/use-nuska";
import { cn } from "@/lib/cn";

function CommitRow({
  commit,
  prevId,
  nuska,
}: {
  commit: Commit;
  prevId: string | null;
  nuska: NuskaDemoReturn;
}) {
  const [expanded, setExpanded] = useState(false);
  const [diff, setDiff] = useState<Diff | null>(null);
  const [loading, setLoading] = useState(false);

  async function toggle() {
    if (!expanded && !diff) {
      setLoading(true);
      const d = await nuska.engine.diff(prevId, commit.id);
      setDiff(d);
      setLoading(false);
    }
    setExpanded((e) => !e);
  }

  return (
    <>
      <div
        className={cn(
          "grid cursor-pointer grid-cols-[28px_1fr_auto] items-center gap-3 border-b border-fd-border/50 px-4 py-3 last:border-0 hover:bg-fd-muted/10 transition-colors",
          expanded && "bg-fd-primary/5",
        )}
        onClick={toggle}
      >
        <div
          className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
          style={{ background: avatarColor(commit.author) }}
        >
          {commit.author.slice(0, 2).toUpperCase()}
        </div>
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold">{commit.message}</div>
          <div className="mt-0.5 text-xs text-fd-muted-foreground">
            <strong className="text-fd-foreground">{commit.author}</strong>{" "}
            committed {timeAgo(commit.timestamp)}
            {commit.parentIds.length > 1 && (
              <span className="ml-2 text-purple-500">merge commit</span>
            )}
          </div>
        </div>
        <span className="flex-shrink-0 rounded-md border border-fd-primary/20 bg-fd-primary/5 px-1.5 py-0.5 font-mono text-[11px] text-fd-primary">
          {commit.id.slice(0, 7)}
        </span>
      </div>
      {expanded && (
        <div className="border-b border-fd-border/50 bg-fd-muted/10">
          <div className="flex items-center justify-between border-b border-fd-border/50 px-4 py-2 text-xs text-fd-muted-foreground">
            <span>
              {loading
                ? "Loading diff…"
                : diff
                  ? `${diff.entries.length} key(s) changed`
                  : ""}
            </span>
            <span className="font-mono">{commit.id.slice(0, 7)}</span>
          </div>
          <DiffTable diff={diff} loading={loading} />
        </div>
      )}
    </>
  );
}

export function CommitsView({ nuska }: { nuska: NuskaDemoReturn }) {
  if (nuska.log.length === 0)
    return (
      <div className="overflow-hidden rounded-xl border border-fd-border bg-fd-card py-12 text-center text-sm text-fd-muted-foreground">
        No commits yet on{" "}
        <strong className="text-fd-foreground">{nuska.currentBranch}</strong>.
      </div>
    );
  return (
    <div className="overflow-hidden rounded-xl border border-fd-border bg-fd-card">
      <div className="border-b border-fd-border bg-fd-muted/30 px-4 py-2.5">
        <span className="text-sm font-semibold">
          {nuska.log.length} commit{nuska.log.length !== 1 ? "s" : ""} on{" "}
          {nuska.currentBranch}
        </span>
      </div>
      {nuska.log.map((c, i) => (
        <CommitRow
          key={c.id}
          commit={c}
          prevId={nuska.log[i + 1]?.id ?? null}
          nuska={nuska}
        />
      ))}
    </div>
  );
}
