import { MemoryDataSourceAdapter, MemoryVersionStore } from "@codecanon/nuska";
import type { UseNuskaReturn } from "@codecanon/nuska/react";
import { useNuskaEngine } from "@codecanon/nuska/react";
import { useEffect, useMemo, useState } from "react";

// ── Stable singleton adapters ────────────────────────────────────────────────

const datasource = new MemoryDataSourceAdapter();
const store = new MemoryVersionStore();

// ── Types ─────────────────────────────────────────────────────────────────────

export type NuskaDemoReturn = UseNuskaReturn & {
  datasource: Record<string, unknown>;
};

// ── useNuska ─────────────────────────────────────────────────────────────────

export function useNuska(): NuskaDemoReturn {
  const options = useMemo(() => ({ datasource, store }), []);
  const nuska = useNuskaEngine(options);
  const [snapshot, setSnapshot] = useState<Record<string, unknown>>({});

  useEffect(() => {
    datasource.list().then(async (keys) => {
      const entries = await Promise.all(
        keys.map(async (k) => [k, await datasource.read(k)] as const),
      );
      setSnapshot(Object.fromEntries(entries));
    });
  }, [nuska.log, nuska.currentBranch]);

  return { ...nuska, datasource: snapshot };
}
