import { lazy, Suspense } from "react";

const WaraqDemoInner = lazy(() => import("./waraq-demo-inner"));

function WaraqDemoSkeleton() {
  return (
    <div className="h-full w-full flex items-center justify-center bg-fd-muted/20">
      <div className="flex flex-col items-center gap-3 text-fd-muted-foreground">
        <div className="h-8 w-8 rounded-full border-2 border-fd-muted-foreground/30 border-t-fd-primary animate-spin" />
        <span className="text-sm">Loading editor…</span>
      </div>
    </div>
  );
}

export function WaraqEditorDemo() {
  return (
    <Suspense fallback={<WaraqDemoSkeleton />}>
      <WaraqDemoInner />
    </Suspense>
  );
}
