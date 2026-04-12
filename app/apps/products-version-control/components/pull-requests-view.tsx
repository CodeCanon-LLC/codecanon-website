import type { Diff, PullRequest } from "@codecanon/nuska";
import { useState } from "react";
import { ConflictResolver } from "@/apps/products-version-control/components/conflict-resolver";
import { DiffTable } from "@/apps/products-version-control/components/diff-table";
import { timeAgo } from "@/apps/products-version-control/lib/helpers";
import {
  IconPRClosed,
  IconPRMerged,
  IconPROpen,
} from "@/apps/products-version-control/lib/icons";
import type { NuskaDemoReturn } from "@/apps/products-version-control/use-nuska";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/cn";

function PRRow({ pr, nuska }: { pr: PullRequest; nuska: NuskaDemoReturn }) {
  const [expanded, setExpanded] = useState(false);
  const [diff, setDiff] = useState<Diff | null>(null);
  const [loading, setLoading] = useState(false);
  const [merging, setMerging] = useState(false);

  async function toggle() {
    if (!expanded && !diff) {
      setLoading(true);
      try {
        const fb = await (
          nuska.engine as unknown as {
            store: {
              getBranch: (
                n: string,
              ) => Promise<{ headCommitId: string | null } | undefined>;
            };
          }
        )["store"].getBranch(pr.fromBranch);
        const tb = await (
          nuska.engine as unknown as {
            store: {
              getBranch: (
                n: string,
              ) => Promise<{ headCommitId: string | null } | undefined>;
            };
          }
        )["store"].getBranch(pr.toBranch);
        setDiff(
          await nuska.engine.diff(
            tb?.headCommitId ?? null,
            fb?.headCommitId ?? null,
          ),
        );
      } catch {
        setDiff({ fromCommitId: null, toCommitId: null, entries: [] });
      }
      setLoading(false);
    }
    setExpanded((e) => !e);
  }

  const StatusIcon =
    pr.status === "merged"
      ? IconPRMerged
      : pr.status === "closed"
        ? IconPRClosed
        : IconPROpen;

  return (
    <>
      <div
        className={cn(
          "grid cursor-pointer grid-cols-[20px_1fr_auto] items-start gap-3 border-b border-border/50 px-4 py-3 last:border-0 hover:bg-muted/10 transition-colors",
          expanded && "bg-primary/5",
        )}
        onClick={toggle}
      >
        <div className="mt-0.5">
          <StatusIcon />
        </div>
        <div>
          <div className="text-sm font-semibold">{pr.title}</div>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[11px] font-semibold border",
                pr.status === "open" &&
                  "bg-green-100 text-green-700 border-green-400/50 dark:bg-green-500/10 dark:text-green-500 dark:border-green-500/30",
                pr.status === "merged" &&
                  "bg-purple-100 text-purple-700 border-purple-400/50 dark:bg-purple-500/10 dark:text-purple-500 dark:border-purple-500/30",
                pr.status === "closed" &&
                  "bg-muted text-muted-foreground border-border",
              )}
            >
              {pr.status}
            </span>
            <span>
              <span className="font-mono text-primary">{pr.fromBranch}</span>
              {" → "}
              <span className="font-mono">{pr.toBranch}</span>
            </span>
            <span>{timeAgo(pr.createdAt)}</span>
          </div>
        </div>
        {pr.status === "open" && (
          <div
            className="flex items-center gap-1.5"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              size="sm"
              className="bg-purple-600 text-white hover:bg-purple-700"
              disabled={merging}
              onClick={async () => {
                setMerging(true);
                await nuska.mergePR(pr.id);
                setMerging(false);
              }}
            >
              {merging ? "Merging…" : "Merge"}
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => nuska.closePR(pr.id)}
            >
              Close
            </Button>
          </div>
        )}
      </div>
      {expanded && (
        <div className="border-b border-border/50 bg-muted/10 px-4 py-3">
          {nuska.pendingMerge?.prId === pr.id && nuska.conflicts.length > 0 && (
            <ConflictResolver pr={pr} nuska={nuska} />
          )}
          <p className="mb-2 text-xs text-muted-foreground">
            Changes from{" "}
            <strong className="text-foreground">{pr.fromBranch}</strong> vs{" "}
            <strong className="text-foreground">{pr.toBranch}</strong>
          </p>
          <div className="overflow-hidden rounded-lg border border-border">
            <DiffTable diff={diff} loading={loading} />
          </div>
        </div>
      )}
    </>
  );
}

