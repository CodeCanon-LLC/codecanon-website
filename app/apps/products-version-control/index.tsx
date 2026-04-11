import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import { cn } from "@/lib/cn";
import { useNuska } from "@/apps/products-version-control/use-nuska";
import {
  IconCommit,
  IconDB,
  IconPR,
} from "@/apps/products-version-control/lib/icons";
import { BranchSelector } from "@/apps/products-version-control/components/branch-selector";
import { CodeView } from "@/apps/products-version-control/components/code-view";
import { CommitsView } from "@/apps/products-version-control/components/commits-view";
import { PRView } from "@/apps/products-version-control/components/pull-requests-view";
import { useTheme } from "next-themes";

type Tab = "data" | "commits" | "pulls";

export function NuskaDemo() {
  const { theme, setTheme } = useTheme();
  const originalTheme = useRef(theme);
  const nuska = useNuska();
  const [searchParams, setSearchParams] = useSearchParams();
  const [tab, setTab] = useState<Tab>("data");
  const didInitialCheckout = useRef(false);
  const openPRCount = nuska.pullRequests.filter(
    (p) => p.status === "open",
  ).length;

  useEffect(() => {
    setTheme("dark");

    return () => {
      if (originalTheme.current) {
        setTheme(originalTheme.current);
      }
    };
  }, []);

  // On first ready: checkout the branch from URL (if it exists)
  useEffect(() => {
    if (!nuska.ready || didInitialCheckout.current) return;
    didInitialCheckout.current = true;
    const urlBranch = searchParams.get("branch");
    if (urlBranch && urlBranch !== nuska.currentBranch) {
      nuska.checkout(urlBranch).catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nuska.ready]);

  // Keep URL in sync with current branch
  useEffect(() => {
    if (!nuska.ready) return;
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.set("branch", nuska.currentBranch);
        return next;
      },
      { replace: true },
    );
  }, [nuska.currentBranch, nuska.ready, setSearchParams]);

  return (
    <div className="flex flex-col min-h-[calc(100dvh-3.5rem)]">
      {/* Repo bar */}
      <div className="sticky top-0 z-10 flex flex-wrap items-center gap-3 border-b border-fd-border bg-fd-background/95 px-4 backdrop-blur">
        {nuska.ready && <BranchSelector nuska={nuska} />}
        <div className="flex">
          {[
            { id: "data" as const, label: "Data", icon: <IconDB /> },
            {
              id: "commits" as const,
              label: "Commits",
              badge: nuska.log.length,
              icon: <IconCommit />,
            },
            {
              id: "pulls" as const,
              label: "Pull Requests",
              badge: openPRCount || undefined,
              icon: <IconPR />,
            },
          ].map(({ id, label, badge, icon }) => (
            <button
              key={id}
              className={cn(
                "flex h-11 items-center gap-1.5 border-b-2 px-3 text-sm transition-colors",
                tab === id
                  ? "border-fd-primary font-semibold text-fd-foreground"
                  : "border-transparent text-fd-muted-foreground hover:text-fd-foreground",
              )}
              onClick={() => setTab(id)}
            >
              {icon}
              {label}
              {badge !== undefined && badge > 0 && (
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 text-[11px]",
                    tab === id
                      ? "bg-fd-primary text-fd-primary-foreground"
                      : "bg-fd-muted text-fd-muted-foreground",
                  )}
                >
                  {badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        {!nuska.ready ? (
          <div className="py-20 text-center text-sm text-fd-muted-foreground">
            Initialising…
          </div>
        ) : (
          <>
            {tab === "data" && <CodeView nuska={nuska} />}
            {tab === "commits" && <CommitsView nuska={nuska} />}
            {tab === "pulls" && <PRView nuska={nuska} />}
          </>
        )}
      </div>
    </div>
  );
}
