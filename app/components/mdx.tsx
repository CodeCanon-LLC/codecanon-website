import defaultMdxComponents from "fumadocs-ui/mdx";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import type { MDXComponents } from "mdx/types";
import { lazy, Suspense } from "react";

// Lazy-loaded so @codecanon/waraq/ui (and its react-image-crop CSS dep)
// never runs during SSR.
const ComponentPreview = lazy(() =>
  import("./docs/component-preview").then((m) => ({
    default: m.ComponentPreview,
  })),
);

function ComponentPreviewWrapper(props: { name: string }) {
  return (
    <Suspense
      fallback={<div className="h-36 animate-pulse rounded-lg bg-fd-muted" />}
    >
      <ComponentPreview {...props} />
    </Suspense>
  );
}

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    Tab,
    Tabs,
    ComponentPreview: ComponentPreviewWrapper,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