function NewPRForm({
  nuska,
  onDone,
}: {
  nuska: NuskaDemoReturn;
  onDone: () => void;
}) {
  const [title, setTitle] = useState("");
  const [from, setFrom] = useState(nuska.currentBranch);
  const [to, setTo] = useState(
    nuska.branches.find((b) => b.name !== nuska.currentBranch)?.name ?? "main",
  );
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit() {
    if (!title.trim() || from === to) return;
    setSubmitting(true);
    await nuska.createPR(title.trim(), from, to);
    setSubmitting(false);
    onDone();
  }

  return (
    <div className="mb-3 overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border bg-muted/30 px-4 py-2.5">
        <span className="text-sm font-semibold">Open a new pull request</span>
        <Button variant="ghost" size="sm" onClick={onDone}>
          Cancel
        </Button>
      </div>
      <div className="grid gap-3 p-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1 sm:col-span-2">
          <label className="text-[11px] font-semibold text-muted-foreground">
            Title
          </label>
          <Input
            placeholder="Describe your changes…"
            value={title}
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-semibold text-muted-foreground">
            From branch
          </label>
          <select
            className="h-8 rounded-lg border border-border bg-background px-2 text-sm"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          >
            {nuska.branches.map((b) => (
              <option key={b.name} value={b.name}>
                {b.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-semibold text-muted-foreground">
            Into branch
          </label>
          <select
            className="h-8 rounded-lg border border-border bg-background px-2 text-sm"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          >
            {nuska.branches
              .filter((b) => b.name !== from)
              .map((b) => (
                <option key={b.name} value={b.name}>
                  {b.name}
                </option>
              ))}
          </select>
        </div>
        <div className="flex justify-end sm:col-span-2">
          <Button
            disabled={!title.trim() || from === to || submitting}
            onClick={handleSubmit}
          >
            {submitting ? "Creating…" : "Create pull request"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function PRView({ nuska }: { nuska: NuskaDemoReturn }) {
  const [filter, setFilter] = useState<"open" | "merged" | "closed">("open");
  const [showForm, setShowForm] = useState(false);
  const filtered = nuska.pullRequests.filter((p) => p.status === filter);
  const counts = {
    open: nuska.pullRequests.filter((p) => p.status === "open").length,
    merged: nuska.pullRequests.filter((p) => p.status === "merged").length,
    closed: nuska.pullRequests.filter((p) => p.status === "closed").length,
  };

  return (
    <div className="flex flex-col gap-3">
      {showForm && (
        <NewPRForm nuska={nuska} onDone={() => setShowForm(false)} />
      )}
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border bg-muted/30 px-4">
          <div className="flex">
            {(["open", "merged", "closed"] as const).map((f) => (
              <button
                key={f}
                className={cn(
                  "flex h-10 items-center gap-1.5 border-b-2 px-3 text-sm transition-colors",
                  filter === f
                    ? "border-primary font-semibold text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
                onClick={() => setFilter(f)}
              >
                {f === "open" && <IconPROpen />}
                {f === "merged" && <IconPRMerged />}
                {f === "closed" && <IconPRClosed />}
                {f.charAt(0).toUpperCase() + f.slice(1)}
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 text-[11px]",
                    filter === f
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  {counts[f]}
                </span>
              </button>
            ))}
          </div>
          <Button size="sm" onClick={() => setShowForm(true)}>
            New PR
          </Button>
        </div>
        {filtered.length === 0 ? (
          <div className="py-12 text-center text-sm text-muted-foreground">
            No {filter} pull requests.
          </div>
        ) : (
          filtered.map((pr) => <PRRow key={pr.id} pr={pr} nuska={nuska} />)
        )}
      </div>
    </div>
  );
}
